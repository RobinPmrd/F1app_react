import React from 'react';
import { useState } from 'react';
import '../styles/App.css';
import Drivers from './Drivers/Drivers';
import Header from './Header';
import SideMenu from './SideMenu';
import Teams from './Teams/Teams';
import Races from './Races/Races';
import Standings from './Standings/Standings';

function App() {
  const [page, setPage] = useState<string>("home");
  const [headerText, setHeaderText] = useState<string>("Welcome to the Formula 1 App")

  return (
      <div className='body'>
        <Header headerText={headerText}/>
        <main>
          <SideMenu setPage={setPage} setHeaderText={setHeaderText}/>
          {page === "Drivers" ? 
          <Drivers /> : page === "Teams" ?
          <Teams /> : page === "Races" ?
          <Races setHeaderText={setHeaderText}/> : page === "Standings" &&
          <Standings setHeaderText={setHeaderText}/>}
        </main>
      </div>
  )
  }

export default App;
