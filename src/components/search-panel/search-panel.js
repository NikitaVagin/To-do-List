import React from 'react'
import './search-panel.css'

class SearchPanel extends React.Component {
  state = {
    term: ''
  }
  onSearchChange = (e) =>{
    const term = e.target.value
    this.setState({
      term
    })
    this.props.onSearchChange(term)
  }
      render() {
        return (
        <input placeholder='type to search' className='form-control search-input' onChange={this.onSearchChange} value={this.state.term}/>)
      }
      
  }
export default SearchPanel;