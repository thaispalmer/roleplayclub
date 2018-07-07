import React, { Component } from 'react';
import { Container } from 'reactstrap';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <p className="copyright float-right small font-weight-light">
            desenvolvido por <a href="https://nxtdigital.com.br" className="font-weight-bold">nxt</a>
          </p>
          <div className="clearfix" />
        </Container>
      </footer>
    );
  }
}

export default Footer;
