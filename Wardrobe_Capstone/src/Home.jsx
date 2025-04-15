import SearchBar from "./elements/searchBar.jsx";
import myOutfitBox from "./elements/myOutfitBox";
import mainPageBox from "./elements/mainPageBox";
import "./stylesheets/Home.css";

function Home() {
  return (
    <div className="home">
      <section className="leftBox">{myOutfitBox()}</section>
      <section className="rightBox">
        <h2>Home</h2>
        <p>Try finding Something New!</p>
        <div className="searchBarContainer">{SearchBar({ items: [] })}</div>
        {mainPageBox()}
      </section>
    </div>
  );
}

export default Home;
// Returns dashboard page
