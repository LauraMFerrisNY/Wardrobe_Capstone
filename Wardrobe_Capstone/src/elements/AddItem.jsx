import { useState } from "react";

const addItem = () => {
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemTags, setItemTags] = useState("");
    const [privateToggle, setPrivateToggle] = useState(false);

  return (
    <div className="addItem">
      <h2>Add Item</h2>
      <form>
        <label>Item Name</label>
        <input 
            type="text" 
            placeholder="Enter item name" 
            required 
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
        />
{/* IMG needs to be a variable, need to turn the imput into a variable, then make that into the IMG URL */}
        {/* <label>Item Image</label>
        <input type="image" src="submit.gif" alt="Item Image" width={100} height={100}/> */}

        <label>Description</label>
        <textarea 
            placeholder="Enter item description" 
            required
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
        />
        {/* Change to select input type if pre determined tags */}
        <label>Tags</label>
        <input 
            type="text" 
            placeholder="Enter a tag. (I.E., Flowy, Crewneck, etc.)" 
            required 
            value={itemTags}
            onChange={(e) => setItemTags(e.target.value)}
            />
        <label>Private</label>
        <input 
            type="checkbox" 
            name="private" 
            value={privateToggle}
            onChange={(e) => setPrivateToggle(e.target.checked)}
            />
            <span>Private?</span>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};
export default addItem;
