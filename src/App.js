import './App.css';
import React from 'react'
import Post from './posts'
import Forum from './forums'
import Header from './Header'
import Comment from './comments'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import uuid from 'react-uuid'


class App extends React.Component {
  state={loggedIn:false}
async loginHandler(){
  const response= await fetch('http://localhost:4001/login')
  const login=await response.json()
  console.log(login)
  this.setState({loggedIn: login})
}
async componentDidMount(){
  this.loginHandler();
}
async performLogin(username,password,type){
  await fetch(`http://localhost:4001/performlogin/${username}/${password}/${type}`)
  this.loginHandler();
}
render(){  
  return (
    <div className="App">

      <Router>
      <Header loginHandler={this.loginHandler.bind(this)} loggedIn={this.state.loggedIn} performLogin={this.performLogin.bind(this)}/>
        <Switch>
          <Route path='/' exact component={Forum} />
          <Route path='/forum/:forumid' exact render={(props) => (<Post {...props} loggedIn={this.state.loggedIn} key={uuid()}/>)}/>
          <Route path='/forums/:forumid/:postid' exact render={(props)=> (<Comment {...props} loggedIn={this.state.loggedIn} key={uuid()} parentid={0}/>)} />
        </Switch>
      </Router>
    </div>
  );
}
}

export default App;
