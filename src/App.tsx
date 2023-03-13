import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import * as Scry from 'scryfall-sdk'
import './App.css'
import Card from './components/Card'

function App() {

  const [card, setCard] = useState<Scry.Card>()


  async function getCardByName(cardName?: string) {
    return await Scry.Cards.byName("negate")
  }




  useEffect(() => {
    getCardByName()

  }, [])
  return (
    <div className="App">
      <img src={card?.image_uris?.normal} alt="" />
      <Card card={card} />
    </div>
  )
}

export default App
