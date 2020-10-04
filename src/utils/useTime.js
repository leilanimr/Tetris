import { useState, useEffect } from "react"

const useTime = () => {
  const [currentTime, setTime] = useState(0)

  useEffect(() => {
    const moveByOne = () => setTime(t => t + 1)
    const id = setInterval(moveByOne, 1000)
    return () => clearInterval(id)
  }, [])

  return currentTime
}


 
export default useTime

