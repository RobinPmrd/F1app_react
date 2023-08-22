import React from 'react';
import { useState } from 'react';
import '../styles/App.css';
import Drivers from './Drivers/Drivers';
import Header from './Header';
import SideMenu from './SideMenu';
import Teams from './Teams/Teams';

function App() {
  const [page, setPage] = useState<string>("home");
  const [headerText, setHeaderText] = useState<string>("Welcome to the Formula 1 App")

  return (
      <div className='body'>
        <Header headerText={headerText}/>
        <main>
          <SideMenu setPage={setPage} setHeaderText={setHeaderText}/>
          {page === "Drivers" ? 
          <Drivers /> : page === "Teams" &&
          <Teams />}
        </main>
      </div>
  )
  }

export default App;
