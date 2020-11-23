import React from 'react'
import CommentForm from './commentform'
import uuid from 'react-uuid'
import './comment.css'
const fetch = require('node-fetch')


class Comment extends React.Component {
   constructor(props) {
       super()
       this.handler=this.handler.bind(this)
   }
   state = {
       comments:[],
       handle: 1
   }
   async fetcher(){
        const commentdata = await fetch(`http://localhost:3001/comments/${this.props.postid}/${this.props.parentid}`)
        const commentlist = await commentdata.json()
        this.setState({comments: commentlist, handle: 1})
   }
    async componentDidMount(){
            this.fetcher();
    }

    async componentDidUpdate(prevProps, prevState) {
            if(prevState.handler !== this.state.handler){
                this.fetcher();
                console.log('Component updated.')
        }
    }
    handler(){
        this.setState({handle: uuid()})
        console.log("Handled event")
    }
    render(){
        return(
            <ul id="commentlist">
            {this.state.comments.sort((a,b)=>(a.commentid-b.commentid)).map((comment,index)=> (
                
                <div id="commentcontainer"><li key={uuid()}>
                    <h5 id="commentheader">Posted By:{comment.userid}</h5>
                    <div className="comment">{comment.content}</div>
                    <CommentForm userid={comment.userid} parentid={comment.commentid} postid={comment.postid} loggedIn={this.props.loggedIn} key={uuid()} fetcher={this.fetcher.bind(this)} />
                    {comment.children &&
                    <Comment   postid={comment.postid}
                                parentid={comment.commentid}
                                key={uuid()}
                                fetcher={this.fetcher.bind(this)}
                                loggedIn={this.props.loggedIn}  
                    />
                    }
                    </li>
                </div>
                )
            )}
            </ul>
        )
    }
}
export default Comment