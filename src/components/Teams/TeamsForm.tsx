import React, { FormEvent, useState } from "react";
import CustomSelect from "../Customs/CustomSelect";
import { Team, compare, nationalityToFlag, seasons, sort } from "../../utils";
import CustomInputNumber from "../Customs/CustomInputNumber";
import InputSuggestion from "../Customs/InputSuggestion";
import SortRadioButton from "../Customs/SortRadioButton";
import { useTranslation } from "react-i18next";
import Select from "../Customs/Select";

interface IProps {
    teams : Team[]
    setWantedTeams : React.Dispatch<React.SetStateAction<Team[]>>
}

function TeamsForm({teams, setWantedTeams} : IProps) {
    const [inputName, setInputName] = useState<string>("");
    const [inputSeason, setInputSeason] = useState<number | string>(2023);
    const [inputTitles, setInputTitles] = useState<number>(0);
    const [inputTitlesOp, setInputTitlesOp] = useState<string>(">=");
    const [inputWins, setInputWins] = useState<number>(0);
    const [inputWinsOp, setInputWinsOp] = useState<string>(">=");
    const [inputRaces, setInputRaces] = useState<number>(0);
    const [inputRacesOp, setInputRacesOp] = useState<string>(">=");
    const [inputNationality, setInputNationality] = useState<string>("All");
    const [inputSortBy, setInputSortBy] = useState<string>("name");
    const [inputSortOrder, setInputSortOrder] = useState<string>("asc");
    const {t} = useTranslation();

    const teamNames = teams.map(t => t.name);

    function filterAndSortTeam(teams : Team[]) {
        let expectedTeams= teams.filter(t => (inputName === "" || t.name.toLowerCase().includes(inputName.toLowerCase())) && (inputSeason === "All" || t.seasons?.includes(parseInt(inputSeason as string))) &&
            (isNaN(inputTitles) || compare(t.titles,inputTitles,inputTitlesOp)) && ( isNaN(inputWins) || compare(t.wins,inputWins,inputWinsOp)) && 
            (isNaN(inputRaces) || compare(t.races,inputRaces, inputRacesOp)) && (inputNationality === "All" || t.nationality === inputNationality));
        expectedTeams = expectedTeams.sort((t1,t2) => sort(t1[inputSortBy as keyof Team], t2[inputSortBy as keyof Team], inputSortBy, inputSortOrder));
        return expectedTeams;
    }

    function handleSubmit(event : FormEvent) {
        event.preventDefault();
        setWantedTeams(filterAndSortTeam(teams));
    }

    return (
        <form className="search" onSubmit={e => handleSubmit(e)}>
            <InputSuggestion defaultText={`${t("Team")}..`} data={teamNames} inputValue={inputName} setInputValue={setInputName} />
            <Select label={`${t("Season")} :`} data={seasons} setSelectValue={setInputSeason} value={inputSeason.toString()} hasAll={true}/>
            <CustomInputNumber label={`N° ${t("Titles").toLowerCase()}`} setOp={setInputTitlesOp} setValue={setInputTitles} max={7} step={1} />
            <CustomInputNumber label={`N° ${t("Wins").toLowerCase()}`} setOp={setInputWinsOp} setValue={setInputWins} max={110} step={5} />
            <CustomInputNumber label={`N° ${t("Races").toLowerCase()}`} setOp={setInputRacesOp} setValue={setInputRaces} max={380} step={10} />
            <CustomSelect label={`${t("Nationality")} :`} selectedNationality={inputNationality} setSelectedNationality={setInputNationality} ToFlag={nationalityToFlag}/>
            <button type="submit" name="search-button" className="search-button">🔎</button>
            <SortRadioButton sortBy={[{name : t("Name")}, {races : t("Races")}, {wins : t("Wins")}, {titles : t("Titles")}]} setSortedValue={setInputSortBy} setSortOrder={setInputSortOrder} />
        </form>
    )
}

export default TeamsForm