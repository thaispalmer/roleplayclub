import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import T from 'i18n-react';
import API from '../../components/API/API';
import { ThreadList } from '../../components/ThreadList/ThreadList';

class CommunityDetails extends Component {
  constructor(props) {
    super(props);

    this.API = new API();

    this.communityId = this.props.match.params.id;
    this.state = {
      resource: {},
    };
  }

  componentDidMount() {
    this.API.get(`/communities/${this.props.match.params.id}`).then((response) => {
      this.setState({
        resource: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <h3 className="text-secondary font-weight-bold my-3">
          {this.state.resource.title}
          <Link
            to={`/community/${this.state.resource.id}/update`}
            className="btn btn-link"
            title={T.translate('community.detail.editTooltip')}
          >
            <i className="far fa-edit" />
          </Link>
        </h3>

        <div className="mb-4">
          <h5 className="text-secondary font-weight-light text-uppercase">
            {T.translate('community.fields.description')}
          </h5>
          <div dangerouslySetInnerHTML={{ __html: this.state.resource.description }} />
        </div>

        <div className="mb-4">
          <h5 className="text-secondary font-weight-light">
            <span className="text-uppercase">{T.translate('community.fields.threads')}</span>
            <Link to={`/community/${this.communityId}/thread/create`} className="btn btn-sm btn-outline-primary btn-rounded float-right">
              {T.translate('community.detail.createThread')}
            </Link>
          </h5>
          <ThreadList communityId={this.communityId} />
        </div>
      </div>
    );
  }
}

CommunityDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

CommunityDetails.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};


export default CommunityDetails;
