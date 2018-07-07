import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import T from 'i18n-react';
import API from '../../components/API/API';
import { PostList } from '../../components/PostList/PostList';

class ThreadDetails extends Component {
  constructor(props) {
    super(props);

    this.API = new API();

    this.threadId = this.props.match.params.id;
    this.state = {
      resource: {
        community: {},
      },
    };
  }

  componentDidMount() {
    this.API.get(`/threads/${this.threadId}`, {
      params: {
        filter: {
          include: ['community'],
        },
      },
    }).then((response) => {
      this.setState({
        resource: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <h5 className="text-secondary font-weight-light text-uppercase mt-3">
          <Link to={`/community/${this.state.resource.communityId}`}>
            {this.state.resource.community.title}
          </Link>
        </h5>
        <h3 className="text-secondary font-weight-bold mb-3">
          {this.state.resource.title}
          <Link
            to={`/community/${this.state.resource.communityId}/thread/${this.state.resource.id}/update`}
            className="btn btn-link"
            title={T.translate('thread.detail.editTooltip')}
          >
            <i className="far fa-edit" />
          </Link>
        </h3>

        <div className="mb-4">
          <h5 className="text-secondary font-weight-light">
            <span className="text-uppercase">{T.translate('thread.fields.posts')}</span>
            <Link to={`/community/${this.state.resource.communityId}/thread/${this.state.resource.id}/post/create`} className="btn btn-sm btn-outline-primary btn-rounded float-right">
              {T.translate('thread.detail.createPost')}
            </Link>
          </h5>
          <PostList threadId={this.threadId} />
        </div>
      </div>
    );
  }
}

ThreadDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      communityId: PropTypes.string,
    }),
  }),
};

ThreadDetails.defaultProps = {
  match: {
    params: {
      id: '',
      communityId: '',
    },
  },
};


export default ThreadDetails;
