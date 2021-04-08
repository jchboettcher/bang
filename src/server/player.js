class Player {
  constructor(id, username) {
    this.id = id
    this.username = username;
  }

  copy() {
    return new Player(this.id, this.username)
  }

  // Returns a newly created bullet, or null.
  // update(dt) {
  //   super.update(dt);

  //   // Update score
  //   this.score += dt * Constants.SCORE_PER_SECOND;

  //   // Make sure the player stays in bounds
  //   this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
  //   this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

  //   // Fire a bullet, if needed
  //   this.fireCooldown -= dt;
  //   if (this.fireCooldown <= 0) {
  //     this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
  //     return new Bullet(this.id, this.x, this.y, this.direction);
  //   }

  //   return null;
  // }

  // takeBulletDamage() {
  //   this.hp -= Constants.BULLET_DAMAGE;
  // }

  // onDealtDamage() {
  //   this.score += Constants.SCORE_BULLET_HIT;
  // }

  // serializeForUpdate() {
  //   return {
  //     ...(super.serializeForUpdate()),
  //     direction: this.direction,
  //     hp: this.hp,
  //   };
  // }
}

module.exports = Player
