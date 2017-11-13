import React from 'react'
import { Link } from 'react-router-dom'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-down'

const Posts = ({post}) => {
  return (
    <div className="col-sm-11 post-box">
      <Link to={`/${post.category}/${post.id}`}><h3 className="text-center">{post.title}</h3></Link>
      <h5>By: {post.author}</h5>
      <p>{post.body}</p>
      <p className="comment-count">{post.commentCount} comments</p>
      <p className="post-votes"><ThumbsUpIcon size={20}/>  <ThumbsDownIcon size={20}/>  {post.voteScore}</p>
      <hr />
    </div>
  )
}

export default Posts