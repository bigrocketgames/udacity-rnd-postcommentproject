import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getSinglePost } from '../redux/modules/posts/actions'
import { getCategories } from '../redux/modules/categories/actions'
import { updatePost } from '../redux/modules/posts/actions'

class PostForm extends Component {
  constructor(props) {
    super(props)
    if (props.location.state) {
      this.state = {
        formValues: {
          id: props.location.state.post.id,
          timestamp: props.location.state.post.timestamp,
          title: props.location.state.post.title,
          body: props.location.state.post.body,
          author: props.location.state.post.author,
          category: props.location.state.post.category
        }
      }
    } else {
      this.state = {
        formValues: {
          id: null,
          timestamp: null,
          title: "",
          body: "",
          author: "",
          category: ""
        }
      }
    }
    
    
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let formValues = this.state.formValues
    debugger
  }

  handleChange = (e) => {
    e.preventDefault()
    let formValues = this.state.formValues
    const name = e.target.name
    const value = e.target.value

    formValues[name] = value

    this.setState({formValues})
  }

  componentDidMount() {
    this.props.getCategories()
    if (this.props.match.params.category && this.props.match.params.post_id) {
      this.props.getSinglePost(this.props.match.params.post_id)
    }
  }

  render() {
    const { formValues } = this.state
    const { post } = this.props
    
    if (post.id) {
      return(
        <div className="container">
          <h2 className="form-title text-center">Edit Post</h2>
          <form className="post-form" id={`${post.id}`} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" >Post Title: </label>
              <input type="text" className="form-control" name="title" value={formValues.title} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="body">Post: </label>
              <input type="textarea" className="form-control" name="body" value={formValues.body} onChange={this.handleChange} />
            </div>
  
            <input type="submit" name="submit" value="Edit Post"/>
          </form>
        </div>
      )
    } else {
      return(
        <div className="container">
          <h2 className="form-title text-center">Add New Post</h2>
          <form className="post-form" id={`${post.id}`} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" >Post Title: </label>
              <input type="text" className="form-control" name="title" value={formValues.title} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="body">Post: </label>
              <input type="textarea" className="form-control" name="body" value={formValues.body} onChange={this.handleChange} />
            </div>
  
            <input type="submit" name="submit" value="Add New Post"/>
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getSinglePost: getSinglePost,
    getCategories: getCategories,
    updatePost: updatePost
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)