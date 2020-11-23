import React from 'react'
import uuid from 'react-uuid'
function handler(props){
    props.setState({handle: uuid()})
    console.log("Handled event")
}
export default handler