import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import T from 'i18n-react';

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
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

Post.propTypes = {
  data: PropTypes.shape({
    message: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Post;
