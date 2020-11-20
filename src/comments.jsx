import React from 'react'
const fetch=require('node-fetch')


class Comments extends React.Component{
   constructor(props) {
       super(props)
   }
   state = {
       comments:[]
   }
    async componentDidMount(){
        const commentdata=await fetch(`http://localhost:3001/comments/${this.props.postid}/${this.props.parentid}`)
        const commentlist=await commentdata.json()
        this.setState({comments: this.state.comments.concat(commentlist)})
    }
    
    render(){
        return(
            <ul>
            {this.state.comments.map((comment)=> (
                <div>
                    <p>{comment.content}</p>
                    {comment.children &&
                    <Comments   postid={this.props.postid}
                                parentid={comment.commentid}  
                    />
                    }
                </div>
                )
            )}
            </ul>
        )
    }
}
export default Comments