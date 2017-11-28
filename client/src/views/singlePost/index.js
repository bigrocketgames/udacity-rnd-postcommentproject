import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-down'

import CommentForm from '../../components/CommentForm'
import Comments from '../../components/Comments'
import { getSinglePost, postVote, postDelete } from '../../redux/modules/posts/actions'
import { getComments, commentVote, commentDelete } from '../../redux/modules/comments/actions'

class SinglePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentModalOpen: false,
      comment: null,
      invalidPost: false,
      postLoading: true
    }

    this.votePost = this.votePost.bind(this)
    this.voteComment = this.voteComment.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
    this.openCommentModal = this.openCommentModal.bind(this)
    this.closeCommentModal = this.closeCommentModal.bind(this)
    this.postLoaded = this.postLoaded.bind(this)
  }
  
  componentDidMount() {
    this.props.getComments(this.props.match.params.post_id)
    this.props.getSinglePost(this.props.match.params.post_id)
      .then((action) => this.postLoaded(action.posts))
  }

  postLoaded = (post) => {
    if (post.deleted === false) {
      this.setState((state) => ({
        ...state,
        postLoading: false
      }))
    } else {
      this.setState((state) => ({
        ...state,
        postLoading: false,
        invalidPost: true
      }))
    }
  }

  openCommentModal = (comment) => {
    this.setState(() => ({
      commentModalOpen: true,
      comment: comment
    }))
  }

  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false,
      comment: null
    }))
  }

  deletePost = (e) => {
    e.preventDefault()
    this.props.postDelete(e.target.id)
  }

  deleteComment = (e) => {
    e.preventDefault()
    this.props.commentDelete(e.target.id)
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
    const { commentModalOpen, comment } = this.state

    // Returns something different if waiting for the post to load.
    if (this.state.postLoading) {
      return(
        <h3 className="text-center"> The requested post is loading</h3>
      )
    } else {

      // Shows either the post or a message saying the message is not available any longer.
      if(this.state.invalidPost) {
        return(
          <div className="container">
            <h3 className="text-center">The requested post is no longer available.  Please return to the <Link to="/">home page</Link> to choose a new post.</h3>
          </div>
        )
      } else {
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
            {comments.length > 0 && comments.map((comment) => <Comments key={comment.id} comment={comment} voteComment={this.voteComment} deleteComment={this.deleteComment} openModal={this.openCommentModal} />) }
    
    
            <Modal
              isOpen={commentModalOpen}
              onRequestClose={this.closeCommentModal}
            >
              { commentModalOpen === false ? null : <CommentForm comment={comment} closeModal={this.closeCommentModal} /> }
            </Modal>
          </div>
        )
      }
    }
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
    postDelete: postDelete,
    commentDelete: commentDelete
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)