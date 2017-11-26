import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Categories from '../../components/Categories'
import Sortbox from '../../components/Sortbox'
import Posts from '../../components/Posts'
import { getPosts, postVote, postDelete } from '../../redux/modules/posts/actions'
import { getCategories } from '../../redux/modules/categories/actions'

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      sortBy: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.votePost = this.votePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      sortBy: e.currentTarget.value
    })
  }

  votePost = (e, voteType) => {
    e.preventDefault();
    this.props.postVote(e.currentTarget.id, voteType);
  }

  deletePost = (e) => {
    e.preventDefault();
    this.props.postDelete(e.target.id);
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  render() {
    const { categories, match } = this.props
    let posts, pageTitle = null;

    if (match.params.category) {
      posts = this.props.posts.filter((post) => post.category === match.params.category )
      pageTitle = `Posts from the ${match.params.category} category`
    } else {
      posts = this.props.posts
      pageTitle = "All the Posts"
    }

    switch(this.state.sortBy) {
      case "scoreASC":
        posts = posts.sort((a, b) => {
          return b.voteScore - a.voteScore
        });
        break;

      case "scoreDESC":
        posts = posts.sort((a, b) => {
          return a.voteScore - b.voteScore
        });
        break;

      case "dateASC":
        posts = posts.sort((a, b) => {
          return b.timestamp - a.timestamp
        })
        break;

      case "dateDESC":
        posts = posts.sort((a, b) => {
          return a.timestamp - b.timestamp
        })
        break;

      default:
        break;
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h1>{pageTitle}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3 sidebar-left">
              <h5 className="text-center sidebar-title">Pick a Category</h5>
              <ul className="category-list">
              {categories.map((category) => <Categories key={category.name} category={category} />)}
              </ul>
            </div>
            <div className="col-sm-8 posts-main">
              <div className="row">
                <div className="col-sm-6 addNewPost">
                  <Link to="/posts/new" className="btn btn-secondary">Add New Post</Link>
                </div>
                <div className="col-sm-6 sortbox">
                  <Sortbox sortBy={this.state.sortBy} handleChange={this.handleChange} />
                </div>
              </div>
              <hr />
              <div className="row">
                {posts.length > 0 && posts.map((post) => <Posts key={post.id} post={post} vote={this.votePost} deletePost={this.deletePost}/>)}
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
    postVote: postVote,
    postDelete: postDelete
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)