import { useState } from 'react';
import '../styles/App.css';
import Drivers from './Drivers';
import Header from './Header';
import SideMenu from './SideMenu';

function App() {
  const [page, setPage] = useState("home");
  return (
      <div className='body'>
        <Header />
        <main>
          <SideMenu setPage={setPage}/>
          {page === "Drivers" && <Drivers />}
        </main>
      </div>
  )
  }

export default App;
