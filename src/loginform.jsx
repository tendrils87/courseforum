import React from 'react'

class LoginForm extends React.Component {
    constructor(props){
        super()
        this.state={username:"",
                    password:"",
                    type:"student"
                    }
    }
    handleuserChange(e){
        this.setState({username: e.target.value})
    }
    handlepassChange(e){
        this.setState({password: e.target.value})
    }
    handleType(e){
        this.setState({type: e.target.value})
    }
    render(){
        return(
            <div>
                <div>
                <input value={this.state.username} onChange={this.handleuserChange.bind(this)} placeholder="Username"></input>
                <input value={this.state.password} onChange={this.handlepassChange.bind(this)} placeholder="Password"></input>
                </div>
                <div>
                <div> <label><input type="radio" name="type" value="student" onClick={this.handleType.bind(this)}></input>Student</label></div>
                <div><label><input type="radio" name="type" value="teacher" onClick={this.handleType.bind(this)}></input>Teacher</label></div>
                </div>
                <button onClick={() => this.props.performLogin(this.state.username,this.state.password,this.state.type)}>Submit</button>
            </div>
        )
    }
}
export default LoginForm