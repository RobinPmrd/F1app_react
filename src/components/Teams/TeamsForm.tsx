import React, { FormEvent, useState } from "react";
import CustomSelect from "../Customs/CustomSelect";
import { Team, compare, nationalityToFlag, sort } from "../../utils";
import "../../styles/DriverForm.css"
import CustomInputNumber from "../Customs/CustomInputNumber";
import InputSuggestion from "../Customs/InputSuggestion";
import SortRadioButton from "../Customs/SortRadioButton";

interface IProps {
    teams : Team[]
    setWantedTeams : React.Dispatch<React.SetStateAction<Team[]>>
}

function TeamsForm({teams, setWantedTeams} : IProps) {
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

    const teamNames = teams.map(t => t.name);

    function filterAndSortTeam(teams : Team[]) {
        let expectedTeams= inputName === "" ? teams.filter(t => compare(t.titles,inputTitles,inputTitlesOp) && compare(t.wins,inputWins,inputWinsOp) && compare(t.races,inputRaces, inputRacesOp) && (inputNationality === "All" || t.nationality === inputNationality)) : teams.filter(t => (t.name.toLowerCase()).includes(inputName.toLowerCase()) && compare(t.titles,inputTitles, inputTitlesOp) && compare(t.wins, inputWins, inputWinsOp) && compare(t.races, inputRaces, inputRacesOp)&& (inputNationality === "All" || t.nationality === inputNationality));
        expectedTeams = expectedTeams.sort((t1,t2) => sort(t1[inputSortBy as keyof Team], t2[inputSortBy as keyof Team], inputSortBy, inputSortOrder));
        return expectedTeams;
    }

    function handleSubmit(event : FormEvent) {
        event.preventDefault();
        setWantedTeams(filterAndSortTeam(teams));
    }

    return (
        <form className="search" onSubmit={e => handleSubmit(e)}>
            <InputSuggestion defaultText="Driver.." data={teamNames} inputValue={inputName} setInputValue={setInputName} />
            <CustomInputNumber label={"N° titles"} setOp={setInputTitlesOp} setValue={setInputTitles} max={7} step={1} />
            <CustomInputNumber label={"N° wins"} setOp={setInputWinsOp} setValue={setInputWins} max={110} step={5} />
            <CustomInputNumber label={"N° races"} setOp={setInputRacesOp} setValue={setInputRaces} max={380} step={10} />
            <CustomSelect label="Nationality :" selectedNationality={inputNationality} setSelectedNationality={setInputNationality} ToFlag={nationalityToFlag}/>
            <button type="submit" name="search-button" className="search-button">🔎</button>
            <SortRadioButton sortBy={[{name : "Name"}, {races : "Races"}, {wins : "Wins"}, {titles : "Titles"}]} setSortedValue={setInputSortBy} setSortOrder={setInputSortOrder} />
        </form>
    )
}

export default TeamsForm