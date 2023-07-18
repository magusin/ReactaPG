function assignColor(
    text: string,
    username1: string,
    username2: string
  ) {
    const parts = text.split(
      new RegExp(`(${username1}|${username2}|\\[\\d+\\]|{[^}]+})`, 'g')
    )
    return parts.map((part) => {
      if (part === username1) {
        return { text: part, color: 'blue' }
      } else if (part === username2) {
        return { text: part, color: 'red' }
      } else if (part.startsWith('[') && part.endsWith(']')) {
        return { text: part.slice(1, -1), color: 'brown' }
      } else if (part.startsWith('{') && part.endsWith('}')) {
        return { text: part.slice(1, -1), color: 'green' }
      } else {
        return { text: part, color: 'black' }
      }
    })
  }

export default assignColor