const createToken = () => {
  let token = ''
  const letters = 'ABCDEFGHabcdefgh12345678'
  for (let i=0; i < 512; i++) {
    const temp = Math.floor(Math.random()*letters.length)
    token += letters[temp]
  }
  return token
}

export { createToken }
