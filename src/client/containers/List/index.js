import React, { useState } from 'react'

const List = ({ socket }) => {
  const [list, setList] = useState([])
  const updateList = ({ players, id }) => {
    console.log(players,id)
    players[id].me = true
    setList(players)
  }
  socket.on('list', updateList);
  return (
    <>
      {Object.keys(list).map(id => {
        const player = list[id]
        return (player.me
          ? <p key={id}><b>{player.username}</b></p>
          : <p key={id}>{player.username}</p>)
      })}
      {/* <button onClick={ () => {
        
      }}>Add player
      </button> */}
    </>
  )
}

export default List
