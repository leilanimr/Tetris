import Shape from "./shape"
import RotatedShape from "./rotate"

const getl1 = () => {
  return new Shape(
    [
      [3, 4],
      [2, 4],
      [1, 4],
      [0, 4],
    ],
    "l"
  )
}

const getl2 = () => {
  return new Shape(
    [
      [0, 6],
      [0, 5],
      [0, 4],
      [0, 3],
    ],
    "l"
  )
}

const getRotatedl = () => {
  return new RotatedShape([getl2(), getl1()], "l")
}


const getL1 = () => {
  return new Shape(
    [
      [2, 5],
      [2, 4],
      [1, 4],
      [0, 4],
    ],
    "L"
  )
}

const getL2 = () => {
  return new Shape(
    [
      [1, 3],
      [0, 3],
      [0, 4],
      [0, 5],
    ],
    "L"
  )
}

const getL3 = () => {
  return new Shape(
    [
      [2, 5],
      [1, 5],
      [0, 5],
      [0, 4],
    ],
    "L"
  )
}

const getL4 = () => {
  return new Shape(
    [
      [1, 3],
      [1, 4],
      [1, 5],
      [0, 5],
    ],
    "L"
  )
}

const getRotatedL = () => {
  return new RotatedShape([getL1(), getL2(), getL3(), getL4()], "L")
}

const getC = () => {
  return new Shape(
    [
      [1, 5],
      [1, 4],
      [0, 4],
      [0, 5],
    ],
    "C"
  )
}

const getRotatedC = () => {
  return new RotatedShape([getC()], "C")
}
const getZ1 = () => {
  return new Shape(
    [
      [1, 4],
      [1, 5],
      [0, 3],
      [0, 4],
    ],
    "Z"
  )
}

const getZ2 = () => {
  return new Shape(
    [
      [2, 5],
      [1, 5],
      [1, 4],
      [0, 4],
    ],
    "Z"
  )
}

const getRotatedZ = () => {
  return new RotatedShape([getZ1(), getZ2()], "Z")
}

const getT1 = () => {
  return new Shape(
    [
      [1, 3],
      [1, 4],
      [1, 5],
      [0, 4],
    ],
    "T"
  )
}

const getT2 = () => {
  return new Shape(
    [
      [2, 4],
      [1, 4],
      [0, 4],
      [1, 5],
    ],
    "T"
  )
}

const getT3 = () => {
  return new Shape(
    [
      [1, 4],
      [0, 4],
      [0, 3],
      [0, 5],
    ],
    "T"
  )
}

const getT4 = () => {
  return new Shape(
    [
      [2, 4],
      [1, 3],
      [1, 4],
      [0, 4],
    ],
    "T"
  )
}

const getRotatedT = () => {
  return new RotatedShape([getT1(), getT2(), getT3(), getT4()], "T")
}

const getLi1 = () => {
  return new Shape(
    [
      [2, 4],
      [2, 5],
      [1, 5],
      [0, 5],
    ],
    "Li"
  )
}

const getLi2 = () => {
  return new Shape(
    [
      [1, 5],
      [1, 4],
      [1, 3],
      [0, 3],
    ],
    "Li"
  )
}

const getLi3 = () => {
  return new Shape(
    [
      [2,4],
      [1, 4],
      [0, 4],
      [0, 5],
    ],
    "Li"
  )
}

const getLi4 = () => {
  return new Shape(
    [
      [1, 5],
      [0, 5],
      [0, 4],
      [0, 3],
    ],
    "Li"
  )
}

const getRotatedLi = () => {
  return new RotatedShape([getLi1(), getLi2(), getLi3(), getLi4()], "Li")
}

const getS1 = () => {
  return new Shape(
    [
      [1, 3],
      [1, 4],
      [0, 4],
      [0, 5],
    ],
    "S"
  )
}

const getS2 = () => {
  return new Shape(
    [
      [2, 5],
      [1, 5],
      [1, 4],
      [0, 4],
    ],
    "S"
  )
}

const getRotatedS = () => {
  return new RotatedShape([getS1(), getS2()], "S")
}

const getRandomPiece = () => {
  const possibleShapes = [getRotatedl(), getRotatedL(),  getRotatedC(), getRotatedZ(), getRotatedT(), getRotatedLi(), getRotatedS()]
  return possibleShapes[Math.floor(Math.random() * possibleShapes.length)]
}

export default getRandomPiece
