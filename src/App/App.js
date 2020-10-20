import React, { useRef, useEffect, useState } from "react"

import useTime from "../utils/useTime"
import useRepainter from "../utils/useRepainter"

import "./App.css"
import "../shapes/shape.css"

import getEmptyBoard from "../utils/getEmptyBoard"
import getRandomPiece from "../shapes/catalog"

const originalSpeed = 500
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
    pieces.current.forEach(piece => piece.moveX(pieces.current))//todas se caen
    if (!movingPiece.current.canMoveX(pieces.current)) { //ocupa todas las piezas para generar el tablero y ver si se puede mover
      setSpeed(originalSpeed - level * 50) //reset velocidad por si s
      if (!movingPiece.current.getPixels().some(([x, y]) => x === 0)) { //Verifica si esta la pieza hasta arriba para ver si el juego continua
        const board = getEmptyBoard()
        pieces.current.forEach(piece => piece.getPixels().forEach(([x, y]) => (board[x][y] = piece.type)))

        for (let height = 0; height < board.length; ++height) {
          const is_full_line = board[height].every(pixel => pixel !== "empty") //verifica si la linea esta llena
          if (is_full_line) {
            setScore(score => score + 10) //aumenta puntuacion
            pieces.current.forEach(piece => piece.deletePixelHeight(height)) //elimina pixeles de esa linea
          }
          pieces.current = pieces.current.filter(piece => piece.getPixels().length !== 0) //solo piezas con pixeles
        }

        movingPiece.current = getRandomPiece()//genera ptra pieza
        pieces.current.push(movingPiece.current) //anade la moving pis al conjunto de las demas piezas
      } else {
        setGame(false) //acaba juego
      }
    }
  }, [time]) //cada que el time cambie

  useEffect(() => {
    document.addEventListener("keypress", ({ key }) => {
      if (key === "a") movingPiece.current.moveLeft(pieces.current) //recibe todas las piezas para ver si se puede mover
      if (key === "d") movingPiece.current.moveRight(pieces.current)
      if (key === "w") movingPiece.current.rotate()
      if (key === "s") setSpeed(25) //baje mas rapido

      if (key === "a" || key === "d" || key === "w") repaint()
    })
  }, [repaint])

  const board = getEmptyBoard() 
  pieces.current.forEach(piece => piece.getPixels().forEach(([x, y]) => (board[x][y] = piece.type)))//pinta las piezas en el board que se acaba de generar

  if (!isGameRunning) {
    return (
      <>
        <h1>Game Over</h1>
        <h1>{score}</h1>

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
        <h3>Puntuacion = {score}</h3>
        <h3>Nivel = {level}</h3>
      </section>
    </section>
  )
}

export default App
