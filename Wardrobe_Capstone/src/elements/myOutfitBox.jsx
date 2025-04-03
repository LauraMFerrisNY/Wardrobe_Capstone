import '../stylesheets/myOutfitBox.css';

function myOutfitBox() {
  return (
    <div className="myOutfitBox">
        <section classname="myOutfitBoxHeader">
            <input type="text" placeholder="Search..." className="searchBar" />
            <button className="addOutfitButton">Add Outfit</button>
            <button className="addItemButton">Add Item</button>
            <button className="addItemButton">Random Outfit</button>
        </section>
            <div className="outfitItems"></div>
    </div>
  );
}
export default myOutfitBox;