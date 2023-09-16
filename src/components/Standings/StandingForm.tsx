import React from "react";
import { Race, getTranslatedRaceName } from "../../utils";
import Select from "../Customs/Select";
import { useTranslation } from "react-i18next";

interface IProps {
    selectedRace: Race | undefined,
    setSelectedRace: React.Dispatch<React.SetStateAction<Race | undefined>>,
    selectedSeason: number,
    setSelectedSeason: React.Dispatch<React.SetStateAction<number>>,
    seasonRaces: Race[]
}

function StandingForm({setSelectedRace, setSelectedSeason, selectedRace, selectedSeason, seasonRaces}: IProps) {
    const {t} = useTranslation();
    
    let seasons: number[] = [];
    for (let index = 2023; index >= 1950; index--) {
        seasons.push(index);
    }

    return (
        <div className="search">
            <Select label={`${t("Season")} :`} data={seasons} setSelectValue={setSelectedSeason} value={selectedSeason.toString()} hasAll={false}/>
            <Select label={`${t("After")} :`} data={seasonRaces.map(race => getTranslatedRaceName(race, t))} setSelectValue={setSelectedRace} value={selectedRace} hasAll={true} objectData={seasonRaces}/>
        </div>
    )
}
export default StandingForm