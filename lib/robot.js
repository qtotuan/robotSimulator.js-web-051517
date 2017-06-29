'use strict';

const directions = ['east', 'south', 'west', 'north']
class Robot {

  constructor() {
    this.coordinates = [0, 0];
  }

  orient(direction) {
    if (directions.includes(direction)) {
      this.bearing = direction
    } else {
      throw new Error("Invalid Robot Bearing")
    }
  }

  turnRight() {
    let index = (directions.indexOf(this.bearing) + 1) % 4
    this.bearing = directions[index]
  }

  turnLeft() {
    let index = (directions.indexOf(this.bearing) + 3) % 4
    this.bearing = directions[index]
  }

  at(x, y) {
    this.coordinates = [x, y]
  }

  advance() {
    if (this.bearing === "east") {
      return this.coordinates[0] += 1
    } else if (this.bearing === 'south') {
      return this.coordinates[1] -= 1
    } else if (this.bearing === 'west') {
      return this.coordinates[0] -= 1
    } else if (this.bearing === 'north') {
      return this.coordinates[1] += 1
    }
  }

  instructions(commands) {
    let array = []
    commands.split("").forEach( command => {
      if (command === "L") {
        return array.push("turnLeft")
      } else if (command === "R") {
        return array.push("turnRight")
      } else if (command === "A") {
        return array.push("advance")
      }
    })
    return array
  }

  place(args) {
    this.coordinates = [args.x, args.y]
    this.bearing = args.direction
  }

  evaluate(commands) {
    let actions = this.instructions(commands)
    actions.forEach( action => {
      this[action]()
    }, this)
  }
}
