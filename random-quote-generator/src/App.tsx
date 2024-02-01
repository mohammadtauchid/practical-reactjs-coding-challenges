import { useState } from "react"
import { ReactComponent as Button } from "../src/assets/icons/button.svg"
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg"
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg"
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg"
import axios from "axios"
import "./App.css"

function App() {
  const [index, setIndex] = useState<number>(0)
  const [quotes, setQuotes] = useState<Array<{quote: string, author: string}>>([])

  window.onload = function () {
    axios.get("http://localhost:4000/quotes")
      .then((response) => {
        setQuotes(response.data.sort(() => Math.random() - 0.5))
      })
  }

  const encodeString = () => {
    return encodeURIComponent(
      quotes[index].quote +
      "\n" +
      "- " +
      quotes[index].author
    )
  }

  return (
    <>  
      <header>
        <div className="top-strip" />
      </header>
      <div className="container">
        <div className="quotation-box">
          <Quotation />
          {
            quotes.length > 0 && (
              <div className="quote">
                <p>{quotes[index].quote}</p>
                <span>- {quotes[index].author}</span>
              </div>
            )
          }
          <div className="bottom-navigation">
            <div>
              <Button 
                className={`rotate cp ${index === 0 ? "disabled-button" : ""}`} 
                onClick={() => setIndex(index - 1)} 
              />
              <Button 
                className={`cp ${index === quotes.length - 1 ? "disabled-button" : ""}`} 
                onClick={() => setIndex(index + 1)}
              />
            </div>
            <div className="share">
              <span>Share At:</span>
              <Twitter 
                title="Post this quote on twitter!" 
                className="cp" 
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeString()}`)}
              />
              <Whatsapp 
                title="Post this quote on WhatsApp!" 
                className="cp" 
                onClick={() => window.open(`https://wa.me/?text=${encodeString()}`)} 
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-strip" />
    </>
  )
}

export default App
