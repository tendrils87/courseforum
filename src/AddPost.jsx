import React from 'react'

class AddPost extends React.Component {
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
        var post= {  userid:this.props.userid.toString(),
                        forumid:this.props.forumid.toString(),
                        content:this.state.content.toString()
        }
        await fetch('http://localhost:3001/createpost', {
            method: 'POST',
            body:JSON.stringify(post),
            headers: { 'Content-Type': 'application/json' }
        } )
        this.props.fetcher()
        this.setState({viewable : false})
    }
    render(){
        return(
            <div className="commentbottombar">
                <div id="replytext" onClick={this.handleClick.bind(this)}>Add Post</div>
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

export default AddPost

//When LOGIN works

// {this.props.loggedIn ?
//     <div id="replytext" onClick={this.handleClick.bind(this)}>Add Post</div>
//     :
//     <div id="replytextloggedout">Log in to Post</div>
//     }
//         {this.state.viewable &&
//             <div >
//                 <form>
//                 <textarea className="replybox" placeholder="Reply" value={this.state.content} onChange={this.handleChange.bind(this)}></textarea><br></br>
//                 <div id="replybutton"><button onClick={this.handleSubmit.bind(this)}>Submit</button></div>
//                 </form>
//             </div>
//         }
