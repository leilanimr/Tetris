import deepCopy from "../utils/deepCopy"
import getEmptyBoard from "../utils/getEmptyBoard"

const sortByBiggerX = ([x1, y1], [x2, y2]) => x2 - x1
const sortByBiggerY = ([x1, y1], [x2, y2]) => y2 - y1
const sortBySmallerY = ([x1, y1], [x2, y2]) => y1 - y2

class Shape {
  type = ""

  constructor(pixels, type) {
    this.pixels = deepCopy(pixels).sort(sortByBiggerX)
    this.type = type
  }

  getPixels() {
    return this.pixels
  }

  getPixelsAtBottom() {
    const currentPixels = deepCopy(this.pixels).sort(sortByBiggerX)
    const bottom = currentPixels[0][0]
    return this.pixels.filter(([x, y]) => x === bottom)
  }

  getPixelsAtRight() {
    const currentPixels = deepCopy(this.pixels).sort(sortByBiggerY)
    const right = currentPixels[0][1]
    return this.pixels.filter(([x, y]) => y === right)
  }

  getPixelsAtLeft() {
    const currentPixels = deepCopy(this.pixels).sort(sortBySmallerY)
    const left = currentPixels[0][1]
    return this.pixels.filter(([x, y]) => y === left)
  }

  canMoveX(pieces) {
    const board = getEmptyBoard()
    pieces.forEach(piece => piece.getPixels().forEach(([x, y]) => (board[x][y] = piece.type)))

    return this.getPixelsAtBottom().every(([x, y]) => {
      if (x === 23) return false
      if (board[x + 1][y] !== "empty") return false

      return true
    })
  }

  canMoveLeft(pieces) {
    const board = getEmptyBoard()
    pieces.forEach(piece => piece.getPixels().forEach(([x, y]) => (board[x][y] = piece.type)))

    return this.getPixelsAtLeft().every(([x, y]) => {
      if (y === 0) return false
      if (board[x][y - 1] !== "empty") return false

      return true
    })
  }

  canMoveRight(pieces) {
    const board = getEmptyBoard()
    pieces.forEach(piece => piece.getPixels().forEach(([x, y]) => (board[x][y] = piece.type)))

    return this.getPixelsAtRight().every(([x, y]) => {
      if (y === 10) return false
      if (board[x][y + 1] !== "empty") return false

      return true
    })
  }

  moveX(pieces) {
    if (!this.canMoveX(pieces)) return
    this.pixels = this.pixels.map(([x, y]) => [x + 1, y])
  }

  moveRight(pieces) {
    if (!this.canMoveRight(pieces)) return
    this.pixels = this.pixels.map(([x, y]) => [x, y + 1])
  }

  moveLeft(pieces) {
    if (!this.canMoveLeft(pieces)) return
    this.pixels = this.pixels.map(([x, y]) => [x, y - 1])
  }
}

export default Shape
