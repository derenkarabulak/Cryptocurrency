import React, {useEffect, useState} from "react";
import axios from 'axios';
import './App.css';
import './index.css';
import Coin from './Coin';
import {FaAngleUp} from 'react-icons/fa';

function App() {
  const [coins, setCoins] = useState([]);
  const [search,setSearch] = useState('');
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
      setCoins(res.data)
      console.log(res.data)
    }).catch(error=>console.log(error))
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior:'smooth',
    });
  };

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

    return(
      <div className="coin-app">
        <div className="coin-search">
          <form action="">
            <input type="text" className="coin-input" placeholder="Provide the coin name" onChange={handleChange}/>
          </form>
        </div>

        {filteredCoins.map(coin => {
          return(
            <div>
              <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              pricechange={coin.price_change_percentage_24h}
              />
              <div className="top-to-btm">
                <FaAngleUp onClick={goToTop} className="icon-position icon-style"/>
              </div>
              </div>
            )
          })}
        </div>
      )
  }

export default App;