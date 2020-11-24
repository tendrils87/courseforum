import React from 'react'
import uuid from 'react-uuid'
import Commentz from './Comment'




class Comments extends React.Component {
   constructor(props) {
       super()
   }
   state = {}

    render(){
        let postid=this.props.match.params.postid
        return(
            <Commentz postid={postid} parentid={0} loggedIn={true} key={uuid()}/>
        )
    }
}
export default Comments