import React, { Component } from 'react';
import io from 'socket.io-client'

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: []
    };

    this.socket = io();

    this.socket.on('RECEIVE_MESSAGE', data => {
      this.addMessage(data);
    });
  }

  sendMessage = (ev) => {
    ev.preventDefault();
    const { username, message } = this.state;

    this.socket.emit('SEND_MESSAGE', {
      username,
      message
    });

    this.setState({message: ''});
  }

  addMessage = data => {
    console.log(data);
    this.setState({ messages: [...this.state.messages, data] });
    console.log(this.state.messages)
  }

  pressEnter = ev => {
    ev.preventDefault();
    if (ev.key == 'Enter') {
      this.sendMessage();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Global Chat</div>
                <hr />
                <div className="messages">
                  { this.state.messages.map((message, idx) => <div key={idx}>{message.username}: {message.message}</div>)}
                </div>
              </div>
              <div className="card-footer">
                <input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={ev => this.setState({ username: ev.target.value })}
                  className="form-control"
                />
                <br />
                <input
                  type="text"
                  placeholder="message"
                  value={this.state.message}
                  onChange={ev => this.setState({ message: ev.target.value })}
                  onKeyPress={this.pressEnter}
                  className="form-control"
                />
                <br />
                <button disabled={this.state.message === '' ? true : false} onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
