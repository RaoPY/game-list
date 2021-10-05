import React, {useState, useEffect} from "react";
import Card from "./Card";
import "./App.css";

function App() {
  const [gamesList, setGamesList] = useState([]);
  const firstPageUrl = "https://api.rawg.io/api/games?key=c30917dfd94e449aaad881ce64d72158";
  const [currentPageUrl, setCurrentPageUrl] = useState(firstPageUrl);
  const [previousPageUrl, setPreviousPageUrl] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [pageNum, setPageNum] = useState("1");

  useEffect(() => {
    fetch(currentPageUrl)
      .then((res) => res.json())
      .then((data) => {
        setGamesList([]);
        setGamesList(data.results);
        setPreviousPageUrl(data.previous);
        setNextPageUrl(data.next);
        if (currentPageUrl === firstPageUrl) {
          setPageNum("1");
        } else {
          setPageNum(currentPageUrl.at(-1));
        }
      });
  }, [currentPageUrl]);

  return (
    <React.Fragment>
      <h1 id="heading" onClick={() => setCurrentPageUrl(firstPageUrl)}><span id="gameText">Game</span>List</h1>
      <input type="button" value="<" onClick={() => {if (previousPageUrl != null) setCurrentPageUrl(previousPageUrl)}} />
      <span id="pageNum">{pageNum}</span>
      <input type="button" value=">" onClick={() => {if (nextPageUrl != null) setCurrentPageUrl(nextPageUrl)}} />
      <br />
      {gamesList.map((game) => {
        return (
          <Card game={game} key={game.id} />
        );
      })}
      <p onClick={() => window.scrollTo({top: 0, behavior: "smooth"})} id="backToTop">Back to top</p>
    </React.Fragment>
  );
}

export default App;