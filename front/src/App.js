import React, { Component } from 'react';
import './App.css';
import React from "react";
import io from 'socket.io-client'

class App extends React.Component{
  
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
    // do something here to show the globalNumber and use increment and decrement
    }
  }