import React, { useRef, useEffect, useState } from "react"

import useTime from "../utils/useTime"
import useRepainter from "../utils/useRepainter"

import "./App.css"
import "../shapes/shape.css"

import getEmptyBoard from "../utils/getEmptyBoard"
import getRandomPiece from "../shapes/catalog"

const originalSpeed = 300
const App = () => {
  const [speed, setSpeed] = useState(originalSpeed)
  const [level, setLevel] = useState(0)
  const [score, setScore] = useState(0)
  const time = useTime(speed)
  const repaint = useRepainter()

  const movingPiece = useRef(getRandomPiece())
  const pieces = useRef([movingPiece.current])
  const [isGameRunning, setGame] = useState(true)

  useEffect(() => {
    setLevel(parseInt(score / 50))
  }, [score])

  useEffect(() => {
    pieces.current.forEach(piece => piece.moveX(pieces.current))
    if (!movingPiece.current.canMoveX(pieces.current)) {
      setSpeed(originalSpeed - level * 50)
      if (!movingPiece.current.getPixels().some(([x, y]) => x === 0)) {
        const board = getEmptyBoard()
        pieces.current.forEach(piece => piece.getPixels().forEach(([x, y]) => (board[x][y] = piece.type)))

        for (let height = 0; height < board.length; ++height) {
          const is_full_line = board[height].every(pixel => pixel !== "empty")
          if (is_full_line) {
            setScore(score => score + 10)
            pieces.current.forEach(piece => piece.deletePixelHeight(height))
          }
          pieces.current = pieces.current.filter(piece => piece.getPixels().length !== 0)
        }

        movingPiece.current = getRandomPiece()
        pieces.current.push(movingPiece.current)
      } else {
        setGame(false)
      }
    }
  }, [time])

  useEffect(() => {
    document.addEventListener("keypress", ({ key }) => {
      if (key === "a") movingPiece.current.moveLeft(pieces.current)
      if (key === "d") movingPiece.current.moveRight(pieces.current)
      if (key === "w") movingPiece.current.rotate()
      if (key === "s") setSpeed(25)

      if (key === "a" || key === "d" || key === "w") repaint()
    })
  }, [repaint])

  const board = getEmptyBoard()
  pieces.current.forEach(piece => piece.getPixels().forEach(([x, y]) => (board[x][y] = piece.type)))

  if (!isGameRunning) {
    return (
      <>
        <h1>Game Over</h1>
      </>
    )
  }

  return (
    <section className="App">
      <section className="board">
        {board.map((row, i) => (
          <div className="row" key={i}>
            {row.map((type, j) => (
              <div key={`${type} ${i} ${j}`} className={"pixel " + type}>
                {type !== "empty" ? <div className="minipixel" /> : null}
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="stats">
        <h3>Timer = {time}</h3>
        <h3>Score = {score}</h3>
        <h3>Level = {level}</h3>
        <h3>Speed = {speed}ms</h3>
      </section>
    </section>
  )
}

export default App
