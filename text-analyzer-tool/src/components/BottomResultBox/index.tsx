import './index.scss'

const BottomResultBox = ({ text }: { text: String }) => {
  const bottomResultBar = [
    {
      title: 'Average Reading Time:',
      value: '-',
    },
    {
      title: 'Longest word:',
      value: '-',
    },
  ]

  const longestWord = () => {
    const words = text.split(' ')
    let longest = words[0]
    words.forEach((word) => {
      if (word.length > longest.length) {
        longest = word
      }
    })
    return longest
  }

  const averageReadingTime = () => {
    const words = text.split(' ')
    const readingTime = Math.ceil(words.length / 225)
    return readingTime
  }

  if (text.length > 0) {
    bottomResultBar[0].value = `~${averageReadingTime()} minutes`
    bottomResultBar[1].value = longestWord()
  }

  return (
    <div className="bottom-result-bar">
      {bottomResultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomResultBox
