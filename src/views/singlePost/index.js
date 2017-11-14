import React, { Component } from 'react'

class SinglePost extends Component {
  componentDidMount() {

  }

  render(){
    const { match } = this.props

    return(
      <div className="container">
        <p>this is the single post page</p>
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

export default SinglePost