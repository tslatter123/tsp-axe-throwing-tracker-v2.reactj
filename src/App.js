import logo from './logo.svg';
import './assets/css/App.css';

import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Link
          className="App-link"
          to="/route-test"
          rel="noopener noreferrer"
        >
          Route Test
        </Link>
      </div>
    </div>
  );
}

export default App;
