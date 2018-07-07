import React, { Component } from 'react';
import T from 'i18n-react';
import { Link } from 'react-router-dom';

import { CommunityList } from '../../components/CommunityList/CommunityList';

class CommunityListAll extends Component {
  render() {
    return (
      <div>
        <h3 className="text-secondary font-weight-bold my-3">
          {T.translate('community.list.title')}
          <Link to="/community/create" className="btn btn-sm btn-outline-primary btn-rounded float-right">
            {T.translate('community.list.createCommunity')}
          </Link>
        </h3>
        <CommunityList />
      </div>
    );
  }
}

export default CommunityListAll;
