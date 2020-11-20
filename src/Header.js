import React from 'react';
 
export default class Header extends React.Component {
  render(){
    return (
      <header>
        <Link to='/'>  
            <h1>
             Course Forums
            </h1>
        </Link>  
      </header>
    );
  }
}