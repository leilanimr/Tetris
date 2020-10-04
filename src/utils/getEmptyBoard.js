const getEmptyBoard = () => {
  const createArray = () => Array.from({ length: 10 }, () => "empty")
  return Array.from({ length: 24 }, createArray)
}

export default getEmptyBoard
