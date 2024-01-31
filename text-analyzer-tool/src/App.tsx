import './App.scss'
import { useState } from 'react'
import BottomResultBox from './components/BottomResultBox'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ResultBox from './components/ResultBox'
import TextArea from './components/TextArea'

const App = () => {
  const [text, setText] = useState('')
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className="small-container">
        <div className="main-app">
          <ResultBox text={text} />
          <TextArea handleChange={handleChange} />
          <BottomResultBox text={text} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
