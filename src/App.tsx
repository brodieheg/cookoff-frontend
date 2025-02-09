import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Vote from './vote';
import Submit from './submit';
import Results from './results';
import chili from './assets/download (1).jpeg';

function Home() {
  return (
    <>
      <img src={chili} alt="Chili" />
      <br />
      <Link to="/vote"><button style={{ marginBottom: '5px' }}>Vote</button></Link><br />
      <Link to="/submit"><button style={{ marginBottom: '5px' }}>Submit an Entry</button></Link><br />
      <Link to="/results"><button style={{ marginBottom: '5px' }}>Get Results</button></Link><br />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;