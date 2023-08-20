import { useEffect } from "react";
import "../styles/Drivers.css"
import "../styles/LoadingSpinner.css"
import {API_URL, compare, nationalityToFlag, showSuggestions, sort} from "../utils.js"
import { useState } from "react";
import DriverReview from "./DriverReview";
import CustomSelect from "./CustomSelect";

function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [wantedDrivers, setWantedDrivers] = useState([]);
    const [filteredDriversNames, setFilteredDriversNames] = useState([]);
    const [inputName, setInputName] = useState("");
    const [inputTitles, setInputTitles] = useState(0);
    const [inputTitlesOp, setInputTitlesOp] = useState(">=");
    const [inputWins, setInputWins] = useState(0);
    const [inputWinsOp, setInputWinsOp] = useState(">=");
    const [inputRaces, setInputRaces] = useState(0);
    const [inputRacesOp, setInputRacesOp] = useState(">=");
    const [inputNationality, setInputNationality] = useState("All");
    const [inputSortBy, setInputSortBy] = useState("surname");
    const [inputSortOrder, setInputSortOrder] = useState("asc");
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const driverNames = drivers.map(d => d.surname);

    function fetchDrivers() {
        fetch(API_URL + "/drivers")
            .then(resp => resp.json())
            .then(data => {
                setDrivers(data);
                setWantedDrivers(data);
                setIsLoading(false)
            });
    }

    useEffect(() => {
        fetchDrivers();
    }, []);

    function filterAndSortDriver(drivers) {
        let expected_drivers= inputName === "" ? drivers.filter(d => compare(d.titles,inputTitles,inputTitlesOp) && compare(d.wins,inputWins,inputWinsOp) && compare(d.grandprix,inputRaces, inputRacesOp) && (inputNationality === "All" || d.nationality === inputNationality)) : drivers.filter(d => (d.surname.toLowerCase()).includes(inputName.toLowerCase()) && compare(d.titles,inputTitles, inputTitlesOp) && compare(d.wins, inputWins, inputWinsOp) && compare(d.grandprix, inputRaces, inputRacesOp)&& (inputNationality === "All" || d.nationality === inputNationality));
        expected_drivers = expected_drivers.sort((d1,d2) => sort(d1[inputSortBy], d2[inputSortBy], inputSortBy, inputSortOrder));
        return expected_drivers;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setWantedDrivers(filterAndSortDriver(drivers));
        setIsLoading(false);
    }

    function showSuggestions(inputValue) {
        const filteredDrivers = driverNames.filter(driver => driver.toLowerCase().includes(inputValue.toLowerCase()));
        setFilteredDriversNames(filteredDrivers);
    }

    function handleClick(inputValue) {
        setInputName(inputValue);
        setIsVisible(true);
    }


    return (
        <div className="content">
            <form className="search" onSubmit={e => handleSubmit(e)}>
                <div>
                    <input type="text" name="search-name" className="search-name" placeholder="Driver.." autoComplete="off" value={inputName} onChange={e => handleClick(e.target.value)} onInput={e => showSuggestions(e.target.value)}/>
                    {isVisible && 
                    <ul id="suggestionsList" className="suggestionList" onClick={e => setInputName(e.target.textContent)}>
                        {filteredDriversNames.map((name, index) => 
                            <li key={name+index} >{name}</li>
                            )}
                    </ul>}
                </div>
                <div>
                    <label htmlFor="search-titles">N° titles</label>
                    <select name="search-titles-op" className="search-op" onChange={e => setInputTitlesOp(e.target.value)}>
                        <option value=">=">{">="}</option>
                        <option value="=">{"="}</option>
                        <option value="<=">{"<="}</option>
                    </select>
                    <input type="number" min="0" max="7" step="1" name="search-titles" className="input-number" onChange={e => setInputTitles(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="search-wins">N° wins</label>
                    <select name="search-wins-op" className="search-op" onChange={e => setInputWinsOp(e.target.value)}>
                        <option value=">=">{">="}</option>
                        <option value="=">=</option>
                        <option value="<=">{"<="}</option>
                    </select>
                    <input type="number" name="search-wins" className="input-number" onChange={e => setInputWins(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="search-races">N° races</label>
                    <select name="search-races-op" className="search-op" onChange={e => setInputRacesOp(e.target.value)}>
                        <option value=">=">{">="}</option>
                        <option value="=">=</option>
                        <option value="<=">{"<="}</option>
                    </select>
                    <input type="number" name="search-races" className="input-number" onChange={e => setInputRaces(e.target.value)}/>
                </div>
                <div className="container">
                    <label htmlFor="search-nationality">Nationality :</label>
                    <CustomSelect selectedOption={inputNationality} setSelectedOption={setInputNationality}/>
                </div>
                <button type="submit" name="search-button" className="search-button">🔎</button>
                <div className="container">
                    <label htmlFor="sort">Sort by :</label>
                    <select name="sort" className="sort-select" onChange={e => setInputSortBy(e.target.value)}>
                        <option value="surname">Name</option>
                        <option value="titles">Titles</option>
                        <option value="dob">Age</option>
                        <option value="grandprix">Races</option>
                    </select>
                    <div onChange={e => setInputSortOrder(e.target.value)}>
                        <label htmlFor="acs">Acs</label>
                        <input type="radio" id="acs" name="order" value="asc" defaultChecked/>
                        <label htmlFor="dsc">Desc</label>
                        <input type="radio" id="dsc" name="order" value="dsc"/>
                    </div>
                </div>
            </form>
            { isLoading ? (
                <div className="loading-spinner">
                    {/* Add your loading spinner component or animation here */}
                </div>
            ) :
                <section className="driver-reviews">
                    {wantedDrivers.map((driver, index) => 
                        <DriverReview key={driver.id} driver={driver}/>
                    )}
                </section>
            }
            </div>
    )
}

export default Drivers