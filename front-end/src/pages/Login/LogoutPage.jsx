import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import T from 'i18n-react';

import { AuthProvider, withAuth, AuthProps } from '../../components/Auth/AuthProvider';
import API from '../../components/API/API';

class LogoutPage extends Component {
  constructor(props) {
    super(props);
    this.API = new API();
  }

  componentWillMount() {
    if (this.props.auth.isAuth) {
      const auth = new AuthProvider();
      const accessToken = auth.getAccessToken();
      this.API.post(`/users/logout?access_token=${accessToken}`)
        .then(() => {
          this.props.auth.logout();
        }).catch(() => {
          this.props.auth.logout();
        });
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
            <Card style={{ marginTop: '100px' }} className="shadow-lg">
              <CardBody className="text-center py-4">
                <h1 style={{ fontSize: '50px' }}>
                  <i className="text-muted fas fa-sign-out-alt" />
                </h1>
                <CardTitle>
                  {T.translate('logout.title')}
                </CardTitle>
                <CardSubtitle>
                  {T.translate('logout.message')}
                </CardSubtitle>
                <Link
                  to="/login"
                  className="btn btn-primary btn-rounded px-5 mt-4"
                >
                  {T.translate('logout.loginButton')}
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

LogoutPage.propTypes = {
  auth: AuthProps.isRequired,
};

export default withAuth(LogoutPage);
