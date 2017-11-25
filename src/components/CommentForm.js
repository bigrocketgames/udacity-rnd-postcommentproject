import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addComment } from '../redux/modules/comments/actions'

class CommentForm extends Component {
  constructor(props) {
    super(props)
    if (props.location) {
      this.state = {
        formValues: {
          id: props.location.state.comment.id,
          timestamp: props.location.state.comment.timestamp,
          body: props.location.state.comment.body,
          author: props.location.state.comment.author,
          parentId: props.location.state.comment.parentId
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
  }

  handleSubmit = (e, parent_id) => {
    e.preventDefault()
    let formValues = this.state.formValues

    if (!formValues.id) {
      formValues.id = uuidv4()
      formValues.timestamp = Date.now()
      formValues.parentId = parent_id
      this.props.addComment(formValues)
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

  render() {
    const { parent_id } = this.props
    const { formValues } = this.state

    return (
      <div className="container">
        <form onSubmit={(e) => this.handleSubmit(e, parent_id)}>
          <div className="form-group">
            <label htmlFor="body" >Comment: </label>
            <input type="textarea" className="form-control" name="body" value={formValues.body} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="author" >Author: </label>
            <input type="textarea" className="form-control" name="author" value={formValues.author} onChange={this.handleChange} />
          </div>
          <input type="submit" name="submit" value="Submit Comment"/>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addComment: addComment
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(CommentForm)