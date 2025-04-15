import { Link } from "react-router-dom";
import AddItem from "./AddItem";
import "../stylesheets/home.css";

function myOutfitBox() {
  return (
    <div className="myOutfitBox">
      <input type="text" placeholder="Search..." className="searchBar" />
      <div className="buttonBox">
        <Link>
          <button>Add Outfit</button>
        </Link>
        <Link to="/AddItem">
          <button>Add Item</button>
        </Link>
        <Link>
          <button>Random Outfit</button>
        </Link>
      </div>
      <div className="outfitItems"></div>
    </div>
  );
}
export default myOutfitBox;
