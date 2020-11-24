import React from 'react'
import Comment from './comments'
import {BrowserRouter as Router,Switch,Link, Route} from "react-router-dom"
import AddPost from './AddPost'
const fetch=require('node-fetch')

class Post extends React.Component{
   constructor(props) {
       super()
       this.state = {
        posts:[]
    }
   }

    async componentDidMount(){
        const { match: { params } } = this.props;
        const postdata=await fetch(`http://localhost:4001/posts/${params.forumid}`)
        const postlist=await postdata.json()
        this.setState({posts: this.state.posts.concat(postlist)})
    }

    render(){
        return(
            <div>
            <AddPost forumid={this.props.match.params.forumid} userid={1} />
            {this.state.posts.map((post)=> (
                <div>
                    <li>
                        <Link to={`/forums/${post.forumid}/${post.postid}`}>{post.content}</Link>
                    </li>
                </div>
                )
            )}
            </div>
        )
    }
}
export default Post
