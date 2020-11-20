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
        e.preventDefault()
        var comment= {  userid:this.props.userid.toString(),
                        parentid:this.props.parentid.toString(),
                        postid:this.props.postid.toString(),
                        content:this.state.content
        }
        await fetch('http://localhost:3001/addcomment', {
            method: 'POST',
            body:JSON.stringify(comment),
            headers: { 'Content-Type': 'application/json' }
        } ).then(()=>this.props.handler)
        this.setState({viewable : false})

    }
    render(){
        return(
            <div>
            <h5 onClick={this.handleClick.bind(this)}>reply</h5>
            {this.state.viewable &&
            <div>
            <input placeholder="Reply" value={this.state.content} onChange={this.handleChange.bind(this)}></input>
            <button onClick={this.handleSubmit.bind(this)}>Submit</button>
            </div>
            }
            </div>
        )
    }
}
export default CommentForm