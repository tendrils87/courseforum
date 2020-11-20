import React from 'react'
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
        const postdata=await fetch(`http://localhost:3001/posts/${this.props.forumid}`)
        const postlist=await postdata.json()
        this.setState({posts: this.state.posts.concat(postlist)})

    }

    render(){
        
        return(
            
            <ul key={this.props.forum}>
            {this.state.posts.map((post)=> (
                <PostItem key={this.props.forum} props={post}/>
                )
            )}
            </ul>
        )
    }
}
export default Post