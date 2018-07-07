import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Moment from 'react-moment';
import T from 'i18n-react';
import { Pagination } from '../../components/Pagination/Pagination';

export class ThreadList extends Component {
  constructor(props) {
    super(props);

    this.pagination = React.createRef();

    this.state = {
      threads: null,
    };
  }

  render() {
    let content;
    if (this.state.threads === null) {
      content = (
        <h6 className="text-muted font-weight-light font-style-italic">{T.translate('thread.loadingThreads')}</h6>
      );
    } else if (this.state.threads.length === 0) {
      content = (
        <h6 className="text-secondary font-weight-light">{T.translate('thread.noThreads')}</h6>
      );
    } else {
      content = (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>{T.translate('thread.fields.title')}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.threads.map(thread => (
              <tr key={thread.id}>
                <td>
                  <Link
                    to={`/community/${this.props.communityId}/thread/${thread.id}`}
                    title={T.translate('thread.tooltips.viewThread')}
                  >
                    {thread.title}
                  </Link>
                  {' '}
                  {T.translate('thread.list.postsCount', { count: thread.postsCount })}
                  <small className="d-block">
                    {T.translate('thread.list.createdAt', { timestamp: <Moment format={T.translate('defaults.timestamp.dateTime')}>{thread.createdAt}</Moment> })}
                  </small>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return (
      <div>
        {content}
        <Pagination
          ref={this.pagination}
          resourceNameOnApi="threads"
          filter={{
            where: {
              communityId: this.props.communityId,
            },
            counts: ['posts'],
          }}
          onItemsReceived={(threads) => {
            this.setState({ threads });
          }}
        />
      </div>
    );
  }
}

ThreadList.propTypes = {
  communityId: PropTypes.string.isRequired,
};

export default ThreadList;
