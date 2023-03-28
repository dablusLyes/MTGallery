import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import * as Scry from 'scryfall-sdk'
import './App.css'
import Card from './components/Card'

function App() {

  const [card, setCard] = useState<Scry.Card>()
  const [searchInputVal, setSearchInputVal] = useState('')
  const [searchText, setSearchText] = useState('')
  const [cardSuggestions, setCardSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(true)


  async function getCardByName(cardName?: string) {
    return await Scry.Cards.byName("black lotus")
  }

  async function getCardSuggestions() {
    const results = await Scry.Cards.autoCompleteName(searchInputVal);
    setCardSuggestions(results)
  }
  function searchFromSuggestion(cardName) {
    setSearchInputVal(cardName)
    searchForCard(cardName);
  }
  async function test() {
    const symbology = await Scry.Symbology.all();
  }
  async function searchForCard(cardName) {
    await Scry.Cards.byName(cardName).then(
      (res) => {
        setCard(res);
      }
    )
  }


  useEffect(() => {
    getCardSuggestions();
  }, [searchInputVal])

  useEffect(() => {
    if (cardSuggestions.length == 1 && cardSuggestions[0] == searchInputVal) {
      setShowSuggestions(false)
    } else {
      setShowSuggestions(true)
    }
  }, [cardSuggestions[0]])

  useEffect(() => {
    if (cardSuggestions.length == 1 && cardSuggestions[0] == searchInputVal) {
      setShowSuggestions(false)
    } else {
      setShowSuggestions(true)
    }
  }, [cardSuggestions])


  return (
    <div className="App">
      <form onSubmit={(e) => { e.preventDefault(); }} >
        <input type="text" value={searchInputVal} onChange={(e) => { setSearchInputVal(e.target.value) }} />
        <button type="submit" onClick={() => { searchForCard(searchInputVal) }}>🔍</button>
      </form>
      <div className="suggestions">
        {showSuggestions &&
          cardSuggestions.map((el, idx) => {
            return <p className="suggestion" onClick={(e) => { searchFromSuggestion(el) }} key={idx} > {el}</p>
          })}
      </div>
      <img src={card?.image_uris?.normal} alt="" />
      <Card card={card} />
    </div>
  )
}

export default App
