import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { FormGroup, Button, Row, Col } from 'reactstrap';
import T from 'i18n-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import API from '../../components/API/API';
import { AuthProvider } from '../../components/Auth/AuthProvider';

export default class PostForm extends Component {
  constructor(props) {
    super(props);

    this.API = new API();

    this.isNewRecord = !this.props.match.params.id;
    this.threadId = this.props.match.params.threadId;
    this.communityId = this.props.match.params.communityId;
    this.state = {
      redirectTo: '',
      resourceNameOnApi: 'posts',
      resource: {
        message: '',
        threadId: this.threadId,
        userId: new AuthProvider().getUser().id,
      },
    };

    /**
     * Callback for when user input some data on Quill editor.
     * It saves the data in their component state.
     * @param name
     * @param value
     */
    this.handleQuillChange = (name, value) => {
      this.setState({
        resource: {
          ...this.state.resource,
          [name]: value,
        },
      });
    };

    /**
     * Callback for when user submits the form.
     * It sends the data to database via API.
     * @param event
     */
    this.handleSubmit = (event) => {
      event.preventDefault();
      this.save(this.state.resource);
    };

    /**
     * Checks if there's an ID set (on URL). If so, updates the record. Otherwise creates one.
     * @param data
     */
    this.save = async (data) => {
      const response = await this.API.put(`/${this.state.resourceNameOnApi}`, data);
      this.setState({ redirectTo: `/community/${response.data.communityId}/thread/${response.data.threadId}` });
    };

    /**
     * Loads in the form the data from resource to be updated.
     */
    this.loadResource = () => {
      if (!this.isNewRecord) {
        this.API.get(`/${this.state.resourceNameOnApi}/${this.props.match.params.id}`)
          .then((response) => {
            this.setState({
              resource: response.data,
            });
          })
          .catch(() => {
            this.setState({
              redirectTo: '/dashboard',
            });
          });
      }
    };
  }

  componentDidMount() {
    this.loadResource();
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <div>
        <h3 className="text-secondary font-weight-bold mt-3">{T.translate(`post.form.title.${this.isNewRecord ? 'create' : 'update'}`)}</h3>
        <hr />
        <form onSubmit={event => this.handleSubmit(event)}>
          <Row>
            <Col md={9} className="m-auto">
              <FormGroup>
                <ReactQuill
                  value={this.state.resource.message || ''}
                  onChange={(value) => {
                    this.handleQuillChange('message', value);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr />
          <div className="clearfix text-center">
            <Link
              to={`/community/${this.communityId}/thread/${this.threadId}`}
              className="btn btn-rounded btn-lg btn-outline-secondary float-md-left d-block d-md-inline-block px-5"
            >
              {T.translate('post.form.cancelButton')}
            </Link>
            <Button size="lg" color="primary" className="btn-rounded float-md-right d-block d-md-inline-block m-auto px-5">
              {T.translate(`post.form.saveButton.${this.isNewRecord ? 'create' : 'update'}`)}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      threadId: PropTypes.string,
      communityId: PropTypes.string,
    }),
  }),
};

PostForm.defaultProps = {
  match: {
    params: {
      id: '',
      threadId: '',
      communityId: '',
    },
  },
};
