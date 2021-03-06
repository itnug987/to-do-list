import React from 'react';
import './App.css';
import ListItems from './ListItems'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

library.add(faTrash);

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items:[],
      currentItem: {
        text:'',
        key: ''
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.setCompleted = this.setCompleted.bind(this);

  }

  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }
  
  addItem(e){
    e.preventDefault();

    const newItem = this.state.currentItem;
    //console.log(newItem);

    if(newItem.text!==""){

      const newItems = [...this.state.items, newItem];
      this.setState({
          items: newItems,
          currentItem: {
            text: '',
            key: ''
          }
      })

      
    }

    console.log(this.state.items);

  }

  deleteItem(key){
      const filteredItems = this.state.items.filter(item => item.key!==key);

      this.setState({
        items: filteredItems
      })
  }

  setUpdate(text, key){
    const items = this.state.items;
    items.map(item =>{
      if(item.key === key){
          item.text = text;
      }
    })

    this.setState({
      items: items
    })
  }

  setCompleted(key){
    const items = this.state.items;

    items.map(item =>{
      if(item.key === key){
          item.text = item.text+ " -- completed"
      }
    })

    this.setState({
      items: items
    })
  }

  render(){
    return(
      <div>
        <h1>To DO List</h1>
      
      <div className="App">
          <header>
            <form id="to-do-form" onSubmit={this.addItem}>
                <input type="text" placeholder="Enter text"
                value={this.state.currentItem.text}
                onChange={this.handleInput}></input>
                <button type="submit">Add</button>
            </form>
      </header>

      <ListItems items={this.state.items} deleteItem = {this.deleteItem} setUpdate = {this.setUpdate} setCompleted = {this.setCompleted}/>
      </div>

      </div>
    );
  }
}

export default App;
