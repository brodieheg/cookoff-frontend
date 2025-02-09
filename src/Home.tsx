import chili from './assets/download (1).jpeg';
import React from 'react';
import { useNavigate } from "react-router-dom";
import './App.css'


function Home() {
  const navigate = useNavigate();
  const routeChange = (event: React.MouseEvent<HTMLButtonElement>) =>{ 
    const clickedElement = event.target as HTMLButtonElement;
    const elementId = clickedElement.id;
    navigate(elementId);
  }
  return (
    <>
     <img src={chili}></img>
     <br></br>
     <button onClick = {routeChange} id = "vote" style={{marginBottom: '5px'}}>
      Vote
     </button><br></br>
     <button id = "entry" style={{marginBottom: '5px'}}>
      Submit an Entry
     </button><br></br>
     <button id = "results" style={{marginBottom: '5px'}}>
      Get Results
     </button><br></br>
    </>
  )
}

export default Home
