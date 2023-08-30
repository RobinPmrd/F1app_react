import React, { FormEvent, useEffect, useState } from "react";
import CustomInputNumber from "../Customs/CustomInputNumber";
import Select from "../Customs/Select";
import { API_URL, Circuit, Driver, Race, countryToFlag, sort } from "../../utils";
import CustomSelect from "../Customs/CustomSelect";
import InputSuggestion from "../Customs/InputSuggestion";
import SortRadioButton from "../Customs/SortRadioButton";

interface IProps {
    races: Race[],
    wantedRaces: Race[],
    setWantedRaces: React.Dispatch<React.SetStateAction<Race[]>>
}

function RacesForm({races, wantedRaces, setWantedRaces}: IProps) {
    const [circuits, setCircuits] = useState<Circuit[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [season, setSeason] = useState<number>(2023);
    const [selectedcircuit, setSelectedCircuit] = useState<string>("All");
    const [country, setCountry] = useState<string>("All");
    const [winner, setWinner] = useState<string>("");
    const [sortValue, setSortValue] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("acs");

    useEffect(() => {
        fetch(API_URL + "/circuits")
        .then(resp => resp.json())
        .then(circuits => setCircuits(circuits))
        fetch(API_URL + "/drivers")
        .then(resp => resp.json())
        .then(drivers => setDrivers(drivers));
        initializeForm();
    }, [])

    const circuitNames = circuits.map(c => c.name);
    const driverNames = drivers.map(d => d.forename + " " + d.surname);

    function filterAndSortraces(races : Race[]) {
        let expectedRaces = races.filter(r => (r.year === season || Number.isNaN(season)) && (selectedcircuit === "All" || r.circuit.name === selectedcircuit) && (country === "All" || r.circuit.country === country) && (winner === "" || (r.winner != null && r.winner.toLowerCase().includes(winner.toLowerCase()))));
        expectedRaces = expectedRaces.sort((r1,r2) => sort(r1[sortValue as keyof Race], r2[sortValue as keyof Race], sortValue, sortOrder));
        return expectedRaces;
    }

    function initializeForm() {
        if (localStorage.getItem("season")) {
            setSeason(parseInt(localStorage.getItem("season")!));
            setSelectedCircuit(localStorage.getItem("circuit")!);
            setCountry(localStorage.getItem("country")!);
            setWinner(localStorage.getItem("winner")!);
            localStorage.clear();
        }
    }

    function handleSubmit(event : FormEvent) {
        event.preventDefault();
        localStorage.setItem("season", season.toString());
        localStorage.setItem("circuit", selectedcircuit);
        localStorage.setItem("country", country);
        localStorage.setItem("winner", winner);
        setWantedRaces(filterAndSortraces(races));
    }

    return (
        <form className="search" onSubmit={e => handleSubmit(e)}>
            <CustomInputNumber label="Season" value={season ? season : -1} setValue={setSeason} min={1950} max={2023} />
            <Select label="Circuit :" value={selectedcircuit} data={circuitNames} setSelectValue={setSelectedCircuit} hasAll={true}/>
            <CustomSelect label="Country :" selectedNationality={country} setSelectedNationality={setCountry} ToFlag={countryToFlag}/>
            <InputSuggestion data={driverNames} defaultText="Winner.." inputValue={winner} setInputValue={setWinner} />
            <button type="submit" name="search-button" className="search-button">🔎</button>
            <SortRadioButton sortBy={[{year : "Season"}, {round : "Round"}, {country : "Country"}]} setSortOrder={setSortOrder} setSortedValue={setSortValue} />
      </form>
    )
}

export default RacesForm