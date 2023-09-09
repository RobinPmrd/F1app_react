import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/App.css';
import Drivers from './Drivers/Drivers';
import Header from './Header';
import SideMenu from './SideMenu';
import Teams from './Teams/Teams';
import Races from './Races/Races';
import Standings from './Standings/Standings';
import { useTranslation } from 'react-i18next';

function App() {
  const {t} = useTranslation();
  
  const [page, setPage] = useState<string>("Home");
  const [headerText, setHeaderText] = useState<string>(t("initialHeaderText"));
  const [updateHeaderText, setUpdateHeaderText] = useState<boolean>(false);

  useEffect(() => {
    if (updateHeaderText) setHeaderText(t(page)) // On DriverSeason and RaceInfo, the headerText must not be updated here by the page value
    if (!updateHeaderText && page === "Home") setHeaderText(t("initialHeaderText"));
  }, [page, t, updateHeaderText])

  function handleSideMenuOnClick(value: string) {
    setPage(value);
    if (value !== page) setUpdateHeaderText(true);
} 

  return (
      <div className='body'>
        <Header headerText={headerText}/>
        <main>
          <SideMenu onClick={(e) => handleSideMenuOnClick(e!)}/>
          {page === "Drivers" ? 
          <Drivers /> : page === "Teams" ?
          <Teams /> : page === "Races" ?
          <Races  setHeaderText={setHeaderText} setUpdateHeaderText={setUpdateHeaderText}/> : page === "Standings" &&
          <Standings setHeaderText={setHeaderText} setUpdateHeaderText={setUpdateHeaderText}/>}
        </main>
      </div>
  )
  }

export default App;
