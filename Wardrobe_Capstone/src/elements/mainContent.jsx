import "../stylesheets/mainContent.css";
import myOutfitBox from "./myOutfitBox";
import mainPageBox from "./mainPageBox";
import "../stylesheets/myOutfitBox.css";

function mainContent() {
  return (
    <div className="main-content">
      <section className="leftBox">
        {myOutfitBox()}
      </section>
      <section className="rightBox">
        {mainPageBox()}
      </section>
    </div>
  );
}
export default mainContent;