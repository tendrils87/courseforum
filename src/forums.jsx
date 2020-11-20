import React from 'react'
const fetch=require('node-fetch')


class Forum extends React.Component{
   constructor(props) {
       super(props)
   }
   state = {
       forums:[]
   }
    async componentDidMount(){
        const forumdata=await fetch('http://localhost:3001/forums')
        const forumlist=await forumdata.json()
        this.setState({forums: this.state.forums.concat(forumlist)})
    }

    render(){
        return(
            <nav>
            <ul>
            {this.state.forums.map((forum)=> (
                <li data-id={forum.id} onClick={this.props.forumselect}>{forum.forumname}</li>
                )
            )}
            </ul>
            </nav>
        )
    }
}
export default Forum