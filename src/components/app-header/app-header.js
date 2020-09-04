import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done}) =>{
    return (
    <div className='app-header d-flex'>
      <h1>My To-Do List</h1>
      <h2><span>{toDo}</span> more to do, <span>{done}</span> done</h2>
    </div>
    )
  };

export default AppHeader;