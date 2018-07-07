import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import Footer from '../../components/Footer/Footer';

export default class CleanLayout extends Component {
  componentDidUpdate(e) {
    if (e.history && (e.history.action === 'PUSH')) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.scrollTop = 0;
    }
  }

  render() {
    return (
      <Container className="clean-container">
        <div style={{ minHeight: 'calc(100vh - 100px)' }}>
          {this.props.children}
        </div>
        <Footer />
      </Container>
    );
  }
}

CleanLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

CleanLayout.defaultProps = {
  children: null,
};
