import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardTitle, Alert, FormGroup, Label, Input, Button } from 'reactstrap';
import T from 'i18n-react';

import API from '../../components/API/API';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.API = new API();

    this.state = {
      redirectTo: '',
      resource: {
        name: '',
        email: '',
        username: '',
        password: '',
      },
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
      this.API.post('/users', data).then(() => {
        this.setState({ redirectTo: '/login' });
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
              errorMessage = '';
              Object.keys(error.response.data.error.details.codes).forEach((property) => {
                const code = error.response.data.error.details.codes[property];
                errorMessage += `${T.translate(`signUp.errors.${property}.${code[0]}`)}\n`;
              });
              errorMessage = T.translate('error.statusCode.message', { error: errorMessage });
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

    this.getInputType = (propertyName) => {
      switch (propertyName) {
        case 'password':
        case 'email':
          return propertyName;
        default:
          return 'text';
      }
    };
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <Card style={{ marginTop: '30px' }} className="shadow-lg">
            <CardBody>
              <CardTitle className="text-center">
                {T.translate('signUp.title')}
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
                      type={this.getInputType(propertyName)}
                      name={propertyName}
                      value={this.state.resource[propertyName]}
                      onChange={(event) => {
                        this.handleInputChange(event);
                      }}
                    />
                  </FormGroup>
                ))}
                <div className="text-center">
                  <Button
                    className="btn-rounded px-5"
                    size="lg"
                    color="primary"
                    type="submit"
                    disabled={!this.state.resource.username ||
                              !this.state.resource.password ||
                              !this.state.resource.email ||
                              !this.state.resource.name}
                  >
                    {T.translate('signUp.signUpButton')}
                  </Button>
                  <br />
                  <Link
                    to="/login"
                    className="btn btn-link btn-sm"
                  >
                    {T.translate('signUp.hasAccount')}
                  </Link>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
