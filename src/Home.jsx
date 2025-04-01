import SearchBar from './elements/searchBar.jsx';
import mainContent from './elements/mainContent.jsx';
import './stylesheets/Home.css';

function Home() {
    return (
        <div>
            <section className="home">
                <h2>Home</h2>
                <p>Welcome to the Home page!</p>
                {SearchBar({ items: [] })}
            </section>
            <section className="content">
                {mainContent()}
            </section>
        </div>
        
    )
}

export default Home
// Returns dashboard page