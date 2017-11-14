import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Categories from '../../components/Categories'
import Posts from '../../components/Posts'
import { getPosts } from '../../redux/modules/posts/actions'
import { getCategories } from '../../redux/modules/categories/actions'
import { postVote } from '../../redux/modules/posts/actions'

class Home extends Component {
  constructor(props){
    super(props)

    this.votePost = this.votePost.bind(this);
  }

  votePost = (e, voteType) => {
    e.preventDefault();
    this.props.postVote(e.currentTarget.id, voteType);
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  render() {
    const { posts, categories } = this.props
    return (
      <div>
        <div className="header text-center">
          <h2>Cool Content Displayer</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-3 sidebar-left">
              <h5 className="text-center sidebar-title">Pick a Category</h5>
              <ul className="category-list">
              {categories.map((category) => <Categories key={category.name} category={category} />)}
              </ul>
            </div>
            <div className="col-sm-8 posts-main">
              <div className="row">
                {posts.map((post) => <Posts key={post.id} post={post} vote={this.votePost}/>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getPosts: getPosts,
    getCategories: getCategories,
    postVote: postVote
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)