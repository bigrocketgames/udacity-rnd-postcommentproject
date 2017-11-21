import React from 'react'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-down'

const Comments = (props) => {
  return (
    <div className="comment-container">
      <p className="comment-body">{props.comment.body}</p>
      <p className="comment-author">Comment by: {props.comment.author}</p>
      <p className="post-comments"><button className="btn btn-primary btn-circle" id={props.comment.id} onClick={(e) => props.voteComment(e, "upVote")}><ThumbsUpIcon size={20}/></button><button className="btn btn-primary btn-circle" id={props.comment.id} onClick={(e) => props.voteComment(e, "downVote")}><ThumbsDownIcon size={20}/></button>  {props.comment.voteScore}</p>
      <hr />
    </div>
  )
}

export default Comments