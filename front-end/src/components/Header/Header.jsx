import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Container, Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import T from 'i18n-react';

import { AuthProvider } from '../../components/Auth/AuthProvider';

import logo from '../../assets/img/logo.png';

class Header extends Component {
  constructor(props) {
    super(props);

    this.user = new AuthProvider().getUser();

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  putActiveClass(route) {
    let isActive = '';
    if (typeof route === 'string') {
      isActive = this.props.location.pathname.indexOf(route) > -1 ? 'active' : '';
    } else {
      route.forEach((r) => {
        if (isActive === '') {
          isActive = this.putActiveClass(r);
        }
      });
    }
    return isActive;
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar color="light" light expand="md" fixed="top">
        <Container>
          <Link
            to="/dashboard"
            className="navbar-brand"
          >
            <img src={logo} alt="Roleplay Club" style={{ height: '1.5rem' }} />
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <li className={`nav-item ${this.putActiveClass('/dashboard')}`}>
                <Link to="/dashboard" className="nav-link">{T.translate('menu.dashboard')}</Link>
              </li>
              <li className={`nav-item ${this.putActiveClass(['/shipments/list', '/shipments/update', '/shipments/detail'])}`}>
                <Link to="/communities/list" className="nav-link">{T.translate('menu.communities.list')}</Link>
              </li>
            </Nav>
            <Nav className="ml-auto" navbar>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">{T.translate('menu.logout', { name: this.user.name })}</Link>
              </li>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Header);
