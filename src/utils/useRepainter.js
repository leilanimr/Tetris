import { useState } from "react"

const useRepainter = () => {
  const [x, setX] = useState(0)
  return () => setX(x => x + 1)
}

export default useRepainter
