import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import T from 'i18n-react';
import { Pagination } from '../../components/Pagination/Pagination';
import { Post } from '../../components/Post/Post';

export class PostList extends Component {
  constructor(props) {
    super(props);

    this.pagination = React.createRef();

    this.state = {
      posts: null,
    };
  }

  render() {
    let content;
    if (this.state.posts === null) {
      content = (
        <h6 className="text-muted font-weight-light font-style-italic">{T.translate('post.loadingPosts')}</h6>
      );
    } else if (this.state.posts.length === 0) {
      content = (
        <h6 className="text-secondary font-weight-light">{T.translate('post.noPosts')}</h6>
      );
    } else {
      content = this.state.posts.map(post => (
        <Post
          key={post.id}
          data={post}
          threadId={this.props.threadId}
          communityId={this.props.communityId}
        />
      ));
    }
    return (
      <div>
        {content}
        <Pagination
          ref={this.pagination}
          resourceNameOnApi={`threads/${this.props.threadId}/posts`}
          filter={{
            include: ['user'],
          }}
          onItemsReceived={(posts) => {
            this.setState({ posts });
          }}
        />
      </div>
    );
  }
}

PostList.propTypes = {
  threadId: PropTypes.string.isRequired,
  communityId: PropTypes.string.isRequired,
};

export default PostList;
