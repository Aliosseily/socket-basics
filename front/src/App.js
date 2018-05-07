import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'

class App extends Component{
  
    state = { socket:null, globalNumber:0 }
  
    componentDidMount(){
      const socket = io('http://localhost:8888');
  
      this.setState({socket})
  
      socket.on('number:change', (globalNumber) => {
    this.setState({globalNumber})
      })
  
    }
  
    onIncrement = () => this.state.socket.emit('increment')
    onDecrement = () => this.state.socket.emit('decrement')
    render(){
      return (
        <div className="App">
         
    <h1>{this.state.globalNumber}</h1>
          <p className="App-intro">
            <button onClick={this.onIncrement}>+</button>
            <button onClick={this.onDecrement}>-</button>
          </p>
        </div>
      );
    }
  }
  
  export default App;