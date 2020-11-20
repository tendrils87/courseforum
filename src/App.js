import './App.css';
import Comments from './comments'
import React from 'react'
import Post from './posts'
import Forum from './forums'

class App extends React.Component {
  state={forum: '2'}
forumselect(event){

    this.setState({forum: event.currentTarget.dataset.id})

}
render(){  
  return (
    <div className="App">
      <Forum forum={this.state.forum}
              forumselect={this.forumselect.bind(this)}
      />
      <Post forumid={this.state.forum} key={this.state.forum}/>
      <Comments postid={"1"}
               parentid={"0"} 
               />
    </div>
  );
}
}

export default App;
