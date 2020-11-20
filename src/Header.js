import React from 'react';
import Forum from './forums'
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'
 
export default class Header extends React.Component {
  render(){
    return (
      <header>
          <Link to='/'>  
            <h1>Course Forums</h1>
          </Link>
      </header>
    );
  }
}