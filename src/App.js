import './App.css';
import Comments from './comments'
import React from 'react'
import Post from './posts'
import Forum from './forums'
import Header from './Header'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"

class App extends React.Component {
  state={forum: '2'}
forumselect(event){

    this.setState({forum: event.currentTarget.dataset.id})

}
render(){  
  return (
    <div className="App">
      <Header/>
      <Router>
        <Switch>
          <Route path='/' exact render={(props) => (<Forum {...props} forum={this.state.forum} forumselect={this.forumselect.bind(this)}/>)} />
          <Route path='/forum/:forumid' render={(props) => (<Post {...props} forumid={this.state.forum} key={this.state.forum}/>)}/>
        </Switch>
      </Router>

      <Post forumid={this.state.forum} key={this.state.forum}/>
      <Comments postid={"1"}
               parentid={"0"} 
               />
    </div>
  );
}
}

export default App;
