import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addComment, commentUpdate } from '../redux/modules/comments/actions'

class CommentForm extends Component {
  constructor(props) {
    super(props)

    // State set depending on whether or not a comment was passed in for editing or sets a fresh state for a new comment.
    if (props.comment) {
      this.state = {
        formValues: {
          id: props.comment.id,
          timestamp: props.comment.timestamp,
          body: props.comment.body,
          author: props.comment.author,
          parentId: props.comment.parentId
        }
      }
    } else {
      this.state = {
        formValues: {
          id: null,
          timestamp: null,
          body: "",
          author: "",
          parentId: ""
        }
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  handleSubmit = (e, parent_id) => {
    e.preventDefault()
    let formValues = this.state.formValues

    if (!formValues.id) {
      formValues.id = uuidv4()
      formValues.timestamp = Date.now()
      formValues.parentId = parent_id
      this.props.addComment(formValues)
        .then(this.resetForm())
    } else {
      this.props.commentUpdate(formValues)
        .then(this.props.closeModal())
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    let formValues = this.state.formValues
    const name = e.target.name
    const value = e.target.value

    formValues[name] = value

    this.setState({formValues})
  }

  // This clears the comment form when called so duplicate comments aren't added without retyping.
  resetForm = () => {
    this.setState({
      formValues: {
        id: null,
        timestamp: null,
        body: "",
        author: "",
        parentId: ""
      }
    })
  }

  render() {
    const { parent_id } = this.props
    const { formValues } = this.state

    // Returns different variations of the comment form depending on if it is for a new comment or editing a comment.
    if (formValues.parentId === ""){
    return (
      <div className="container">
        <form onSubmit={(e) => this.handleSubmit(e, parent_id)}>
          <div className="form-group">
            <label htmlFor="body" >Comment: </label>
            <input type="textarea" className="form-control" name="body" value={formValues.body} onChange={this.handleChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="author" >Author: </label>
            <input type="textarea" className="form-control" name="author" value={formValues.author} onChange={this.handleChange} required/>
          </div>
          <input type="submit" name="submit" value="Add Comment"/>
        </form>
      </div>
    )} else {
      return (
        <div className="container">
          <form onSubmit={(e) => this.handleSubmit(e, formValues.parentId)}>
            <div className="form-group">
              <label htmlFor="body" >Comment: </label>
              <input type="textarea" className="form-control" name="body" value={formValues.body} onChange={this.handleChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="author" >Author: </label>
              <input type="textarea" className="form-control" name="author" value={formValues.author} onChange={this.handleChange} disabled required/>
            </div>
            <input type="submit" name="submit" value="Update Comment"/>
          </form>
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addComment: addComment,
    commentUpdate: commentUpdate
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(CommentForm)