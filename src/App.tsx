import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Vote from './vote';
import Submit from './submit';
import Results from './results';
import Login from './login';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
