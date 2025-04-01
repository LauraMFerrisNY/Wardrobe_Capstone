import "../stylesheets/mainContent.css";
import myOutfitBox from "./myOutfitBox";

function mainContent() {
  return (
    <div className="main-content">
      <section className="leftBox">
        {myOutfitBox()}
      </section>
      <section className="rightBox"/>
    </div>
  );
}
export default mainContent;