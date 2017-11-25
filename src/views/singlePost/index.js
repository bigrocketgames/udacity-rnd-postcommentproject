import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-down'

import CommentForm from '../../components/CommentForm'

import { getSinglePost, postVote, postDelete } from '../../redux/modules/posts/actions'
// import { postVote } from '../../redux/modules/posts/actions'
import { getComments, commentVote } from '../../redux/modules/comments/actions'
import Comments from '../../components/Comments'

class SinglePost extends Component {
  constructor(props) {
    super(props)

    this.votePost = this.votePost.bind(this)
    this.voteComment = this.voteComment.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }
  
  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.post_id)
    this.props.getComments(this.props.match.params.post_id)
  }

  deletePost = (e) => {
    e.preventDefault()
    this.props.postDelete(e.target.id)
  }

  votePost = (e, voteType) => {
    e.preventDefault();
    this.props.postVote(e.currentTarget.id, voteType);
  }

  voteComment = (e, voteType) => {
    e.preventDefault();
    this.props.commentVote(e.currentTarget.id, voteType);
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
        <div>
          <p className="comment-count">{post.commentCount} comments</p>
          <p className="post-votes"><button className="btn btn-primary btn-circle" id={post.id} onClick={(e) => this.votePost(e, "upVote")}><ThumbsUpIcon size={20}/></button><button className="btn btn-primary btn-circle" id={post.id} onClick={(e) => this.votePost(e, "downVote")}><ThumbsDownIcon size={20}/></button>  {post.voteScore}</p>
        </div>
        <Link to={{
          pathname: `/${post.category}/${post.id}/edit`,
          state: { post: post}
        }} 
        className="post-edit-link btn btn-secondary">Edit Post</Link>
        <button className="btn btn-danger delete-button" id={post.id} onClick={this.deletePost} >Delete Post</button>
        <hr />
        <br />
        <CommentForm parent_id={post.id} />
        <br />
        <h4 className="comments-title text-center">COMMENTS</h4>
        {comments.length > 0 && comments.map((comment) => <Comments key={comment.id} comment={comment} voteComment={this.voteComment} />) }
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
    getComments: getComments,
    commentVote: commentVote, 
    postDelete: postDelete
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)