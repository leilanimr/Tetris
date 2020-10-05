import { useState, useCallback } from "react"

const useRepainter = () => {
  const setX = useState(0)[1]
  return useCallback(() => setX(x => x + 1), [setX])
}

export default useRepainter
