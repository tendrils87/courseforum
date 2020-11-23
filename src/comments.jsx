import React from 'react'
import uuid from 'react-uuid'
import Comment from './Comment'




class Comments extends React.Component {
   constructor(props) {
       super()
   }
   state = {}

    render(){
        let postid=this.props.match.params.postid
        return(
            <Comment postid={postid} parentid={0} key={uuid()}/>
        )
    }
}
export default Comments