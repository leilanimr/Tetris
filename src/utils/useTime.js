import { useState, useEffect } from "react"

const useTime = (speed) => {
  const [currentTime, setTime] = useState(0)

  useEffect(() => {
    const moveByOne = () => setTime(t => t + 1)
    const id = setInterval(moveByOne, speed)
    return () => clearInterval(id)
  }, [speed])

  return currentTime
}


 
export default useTime

