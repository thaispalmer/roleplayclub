import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, Alert, FormGroup, Label, Input, Button } from 'reactstrap';
import queryString from 'query-string';
import T from 'i18n-react';

import { withAuth, AuthProps } from '../../components/Auth/AuthProvider';
import API from '../../components/API/API';

import logo from '../../assets/img/logo.png';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.API = new API();

    const query = queryString.parse(this.props.location.search);
    this.redirect = query.redirect ? query.redirect : '/dashboard';

    this.state = {
      redirectTo: '',
      resource: {
        username: '',
        password: '',
      },
      remember: false,
      errorMessage: null,
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
      this.setState({
        errorMessage: null,
      });
      this.API.post('/users/login', this.state.resource, {
        params: {
          include: 'user',
        },
      }).then((response) => {
        const { id: accessToken, user } = response.data;
        this.props.auth.login(accessToken, user, this.state.remember);
        this.setState({ redirectTo: this.redirect });
      }).catch((error) => {
        let errorMessage;
        if (error.request.status === 0) {
          errorMessage = T.translate('error.statusCode.message', { error: T.translate('error.statusCode.0') });
        } else {
          switch (error.response.status) {
            case 401:
              errorMessage = T.translate('login.badCredentials');
              break;
            case 400:
            case 422:
              errorMessage = T.translate('error.statusCode.message', { error: T.translate(`error.statusCode.${error.response.status}`) });
              break;
            default:
              errorMessage = T.translate('error.statusCode.message', { error: T.translate('error.statusCode.default') });
              break;
          }
        }
        this.setState({
          errorMessage,
        });
      });
    };
  }

  componentWillMount() {
    if (this.props.auth.isAuth) {
      this.props.auth.logout();
    }
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <Container fluid>
        <img src={logo} alt="Roleplay Club" style={{ width: '100%', maxWidth: '150px' }} className="d-block mt-3 mx-auto" />
        <Row style={{ marginTop: '30px' }}>
          <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 1 }}>
            <Card className="h-100 bg-primary shadow-lg">
              <CardBody className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-light font-weight-bold">Roleplay Club</h1>
                <h2 className="text-light font-weight-light">A sua comunidade de roleplay</h2>
                <Link
                  to="/signUp"
                  className="btn btn-light btn-rounded btn-lg mt-3 px-4"
                >
                  Cadastre-se agora
                </Link>
              </CardBody>
            </Card>
          </Col>
          <Col md={{ size: 8, offset: 2 }} lg={{ size: 4, offset: 0 }}>
            <Card className="shadow-lg">
              <CardBody>
                <CardTitle className="text-center">
                  {T.translate('login.title')}
                </CardTitle>
                <form onSubmit={event => this.handleSubmit(event)}>
                  {this.state.errorMessage &&
                    <Alert color="danger">
                      {this.state.errorMessage}
                    </Alert>
                  }
                  {Object.keys(this.state.resource).map(propertyName => (
                    <FormGroup key={propertyName}>
                      <Label>{T.translate(`user.fields.${propertyName}`)}</Label>
                      <Input
                        type={propertyName === 'username' ? 'text' : 'password'}
                        name={propertyName}
                        value={this.state.resource[propertyName]}
                        onChange={(event) => {
                          this.handleInputChange(event);
                        }}
                      />
                    </FormGroup>
                  ))}
                  <div className="text-center">
                    <FormGroup check style={{ marginBottom: '10px' }}>
                      <Label check>
                        <Input
                          type="checkbox"
                          name="remember"
                          onChange={(event) => {
                            this.setState({ remember: event.target.checked });
                          }}
                        />
                        {' '}
                        {T.translate('login.rememberMe')}
                      </Label>
                    </FormGroup>
                    <Button
                      className="btn-rounded px-5"
                      size="lg"
                      color="primary"
                      type="submit"
                      disabled={!this.state.resource.username || !this.state.resource.password}
                    >
                      {T.translate('login.loginButton')}
                    </Button>
                    <br />
                    <Link
                      to="/forgotPassword"
                      className="btn btn-link btn-sm"
                    >
                      {T.translate('login.forgotPassword')}
                    </Link>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

LoginForm.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  auth: AuthProps.isRequired,
};

export default withAuth(LoginForm);
