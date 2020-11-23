import React from 'react'
import {Link} from "react-router-dom"
const fetch=require('node-fetch')


class Forum extends React.Component{
   constructor(props,{match}) {
       super()
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

            <div>
                <ul>
                    {this.state.forums.map((forum)=> (
                        <div>
                        <li><Link to={`/forum/${forum.id}`}>{forum.forumname}</Link></li>
                        </div>
                    )
                    )}
            
                </ul>
            </div>

        )
    }
}
export default Forum