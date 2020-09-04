import React from 'react';

import AppHeader from '../app-header/app-header'
import SearchPanel from '../search-panel/search-panel'
import ToDoList from '../todo-list/todo-list'
import ItemStatusFilter from '../item-status-filter/item-status-filter'
import AddItemForm from '../add-item-form/add-item-form'

import './app.css';


export default class App extends React.Component{
  maxId = 100;
  state  ={
    todoDate: [
    this.createTodoItem('Выпить таблетки от бед'), 
    this.createTodoItem('Погулять с собакой'), 
    this.createTodoItem('Сделать домашнюю работу')],
    term: '',
    filter: 'all' //active/done/all
  }

  createTodoItem (label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoDate }) =>{
      const idx = todoDate.findIndex((element) => element.id === id);

      const newArray = [...todoDate.slice(0, idx), ...todoDate.slice(idx +1)];
      return {
        todoDate: newArray
      }
    })
  }
  addNewItem = (text) =>{
    const newItem = this.createTodoItem(text)

    this.setState(({todoDate}) =>{
      const newArray = todoDate.concat(newItem);

      return{
        todoDate: newArray
      }
    })
  }

  toggleProperty = (id, arr, propName ) => {
      const idx = arr.findIndex((element) => element.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      
      return [...arr.slice(0, idx), newItem, ...arr.slice(idx +1)];


  }

  onToggleImportant = (id) =>{
    this.setState(({todoDate}) =>{
      return {
        todoDate: this.toggleProperty(id, todoDate, 'important')
      }
  })
  };

  
  onToggleDone = (id) => {
      this.setState(({todoDate}) =>{
        return {
          todoDate: this.toggleProperty(id, todoDate, 'done')
        }
    })
  }
  onSearchChange = (term) => {
    this.setState({term});
  }
  onFilterChange = (filter) =>{
    this.setState({filter})
  }
  search(items, term) {
    if(term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.indexOf(term) > -1;
    } )
  }

  filter(items, filter){
    switch(filter){
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }
  render(){
    const {todoDate, term, filter} = this.state;
    const visibleItems = this.filter(this.search(todoDate, term), filter);
    const doneCount = todoDate.filter((el) => el.done).length;
    const todoCount = todoDate.length - doneCount;
    return(
    <div className='todo-app'>
      <AppHeader toDo={todoCount} done={doneCount}/>
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={this.onSearchChange}/>
        <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
      </div>
      <ToDoList todos={visibleItems} onDeleted={this.deleteItem} onToggleImportant={this.onToggleImportant} onToggleDone={this.onToggleDone}/>
      <AddItemForm onAddNewItem={this.addNewItem}/>
    </div>
  )}
}
