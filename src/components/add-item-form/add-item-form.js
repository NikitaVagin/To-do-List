import React from 'react'
import './add-item-form.css'

class AddItemForm extends React.Component {
    state = {
        labelValue: ''
    }
    onLableChange = (event) => {
        this.setState({
            labelValue: event.target.value
        })

    }
    onSubmit = (e) =>{
        e.preventDefault();
        this.props.onAddNewItem(this.state.labelValue);
        this.setState({
            labelValue: ''
        })
    }
    render() {
        return(
        <form className='add-item-form d-flex'
            onSubmit={this.onSubmit}>
            <input type='text'
                className='form-control'
                onChange={this.onLableChange}
                placeholder='What needs to be done' 
                value={this.state.labelValue}/>
            <button className='btn btn-primary add-new-item-btn' type='submit'> <i className='fa fa-plus'/>Add new task</button>
        </form>
        )}
}

export default AddItemForm