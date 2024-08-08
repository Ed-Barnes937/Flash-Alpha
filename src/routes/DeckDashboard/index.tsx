import Deck from '@routes/Deck'
import Games from './Games'
import Header from './Header'
import Metrics from './Metrics'

const Home = () => {
  return (
    <div className="flex flex-col gap-2">
      <Header />
      <div className="flex flex-col gap-4">
        <Metrics />
        <Games />
        <Deck />
      </div>
    </div>
  )
}

export default Home
