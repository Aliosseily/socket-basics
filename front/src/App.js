import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'

class App extends Component{
  
   state = 
    { 
    socket:null,
    globalNumber:0 ,
    username: '',
    message: '',
    messages: [] 
  }
  
    componentDidMount(){
      const socket = io('http://localhost:8888');

      socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    });

    const addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
        console.log(this.state.messages);
    };

    this.sendMessage = ev => {
        ev.preventDefault();
        socket.emit('SEND_MESSAGE', {
            user: this.state.username,
            message: this.state.message
        })
        this.setState({message: ''});

    }
  
      this.setState({socket}) 
  
      socket.on('number:change', (globalNumber) => {
    this.setState({globalNumber})
      })

      socket.on('user:new', (username)=>{
        console.log('a user called '+username+' has connected')     
       })

       socket.on('user:me', (username)=>{
        this.setState({username})
      })
  
    }
  
    onIncrement = () => this.state.socket.emit('increment')
    onDecrement = () => this.state.socket.emit('decrement')
    render(){
      return (
        <div>
         
    <h1>{this.state.globalNumber}</h1>
          <p>
            <button onClick={this.onIncrement}>+</button>
            <button onClick={this.onDecrement}>-</button>
            {this.state.username+' has connected'}
            {this.sendMessage}
          </p>
          <div>
          <div className="messages">

                {this.state.messages.map(message => {
                    return (
                             <div>{message.user}: {message.message}</div>
                           )
                    })}
          </div>
          <input type="text" placeholder="Username" className="username" value={this.state.username} />
          <br/>
          <input type="text" placeholder="Message" className="message" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
          <br/>
          <button onClick={this.sendMessage}  className="Sendbtn">Send</button>
          </div>
        </div>
      );
    }
  }
  
  export default App;


  