import io from "socket.io-client";
import React from 'react';

/*
const Chat = props => (

  this.socket = io('localhost:8080');

  this.sendMessage = ev => {
    ev.preventDefault();
    this.socket.emit('SEND_MESSAGE',{
      // json形式で送信するメッセージを記述
    });
  }

  this.socket.on('RECEIVE_MESSAGE',fuction(data){
    // メッセージ受信時に実行したことを記述
  });
)

*/

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      send_message : '',
      receive_message : 'default',
      value : '',
      history :[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.socket = io('localhost:8080');

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE',{
        // json形式で送信するメッセージを記述
        value : this.state.send_message
      });
    }

    this.socket.on('RECEIVE_MESSAGE',(data) => {
      // メッセージ受信時に実行したことを記述
      this.setState({
        receive_message : data.value,
        history : this.state.history.concat([
          this.state.receive_message
        ]),
      });
    })
  }

  handleChange(event) {
    this.setState({send_message: event.target.value});
  }

  handleSubmit(event) {
    //alert('A Name was submitted: ' + this.state.value);
    this.sendMessage(event);
    event.preventDefault();
  }

  render(){
    const history = this.state.history;
    const current = history[history.length-1];

    const moves = history.map((output,index) => {
      const desc = output
      return (
        <li>
          <hi>{desc}</hi>
        </li>
      );
    });

    return(
      <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Message:
              <input type="text"  value={this.state.send_message} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        {/*
        <button className = "button" onClick={this.sendMessage}>
          Send Message
        </button>
        */}
        <h1>{this.state.receive_message}</h1>
        <ol>{moves}</ol>
      </div>
    )
  }

}

export default Chat
