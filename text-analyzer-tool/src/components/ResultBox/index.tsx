import './index.scss'
import { pronouns } from '../../data/pronouns'

const ResultBox = ({ text }: { text: String }) => {
  const resultBar = [
    {
      title: 'Words',
      value: 0,
    },
    {
      title: 'Characters',
      value: 0,
    },
    {
      title: 'Sentences',
      value: 0,
    },
    {
      title: 'Paragraphs ',
      value: 0,
    },
    {
      title: 'Pronouns',
      value: 0,
    },
  ]

  const analyze = (text: String) => {
    const words = text.split(/[\n\s,.]+/).filter((word) => word !== '')
    const characters = text.split('')
    const sentences = text.split(/[\n.]+/).filter((sentence) => sentence !== '')
    const paragraphs = text.split('\n').filter((paragraph) => paragraph !== '')
    const pronounsCount = text
      .split(/[\n\s,.!?]+/)
      .filter((word) => pronouns.includes(word.toLowerCase()))

    resultBar[0].value = words.length
    resultBar[1].value = characters.length
    resultBar[2].value = sentences.length
    resultBar[3].value = paragraphs.length
    resultBar[4].value = pronounsCount.length
  }

  analyze(text)

  return (
    <div className="result-bar">
      {resultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default ResultBox
