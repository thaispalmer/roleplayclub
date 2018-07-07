import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Alert, FormGroup, Label, Input, Button } from 'reactstrap';
import T from 'i18n-react';

import API from '../../components/API/API';

export default class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.API = new API();

    this.state = {
      redirectTo: '',
      resource: {
        email: '',
      },
      success: false,
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
      this.API.post('/users/reset', this.state.resource)
        .then(() => {
          this.setState({ success: true });
        }).catch((error) => {
          let errorMessage;
          if (error.request.status === 0) {
            errorMessage = T.translate('error.statusCode.message', { error: T.translate('error.statusCode.0') });
          } else {
            switch (error.response.status) {
              case 404:
                errorMessage = T.translate('forgotPassword.notFound');
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

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <Container fluid>
        <Row>
          <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
            {!this.state.success &&
              <Card style={{ marginTop: '100px' }} className="shadow-lg">
                <CardBody className="py-4">
                  <CardTitle className="text-center">
                    {T.translate('forgotPassword.title')}
                  </CardTitle>
                  <CardSubtitle className="text-center mb-3">
                    {T.translate('forgotPassword.description')}
                  </CardSubtitle>
                  <form onSubmit={event => this.handleSubmit(event)}>
                    {this.state.errorMessage &&
                      <Alert color="danger">
                        {this.state.errorMessage}
                      </Alert>}
                    <FormGroup>
                      <Label>{T.translate('user.fields.email')}</Label>
                      <Input
                        type="email"
                        name="email"
                        value={this.state.resource.email || ''}
                        onChange={(event) => {
                          this.handleInputChange(event);
                        }}
                      />
                    </FormGroup>
                    <div className="text-center">
                      <Button
                        className="btn-rounded px-5"
                        color="secondary"
                        type="submit"
                        disabled={!this.state.resource.email}
                      >
                        {T.translate('forgotPassword.sendButton')}
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>}
            {this.state.success &&
              <Card style={{ marginTop: '100px' }} className="shadow-lg">
                <CardBody className="text-center py-5">
                  <h1 style={{ fontSize: '50px' }}>
                    <i className="text-primary far fa-check-circle" />
                  </h1>
                  <CardTitle>
                    {T.translate('forgotPassword.successMessageTitle')}
                  </CardTitle>
                  <CardSubtitle>
                    {T.translate('forgotPassword.successMessageText')}
                  </CardSubtitle>
                  <Link
                    to="/login"
                    className="btn btn-secondary btn-rounded px-5 mt-4"
                  >
                    {T.translate('forgotPassword.backButton')}
                  </Link>
                </CardBody>
              </Card>}
          </Col>
        </Row>
      </Container>
    );
  }
}
