import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import io from 'socket.io-client';
// import { throttle } from 'throttle-debounce';

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });
const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = () => (
  connectedPromise.then(() => {
    // Register callbacks
    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
      // document.getElementById('disconnect-modal').classList.remove('hidden');
      // document.getElementById('reconnect-button').onclick = () => {
      //   window.location.reload();
      // };
    });
    // socket.on('list', updateList);
  })
);

// let list = []

// const updateList = ({ players, id }) => {
//   console.log(players, id)
//   list = players
//   list[id].me = true
// }

// export const getList = () => {
//   console.log("client:",list)
//   return list
// }

export const joinGame = username => {
  const oldID = localStorage.playerID
  console.log(oldID)
  socket.emit('join', { username, oldID });
  localStorage.playerID = socket.id
};

export const leaveGame = () => {
  localStorage.removeItem('playerID')
  socket.emit('leave')
  socket.disconnect()
};

Promise.all([
  connect(),
]).catch(console.error);

ReactDOM.render(<App socket={socket}/>, document.getElementById('root'))
