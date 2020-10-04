class RotatedShape {
  shapes = []
  current = 0
  type = ""

  constructor(shapes, type) {
    this.shapes = shapes
    this.type = type
  }

  getShape() {
    return this.shapes[this.current]
  }

  getPixels() {
    return this.shapes[this.current].getPixels()
  }

  canMoveX(pieces) {
    const others = pieces.filter(piece => piece !== this)
    return this.shapes[this.current].canMoveX(others)
  }

  moveX(pieces) {
    const others = pieces.filter(piece => piece !== this)
    return this.shapes.forEach(shape => shape.moveX(others))
  }

  moveRight(pieces) {
    const others = pieces.filter(piece => piece !== this)
    return this.shapes.forEach(shape => shape.moveRight(others))
  }

  moveLeft(pieces) {
    const others = pieces.filter(piece => piece !== this)
    return this.shapes.forEach(shape => shape.moveLeft(others))
  }

  rotate() {
    this.current = (this.current + 1) % this.shapes.length
  }
}

export default RotatedShape
