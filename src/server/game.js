const Player = require('./player')

class Game {
  constructor(id) {
    this.id = id
    this.sockets = {};
    this.players = {};
    setInterval(this.sendList.bind(this), 3000);
  }

  addPlayer(socket, username, oldID) {
    this.sockets[socket.id] = socket;
    if (!this.players[oldID]) {
      this.players[socket.id] = new Player(socket.id, username);
    } else if (oldID !== socket.id) {
      this.players[socket.id] = this.players[oldID].copy()
      delete this.players[oldID];
    }
  }

  disconnectPlayer(socket) {
    delete this.sockets[socket.id];
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  sendList() {
    Object.keys(this.sockets).forEach(id => {
      const socket = this.sockets[id];
      socket.emit('list', { players: this.players, id });
    });
  }

  // handleInput(socket, dir) {
  //   if (this.players[socket.id]) {
  //     this.players[socket.id].setDirection(dir);
  //   }
  // }

  // update() {
  //   // Calculate time elapsed
  //   const now = Date.now();
  //   const dt = (now - this.lastUpdateTime) / 1000;
  //   this.lastUpdateTime = now;

  //   // Update each bullet
  //   const bulletsToRemove = [];
  //   this.bullets.forEach(bullet => {
  //     if (bullet.update(dt)) {
  //       // Destroy this bullet
  //       bulletsToRemove.push(bullet);
  //     }
  //   });
  //   this.bullets = this.bullets.filter(bullet => !bulletsToRemove.includes(bullet));

  //   // Update each player
  //   Object.keys(this.sockets).forEach(playerID => {
  //     const player = this.players[playerID];
  //     const newBullet = player.update(dt);
  //     if (newBullet) {
  //       this.bullets.push(newBullet);
  //     }
  //   });

  //   // Apply collisions, give players score for hitting bullets
  //   const destroyedBullets = applyCollisions(Object.values(this.players), this.bullets);
  //   destroyedBullets.forEach(b => {
  //     if (this.players[b.parentID]) {
  //       this.players[b.parentID].onDealtDamage();
  //     }
  //   });
  //   this.bullets = this.bullets.filter(bullet => !destroyedBullets.includes(bullet));

  //   // Check if any players are dead
  //   Object.keys(this.sockets).forEach(playerID => {
  //     const socket = this.sockets[playerID];
  //     const player = this.players[playerID];
  //     if (player.hp <= 0) {
  //       socket.emit(Constants.MSG_TYPES.GAME_OVER);
  //       this.removePlayer(socket);
  //     }
  //   });

  //   // Send a game update to each player every other time
  //   if (this.shouldSendUpdate) {
  //     const leaderboard = this.getLeaderboard();
  //     Object.keys(this.sockets).forEach(playerID => {
  //       const socket = this.sockets[playerID];
  //       const player = this.players[playerID];
  //       socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
  //     });
  //     this.shouldSendUpdate = false;
  //   } else {
  //     this.shouldSendUpdate = true;
  //   }
  // }

  // getLeaderboard() {
  //   return Object.values(this.players)
  //     .sort((p1, p2) => p2.score - p1.score)
  //     .slice(0, 5)
  //     .map(p => ({ username: p.username, score: Math.round(p.score) }));
  // }

  // createUpdate(player, leaderboard) {
  //   const nearbyPlayers = Object.values(this.players).filter(
  //     p => p !== player && p.distanceTo(player) <= Constants.MAP_SIZE / 2,
  //   );
  //   const nearbyBullets = this.bullets.filter(
  //     b => b.distanceTo(player) <= Constants.MAP_SIZE / 2,
  //   );

  //   return {
  //     t: Date.now(),
  //     me: player.serializeForUpdate(),
  //     others: nearbyPlayers.map(p => p.serializeForUpdate()),
  //     bullets: nearbyBullets.map(b => b.serializeForUpdate()),
  //     leaderboard,
  //   };
  // }
}

module.exports = Game
