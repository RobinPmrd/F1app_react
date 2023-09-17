import React, { FormEvent, useState } from "react";
import CustomSelect from "../Customs/CustomSelect";
import { Driver, compare, nationalityToFlag, seasons, sort } from "../../utils";
import "../../styles/DriverForm.css"
import CustomInputNumber from "../Customs/CustomInputNumber";
import InputSuggestion from "../Customs/InputSuggestion";
import SortRadioButton from "../Customs/SortRadioButton";
import { useTranslation } from "react-i18next";
import Select from "../Customs/Select";

interface IProps {
    drivers : Driver[]
    setWantedDrivers : React.Dispatch<React.SetStateAction<Driver[]>>,
}

function DriverForm({drivers, setWantedDrivers} : IProps) {
    const [inputName, setInputName] = useState<string>("");
    const [inputSeason, setInputSeason] = useState<number | string>(2023);
    const [inputTitles, setInputTitles] = useState<number>(0);
    const [inputTitlesOp, setInputTitlesOp] = useState<string>(">=");
    const [inputWins, setInputWins] = useState<number>(0);
    const [inputWinsOp, setInputWinsOp] = useState<string>(">=");
    const [inputRaces, setInputRaces] = useState<number>(0);
    const [inputRacesOp, setInputRacesOp] = useState<string>(">=");
    const [inputNationality, setInputNationality] = useState<string>("All");
    const [inputSortBy, setInputSortBy] = useState<string>("surname");
    const [inputSortOrder, setInputSortOrder] = useState<string>("asc")
    const {t} = useTranslation();

    const driverNames = drivers.map(d => d.surname);

    function filterAndSortDriver(drivers : Driver[]) {
        let expected_drivers = drivers.filter(d => (inputName === "" || (d.surname.toLowerCase()).includes(inputName.toLowerCase())) &&
            (inputSeason === "All" || d.seasons?.includes(inputSeason.toString())) && (isNaN(inputTitles) || compare(d.titles,inputTitles,inputTitlesOp)) && 
            (isNaN(inputWins) || compare(d.wins,inputWins,inputWinsOp)) && (isNaN(inputRaces) || compare(d.grandprix,inputRaces, inputRacesOp)) && 
            (inputNationality === "All" || d.nationality === inputNationality));
        expected_drivers = expected_drivers.sort((d1,d2) => sort(d1[inputSortBy as keyof Driver], d2[inputSortBy as keyof Driver], inputSortBy, inputSortOrder));
        return expected_drivers;
    }

    function handleSubmit(event : FormEvent) {
        event.preventDefault();
        setWantedDrivers(filterAndSortDriver(drivers));
    }

    return (
        <form className="search" onSubmit={e => handleSubmit(e)}>
            <InputSuggestion defaultText={`${t("Driver")}..`} data={driverNames} inputValue={inputName} setInputValue={setInputName} />
            <Select label={`${t("Season")} :`} data={seasons} setSelectValue={setInputSeason} value={inputSeason.toString()} hasAll={true}/>
            <CustomInputNumber label={`N° ${t("Titles").toLowerCase()}`} setOp={setInputTitlesOp} setValue={setInputTitles} max={7} step={1} />
            <CustomInputNumber label={`N° ${t("Wins").toLowerCase()}`} setOp={setInputWinsOp} setValue={setInputWins} max={110} step={5} />
            <CustomInputNumber label={`N° ${t("Races").toLowerCase()}`} setOp={setInputRacesOp} setValue={setInputRaces} max={380} step={10} />
            <CustomSelect label={`${t("Nationality")} :`} selectedNationality={inputNationality} setSelectedNationality={setInputNationality} ToFlag={nationalityToFlag}/>
            <button type="submit" name="search-button" className="search-button">🔎</button>
            <SortRadioButton sortBy={[{surname : t("Name")}, {dob : "Age"}, {grandprix : t("Races")}, {wins : t("Wins")}, {titles : t("Titles")}]} setSortedValue={setInputSortBy} setSortOrder={setInputSortOrder} />
        </form>
    )
}

export default DriverForm