import { useEffect, useState } from "react";

function App() {
  const [coinList, setCoinList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [CoinPrice, setCoinPrice] = useState(1);
  const [amount, setAmount] = useState("");
  const [coinSymbol, setCoinSymbol] = useState("");
  const changeCoin = (event) => {
    setCoinPrice(event.target.value);
    setCoinSymbol(event.target.selectedOptions[0].getAttribute("symbol"));
    console.log(event.target)
  };
  const changeAmount = (event) => {
    setAmount(event.target.value);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoinList(json);
        setLoading(false)
      });
      } ,[]);

  return (
    <div>
      <h1>자 드가자! {loading ? "" : `${coinList.length}개의 코인이 너를 기다려!`}</h1>
      {loading ? (
      <strong>잠시만 기다려주세요. 정보를 불러오는 중입니다.</strong>
      ) : (
        <select onChange={changeCoin}>
          <option>코인을 선택해주세요.</option>
          {coinList.map((coin, index) => (
            <option key = {index} value = {coin.quotes.USD.price} symbol = {coin.symbol}>
              {coin.name} ({coin.symbol} : {coin.quotes.USD.price} USD)
            </option>
          ))}
        </select>
      )}
      <hr />
      <div>
        <label>얼마 들어가고 싶어요? $ </label>
        <input type="number" value={amount} onChange={changeAmount} placeholder="USD 단위로 작성해주세요."></input>
      </div>
      <h2>{coinSymbol} {amount/CoinPrice} 개를 가질 수 있어요!</h2>
    </div>
  );
}

export default App;