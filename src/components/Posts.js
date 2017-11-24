import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-down'

class Posts extends Component {
  render() {
    const { post, vote, deletePost } = this.props
    return (
      <div className="col-sm-11 post-box">
        <Link to={`/${post.category}/${post.id}`}><h3 className="text-center">{post.title}</h3></Link>
        <h5>By: {post.author}</h5>
        <p>{post.body}</p>
        <div>
          <p className="comment-count">{post.commentCount} comments</p>
          <p className="post-votes"><button className="btn btn-primary btn-circle" id={post.id} onClick={(e) => vote(e, "upVote")}><ThumbsUpIcon size={20}/></button><button className="btn btn-primary btn-circle" id={post.id} onClick={(e) => vote(e, "downVote")}><ThumbsDownIcon size={20}/></button>  {post.voteScore}</p>
        </div>
        <div>
          <Link to={{
            pathname: `/${post.category}/${post.id}/edit`,
            state: { post: post}
          }} 
          className="post-edit-link btn btn-secondary">Edit Post</Link>
          <button className="btn btn-danger delete-button" id={`${post.id}`} onClick={deletePost} >Delete Post</button>
        </div>
        <hr />
      </div>
    )
  }
}

export default Posts