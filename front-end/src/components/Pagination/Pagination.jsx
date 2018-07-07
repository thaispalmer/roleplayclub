import React, { Component } from 'react';
import PropTypes from 'prop-types';
import T from 'i18n-react';
import API from '../../components/API/API';

export class Pagination extends Component {
  constructor(props) {
    super(props);

    this.API = new API();

    this.state = {
      currentPage: 1,
      pageCount: 0,
      itemCount: 0,
    };

    this.fetchItemCount = async () => {
      this.API.get(`/${this.props.resourceNameOnApi}/count`).then((response) => {
        this.setState({
          pageCount: Math.ceil(response.data.count / this.props.itemsPerPage),
          itemCount: response.data.count,
        });
      });
    };

    this.fetchItems = async () => {
      const currentSkip = this.props.itemsPerPage * (this.state.currentPage - 1);
      const filter = Object.assign({}, this.props.filter, {
        limit: this.props.itemsPerPage,
        skip: currentSkip,
      });
      const params = Object.assign({}, this.props.params, { filter });
      const endpoint = this.props.customEndpoint ? this.props.customEndpoint : `/${this.props.resourceNameOnApi}`;
      this.API.get(endpoint, { params }).then((response) => {
        this.props.onItemsReceived(response.data);
      });
    };

    this.goToPage = (page) => {
      const actualPage = this.state.currentPage;
      switch (page) {
        case 'first':
          this.setState({ currentPage: 1 });
          break;
        case 'last':
          this.setState({ currentPage: this.state.pageCount });
          break;
        case 'next':
          this.setState({
            currentPage: this.state.currentPage < this.state.pageCount ?
              this.state.currentPage + 1 : this.state.pageCount,
          });
          break;
        case 'previous':
          this.setState({
            currentPage: this.state.currentPage > 1 ?
              this.state.currentPage - 1 : 1,
          });
          break;
        default:
          if ((page > 0) && (page <= this.state.pageCount)) {
            this.setState({ currentPage: page });
          }
          break;
      }
      if (actualPage !== this.state.currentPage) {
        this.fetchItems();
      }
    };
  }

  componentWillMount() {
    this.setState({
      currentPage: this.props.initialPage,
    });
  }

  async componentDidMount() {
    await this.fetchItemCount();
    await this.fetchItems();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchItems();
    }
  }

  render() {
    if (!this.props.alwaysShow &&
        (this.state.itemCount <= this.props.itemsPerPage)) return null;

    const showPageButtons = () => {
      const pagesToShow = [];
      let firstPageShown;
      let lastPageShown;
      if (this.state.pageCount <= this.props.maxPagesShown) {
        firstPageShown = 1;
        lastPageShown = this.state.pageCount;
      } else {
        firstPageShown = this.state.currentPage - Math.floor(this.props.maxPagesShown / 2);
        lastPageShown = this.state.currentPage + Math.floor(this.props.maxPagesShown / 2);
        if (firstPageShown < 1) {
          lastPageShown = this.props.maxPagesShown;
          firstPageShown = 1;
        }
        if (lastPageShown > this.state.pageCount) {
          firstPageShown = (this.state.pageCount - this.props.maxPagesShown) + 1;
          lastPageShown = this.state.pageCount;
        }
      }
      for (let i = firstPageShown; i <= lastPageShown; i += 1) {
        pagesToShow.push(i);
      }

      return pagesToShow.map(page => (
        <li key={page} className={`page-item${this.state.currentPage === page ? ' active' : ''}`}>
          <button
            className="page-link"
            onClick={() => { this.goToPage(page); }}
          >
            <span aria-hidden="true">{page}</span>
          </button>
        </li>
      ));
    };

    return (
      <nav aria-label={T.translate('defaults.pagination.navigation')}>
        <ul className="pagination pagination-rounded justify-content-center">
          <li className={`page-item${this.state.currentPage === 1 ? ' disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => { this.goToPage('first'); }}
              title={T.translate('defaults.pagination.firstPage')}
            >
              <i className="fas fa-angle-double-left" />
            </button>
          </li>
          <li className={`page-item${this.state.currentPage === 1 ? ' disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => { this.goToPage('previous'); }}
              title={T.translate('defaults.pagination.previous')}
            >
              <i className="fas fa-angle-left" />
            </button>
          </li>
          {showPageButtons()}
          <li className={`page-item${this.state.currentPage === this.state.pageCount ? ' disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => { this.goToPage('next'); }}
              title={T.translate('defaults.pagination.next')}
            >
              <i className="fas fa-angle-right" />
            </button>
          </li>
          <li className={`page-item${this.state.currentPage === this.state.pageCount ? ' disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => { this.goToPage('last'); }}
              title={T.translate('defaults.pagination.lastPage')}
            >
              <i className="fas fa-angle-double-right" />
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  resourceNameOnApi: PropTypes.string.isRequired,
  onItemsReceived: PropTypes.func.isRequired,
  params: PropTypes.objectOf(PropTypes.object),
  filter: PropTypes.objectOf(PropTypes.any),
  initialPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  maxPagesShown: PropTypes.number,
  customEndpoint: PropTypes.string,
  alwaysShow: PropTypes.bool,
};

Pagination.defaultProps = {
  params: {},
  filter: {},
  initialPage: 1,
  itemsPerPage: 10,
  maxPagesShown: 5,
  customEndpoint: null,
  alwaysShow: false,
};

export default Pagination;
