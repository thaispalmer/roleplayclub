import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import T from 'i18n-react';

import { AuthProvider } from '../../components/Auth/AuthProvider';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.user = new AuthProvider().getUser();
  }
  render() {
    return (
      <div>
        <Row>
          <Col lg={6} md={12}>
            <h3 className="text-secondary font-weight-bold mt-3">{T.translate('dashboard.title', { name: this.user.name })}</h3>
            <h4 className="text-secondary font-weight-light mb-3">{T.translate('dashboard.caption')}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/community/create" className="btn btn-lg btn-block btn-secondary btn-rounded">
              {T.translate('dashboard.createCommunity')}
            </Link>
          </Col>
          <Col>
            <Link to="/communities" className="btn btn-lg btn-block btn-secondary btn-rounded">
              {T.translate('dashboard.viewCommunities')}
            </Link>
          </Col>
          <Col />
        </Row>
      </div>
    );
  }
}

export default Dashboard;
