'use strict';

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Rover extends Model {
  static fillable = ['x', 'y', 'direction', 'instructions', 'initialPosition', 'finalPosition'];

  fill(roverData) {
    this.x = roverData.x;
    this.y = roverData.y;
    this.direction = roverData.direction;
    this.instructions = roverData.instructions;
    this.initialPosition = { x: this.x, y: this.y, direction: this.direction };
    this.finalPosition = null;
  }

  turnLeft() {
    switch (this.direction) {
      case 'N':
        this.direction = 'W';
        break;
      case 'W':
        this.direction = 'S';
        break;
      case 'S':
        this.direction = 'E';
        break;
      case 'E':
        this.direction = 'N';
        break;
      default:
        // deal with invalid
        break;
    }
  }

  turnRight() {
    switch (this.direction) {
      case 'N':
        this.direction = 'E';
        break;
      case 'E':
        this.direction = 'S';
        break;
      case 'S':
        this.direction = 'W';
        break;
      case 'W':
        this.direction = 'N';
        break;
      default:
        // deal with invalid
        break;
    }
  }

  move(plateau) {
    switch (this.direction) {
      case 'N':
        if (this.y < plateau.height - 1) {
          this.y += 1;
        }
        break;
      case 'E':
        if (this.x < plateau.width - 1) {
          this.x += 1;
        }
        break;
      case 'S':
        if (this.y > 0) {
          this.y -= 1;
        }
        break;
      case 'W':
        if (this.x > 0) {
          this.x -= 1;
        }
        break;
      default:
        // deal with invalid
        break;
    }
  }

  explore(plateau) {
    const instructions = this.instructions.split('');
    for (const instruction of instructions) {
      if (instruction === 'L') {
        this.turnLeft();
      } else if (instruction === 'R') {
        this.turnRight();
      } else if (instruction === 'M') {
        this.move(plateau);
      }
    }

    this.finalPosition = {
      x: this.x,
      y: this.y,
      direction: this.direction,
    };

    this.initialPosition = JSON.stringify(this.initialPosition);
    this.finalPosition = JSON.stringify(this.finalPosition);
    console.log("a",this.initialPosition)
    console.log("b",this.finalPosition)
  }
}

module.exports = Rover;