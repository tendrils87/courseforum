import React from 'react'
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'
import CommentForm from './commentform'
const fetch=require('node-fetch')


class Comments extends React.Component{
   constructor(props) {
       super()
   }
   state = {
       comments:[],
       match:{},
       handle: 1
   }
    async componentDidMount(){
        const { match: { params } } = this.props;
        const commentdata=await fetch(`http://localhost:3001/comments/${params.postid}/${this.props.parentid}`)
        const commentlist=await commentdata.json()
        this.setState({comments: this.state.comments.concat(commentlist), match: this.props.match})
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
          console.log('Component updated.')
        }
      }
    handler(){
        this.setState({handle: this.state.handle+1})
    }  
    render(){
        return(
            <ul>
            {this.state.comments.map((comment)=> (
                <div>
                    <h5 className="commentheader">{comment.userid}  {comment.commentid}  {comment.parentid}</h5>
                    <p className="comment">{comment.content}</p>
                    <CommentForm userid={comment.userid} parentid={comment.commentid} postid={comment.postid} handler={this.handler.bind(this)}/>
                    {comment.children &&
                    <Comments   postid={comment.postid}
                                parentid={comment.commentid}
                                match={this.state.match}  
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