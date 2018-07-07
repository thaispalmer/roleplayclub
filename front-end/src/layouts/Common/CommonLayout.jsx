import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default class CommonLayout extends Component {
  componentDidUpdate(e) {
    if (e.history && (e.history.action === 'PUSH')) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.scrollTop = 0;
    }
  }

  render() {
    return ([
      <Header />,
      <Container className="common-container">
        <div style={{ minHeight: 'calc(100vh - 150px)' }} className="py-3">
          {this.props.children}
        </div>
        <Footer />
      </Container>,
    ]);
  }
}

CommonLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

CommonLayout.defaultProps = {
  children: null,
};
