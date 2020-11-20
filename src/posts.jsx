import React from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
const fetch=require('node-fetch')

function PostItem(post){
    return <li>{post.props.content}</li>
}
  


class Post extends React.Component{
   constructor(props) {
       super()
   }
   state = {
       posts:[]
   }
    async componentDidMount(){
        const {match : {params}} = this.props
        const postdata=await fetch(`http://localhost:3001/posts/${params.forumid}`)
        const postlist=await postdata.json()
        this.setState({posts: this.state.posts.concat(postlist)})

    }

    render(){
        
        return(
            
            <ul >
            {this.state.posts.map((post)=> (
                <Route path={`/forums/${this.props.forum}/:postid`} render={(props)=> (<PostItem {...props} key={this.props.forum} props={post}/>)} />
                )
            )}
            </ul>
        )
    }
}
export default Post