import React from 'react'
const fetch=require('node-fetch')

class CommentForm extends React.Component {
    constructor(props){
        super()
    }
    state = {
        viewable: false,
        content: ""
    }
    handleClick(){
        this.setState({viewable: !this.state.viewable})

    }
    handleChange(e){
        this.setState({content: e.target.value})
    }
    async handleSubmit(e){
        var comment= {  userid:this.props.userid.toString(),
                        parentid:this.props.parentid.toString(),
                        postid:this.props.postid.toString(),
                        content:this.state.content
        }
        await fetch('http://localhost:3001/addcomment', {
            method: 'POST',
            body:JSON.stringify(comment),
            headers: { 'Content-Type': 'application/json' }
        } )
        this.props.fetcher()
        this.setState({viewable : false})
    }
    render(){
        return(
            <div className="commentbottombar">
                {this.props.loggedIn ?
                <div id="replytext" onClick={this.handleClick.bind(this)}>reply</div>
                :
                <div id="replytextloggedout">log in to reply</div>
                }
                    {this.state.viewable &&
                        <div >
                            <form>
                            <textarea className="replybox" placeholder="Reply" value={this.state.content} onChange={this.handleChange.bind(this)}></textarea><br></br>
                            <div id="replybutton"><button onClick={this.handleSubmit.bind(this)}>Submit</button></div>
                            </form>
                        </div>
                    }

            </div>
        )
    }
}
export default CommentForm