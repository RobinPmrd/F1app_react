import React from "react";
import { Race } from "../../utils";
import Select from "../Customs/Select";

interface IProps {
    selectedRace: Race | undefined,
    setSelectedRace: React.Dispatch<React.SetStateAction<Race | undefined>>,
    selectedSeason: number,
    setSelectedSeason: React.Dispatch<React.SetStateAction<number>>,
    seasonRaces: Race[]
}

function StandingForm({setSelectedRace, setSelectedSeason, selectedRace, selectedSeason, seasonRaces}: IProps) {
    let seasons: number[] = [];
    for (let index = 2023; index >= 1950; index--) {
        seasons.push(index);
    }

    return (
        <div className="search">
            <Select label="Season :" data={seasons} setSelectValue={setSelectedSeason} value={selectedSeason.toString()} hasAll={false}/>
            <Select label="After :" data={seasonRaces.map(race => race.name)} setSelectValue={setSelectedRace} value={selectedRace} hasAll={true} objectData={seasonRaces}/>
        </div>
    )
}
export default StandingForm