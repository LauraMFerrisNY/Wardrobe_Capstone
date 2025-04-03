import SearchBar from './elements/searchBar.jsx';
import mainContent from './elements/mainContent.jsx';
import './stylesheets/Home.css';

function Home() {
    return (
        <div>
            <section className="home">
                <h2>Home</h2>
                <p>Try finding Something New!</p>
                <div className="searchBarContainer">
                    {SearchBar({ items: [] })}
                </div>
            </section>
            <section className="content">
                {mainContent()}
            </section>
        </div>
    )
}

export default Home
// Returns dashboard page