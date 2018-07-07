import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import T from 'i18n-react';
import { AuthProvider } from '../Auth/AuthProvider';

export class Post extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col md={3}>
              <CardTitle className="font-weight-bold mb-0">{this.props.data.user.name}</CardTitle>
              <small className="d-block text-muted">
                {T.translate('user.detail.createdAt', { timestamp: <Moment format={T.translate('defaults.timestamp.dateTime')}>{this.props.data.user.createdAt}</Moment> })}
              </small>
            </Col>
            <Col md={9}>
              <p>{this.props.data.message}</p>
              <hr />
              <small className="text-muted">
                {this.props.data.createdAt === this.props.data.updatedAt ?
                  T.translate('post.detail.createdAt', { timestamp: <Moment format={T.translate('defaults.timestamp.dateTime')}>{this.props.data.createdAt}</Moment> })
                  :
                  T.translate('post.detail.updatedAt', { timestamp: <Moment format={T.translate('defaults.timestamp.dateTime')}>{this.props.data.updatedAt}</Moment> })
                }
              </small>
              {(this.props.data.user.id === new AuthProvider().getUser().id) && (
                <Link
                  to={`/community/${this.props.communityId}/thread/${this.props.threadId}/post/${this.props.data.id}/update`}
                  className="small float-right"
                >
                  {T.translate('post.detail.editButton')}
                  <i className="far fa-edit ml-2" />
                </Link>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

Post.propTypes = {
  threadId: PropTypes.string.isRequired,
  communityId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Post;
