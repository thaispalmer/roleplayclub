import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import T from 'i18n-react';
import { Pagination } from '../../components/Pagination/Pagination';

export class CommunityList extends Component {
  constructor(props) {
    super(props);

    this.pagination = React.createRef();

    this.state = {
      communities: null,
    };
  }

  render() {
    let content;
    if (this.state.communities === null) {
      content = (
        <h6 className="text-muted font-weight-light font-style-italic">{T.translate('community.loadingCommunities')}</h6>
      );
    } else if (this.state.communities.length === 0) {
      content = (
        <h6 className="text-secondary font-weight-light">{T.translate('community.noCommunities')}</h6>
      );
    } else {
      content = (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>{T.translate('community.fields.title')}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.communities.map(community => (
              <tr key={community.id}>
                <td>
                  <Link
                    to={`/community/${community.id}`}
                    title={T.translate('community.tooltips.viewCommunity')}
                  >
                    {community.title}
                  </Link>
                  {' '}
                  {T.translate('community.list.threadsCount', { count: community.threadsCount })}
                  <small className="d-block">
                    {T.translate('community.list.createdAt', { timestamp: <Moment format={T.translate('defaults.timestamp.dateTime')}>{community.createdAt}</Moment> })}
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
          resourceNameOnApi="communities"
          filter={{
            counts: ['threads'],
          }}
          onItemsReceived={(communities) => {
            this.setState({ communities });
          }}
        />
      </div>
    );
  }
}

export default CommunityList;
