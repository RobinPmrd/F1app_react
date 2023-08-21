import React, { FormEvent, useState } from "react";
import CustomSelect from "../Customs/CustomSelect";
import { Driver, compare, sort } from "../../utils";
import "../../styles/DriverForm.css"
import CustomInputNumber from "../Customs/CustomInputNumber";
import InputSuggestion from "../Customs/InputSuggestion";
import SortRadioButton from "../Customs/SortRadioButton";

interface IProps {
    drivers : Driver[]
    setWantedDrivers : React.Dispatch<React.SetStateAction<Driver[]>>
}

function DriverForm({drivers, setWantedDrivers} : IProps) {
    const [inputName, setInputName] = useState<string>("");
    const [inputTitles, setInputTitles] = useState<number>(0);
    const [inputTitlesOp, setInputTitlesOp] = useState<string>(">=");
    const [inputWins, setInputWins] = useState<number>(0);
    const [inputWinsOp, setInputWinsOp] = useState<string>(">=");
    const [inputRaces, setInputRaces] = useState<number>(0);
    const [inputRacesOp, setInputRacesOp] = useState<string>(">=");
    const [inputNationality, setInputNationality] = useState<string>("All");
    const [inputSortBy, setInputSortBy] = useState<string>("surname");
    const [inputSortOrder, setInputSortOrder] = useState<string>("asc");

    const driverNames = drivers.map(d => d.surname);

    function filterAndSortDriver(drivers : Driver[]) {
        let expected_drivers= inputName === "" ? drivers.filter(d => compare(d.titles,inputTitles,inputTitlesOp) && compare(d.wins,inputWins,inputWinsOp) && compare(d.grandprix,inputRaces, inputRacesOp) && (inputNationality === "All" || d.nationality === inputNationality)) : drivers.filter(d => (d.surname.toLowerCase()).includes(inputName.toLowerCase()) && compare(d.titles,inputTitles, inputTitlesOp) && compare(d.wins, inputWins, inputWinsOp) && compare(d.grandprix, inputRaces, inputRacesOp)&& (inputNationality === "All" || d.nationality === inputNationality));
        expected_drivers = expected_drivers.sort((d1,d2) => sort(d1[inputSortBy as keyof Driver], d2[inputSortBy as keyof Driver], inputSortBy, inputSortOrder));
        return expected_drivers;
    }

    function handleSubmit(event : FormEvent) {
        event.preventDefault();
        setWantedDrivers(filterAndSortDriver(drivers));
    }

    return (
        <form className="search" onSubmit={e => handleSubmit(e)}>
            <InputSuggestion defaultText="Driver.." data={driverNames} inputValue={inputName} setInputValue={setInputName} />
            <CustomInputNumber label={"N° titles"} setOp={setInputTitlesOp} setValue={setInputTitles} max={7} step={1} />
            <CustomInputNumber label={"N° wins"} setOp={setInputWinsOp} setValue={setInputWins} max={110} step={5} />
            <CustomInputNumber label={"N° races"} setOp={setInputRacesOp} setValue={setInputRaces} max={380} step={10} />
            <CustomSelect label="Nationality :" selectedNationality={inputNationality} setSelectedNationality={setInputNationality}/>
            <button type="submit" name="search-button" className="search-button">🔎</button>
            <SortRadioButton sortBy={["surname", "titles", "dob", "grandprix"]} setSortedValue={setInputSortBy} setSortOrder={setInputSortOrder} />
        </form>
    )
}

export default DriverForm