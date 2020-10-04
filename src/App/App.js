import React, { useRef, useEffect } from "react"

import useTime from "../utils/useTime"
import useRepainter from "../utils/useRepainter"

import "./App.css"
import "../shapes/shape.css"

import getEmptyBoard from "../utils/getEmptyBoard"
import getRandomPiece from "../shapes/catalog"

const App = () => {
  const time = useTime()
  const repaint = useRepainter()

  const movingPiece = useRef(getRandomPiece())
  const pieces = useRef([movingPiece.current])

  useEffect(() => {
    pieces.current.forEach(piece => piece.moveX(pieces.current))
    if (!movingPiece.current.canMoveX(pieces.current)) {
        movingPiece.current = getRandomPiece()
        pieces.current.push(movingPiece.current)
    }
  }, [time])

  useEffect(() => {
    document.addEventListener("keypress", ({ key }) => {
      if (key === "a") movingPiece.current.moveLeft(pieces.current)
      if (key === "d") movingPiece.current.moveRight(pieces.current)
      if (key === "w") movingPiece.current.rotate(pieces.current)

      if (key === "a" || key === "d" || key === "w") repaint()
    })
  }, [])

  const board = getEmptyBoard()
  pieces.current.forEach(piece => piece.getPixels().forEach(([x, y]) => (board[x][y] = piece.type)))

  return (
    <>
      Timer = {time}
      <div className="App">
        {board.map((row, i) => (
          <div className="row" key={i}>
            {row.map((type, j) => (
              <div key={`${type} ${i} ${j}`} className={"pixel " + type}>
                {type !== "empty" ? <div className="minipixel" /> : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
