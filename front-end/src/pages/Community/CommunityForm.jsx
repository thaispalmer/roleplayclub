import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import T from 'i18n-react';

import API from '../../components/API/API';
import { AuthProvider } from '../../components/Auth/AuthProvider';

export default class CommunityForm extends Component {
  constructor(props) {
    super(props);

    this.API = new API();

    this.isNewRecord = !this.props.match.params.id;

    this.state = {
      redirectTo: '',
      resourceNameOnApi: 'communities',
      resource: {
        title: '',
        description: '',
        hidden: false,
        ownerId: new AuthProvider().getUser().id,
      },
      hiddenPropertyNamesOnForm: ['id', 'ownerId', 'createdAt', 'updatedAt'],
    };

    /**
     * Callback for when user input some data on form fields.
     * It saves the data in their component state.
     * @param event
     */
    this.handleInputChange = (event) => {
      const { target } = event;
      const { name, type } = target;
      let { value } = target;

      switch (type) {
        case 'number':
          value = parseFloat(target.value);
          break;
        case 'checkbox':
          value = target.checked;
          break;
        default:
          break;
      }

      this.setState({ resource: { ...this.state.resource, [name]: value } });
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
      this.setState({ redirectTo: `/community/${response.data.id}` });
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
        <h3 className="text-secondary font-weight-bold mt-3">{T.translate(`community.form.title.${this.isNewRecord ? 'create' : 'update'}`)}</h3>
        <hr />
        <form onSubmit={event => this.handleSubmit(event)}>
          {Object.keys(this.state.resource).map((propertyName) => {
            if (this.state.hiddenPropertyNamesOnForm.includes(propertyName)) {
              return null;
            } else if (propertyName === 'hidden') {
              return (
                <FormGroup key={propertyName}>
                  <Label>{T.translate(`community.fields.${propertyName}`)}</Label>
                  <Input
                    type="select"
                    name={propertyName}
                    value={this.state.resource[propertyName]}
                    placeholder={T.translate('defaults.placeholder.select')}
                    onChange={(event) => {
                      this.handleInputChange(event);
                    }}
                  >
                    <option value>{T.translate('defaults.yes')}</option>
                    <option value={false}>{T.translate('defaults.no')}</option>
                  </Input>
                </FormGroup>
              );
            }
            return (
              <FormGroup key={propertyName}>
                <Label>{T.translate(`community.fields.${propertyName}`)}</Label>
                <Input
                  type={propertyName === 'description' ? 'textarea' : 'text'}
                  name={propertyName}
                  value={this.state.resource[propertyName] || ''}
                  onChange={(event) => {
                    this.handleInputChange(event);
                  }}
                />
              </FormGroup>
            );
          })}
          <hr />
          <div className="clearfix text-center">
            <Link
              to={this.isNewRecord ? '/' : `/community/${this.state.resource.id}`}
              className="btn btn-rounded btn-lg btn-outline-secondary float-md-left d-block d-md-inline-block px-5"
            >
              {T.translate('community.form.cancelButton')}
            </Link>
            <Button size="lg" color="primary" className="btn-rounded float-md-right d-block d-md-inline-block m-auto px-5">
              {T.translate(`community.form.saveButton.${this.isNewRecord ? 'create' : 'update'}`)}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

CommunityForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

CommunityForm.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};
