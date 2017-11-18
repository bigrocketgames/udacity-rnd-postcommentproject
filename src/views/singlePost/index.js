import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-down'

import { getSinglePost } from '../../redux/modules/posts/actions'
import { postVote } from '../../redux/modules/posts/actions'
import { getComments } from '../../redux/modules/comments/actions'

class SinglePost extends Component {
  constructor(props) {
    super(props)

    this.votePost = this.votePost.bind(this)
  }
  
  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.post_id)
    this.props.getComments(this.props.match.params.post_id)
  }

  votePost = (e, voteType) => {
    e.preventDefault();
    this.props.postVote(e.currentTarget.id, voteType);
  }

  render(){
    const { post, comments } = this.props

    return(
      <div className="container">
        <h2 className="post-title text-center">{post.title}</h2>
        <p className="byLine text-center">by: {post.author}</p>
        <hr />
        <p className="post-body">{post.body}</p>
        <hr />
        <p className="comment-count">{post.commentCount} comments</p>
        <p className="post-votes"><button className="btn btn-primary btn-circle" id={post.id} onClick={(e) => this.votePost(e, "upVote")}><ThumbsUpIcon size={20}/></button><button className="btn btn-primary btn-circle" id={post.id} onClick={(e) => this.votePost(e, "downVote")}><ThumbsDownIcon size={20}/></button>  {post.voteScore}</p>
        <hr />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts,
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getSinglePost: getSinglePost,
    postVote: postVote,
    getComments: getComments
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)