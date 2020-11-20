import './App.css';
import React from 'react'
import Post from './posts'
import Forum from './forums'
import Header from './Header'
import Comment from './comments'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"

class App extends React.Component {
  state={}
forumselect(event){

    this.setState({forum: event.currentTarget.dataset.id})

}

render(){  
  return (
    <div className="App">

      <Router>
      <Header/>
        <Switch>

          <Route path='/' exact component={Forum} />
          <Route path='/forum/:forumid' exact render={(props) => (<Post {...props} key={props.forumid}/>)}/>
          <Route path='/forums/:forumid/:postid' exact render={(props)=> (<Comment {...props} parentid={0}/>)} />
        </Switch>
      </Router>
    </div>
  );
}
}

export default App;
