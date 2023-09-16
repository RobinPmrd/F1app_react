import React, { useEffect, useState } from "react"
import { API_URL, Driver, Race, Result, Team, TeamResult, TeamStanding, nationalityToFlag } from "../../utils"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

  import { Line } from 'react-chartjs-2';
import Select2 from "../Customs/Select2";
import { useTranslation } from "react-i18next";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

interface IProps {
    team: Team,
    teamDrivers: Driver[],
    otherTeamNames: Team[],
    season: number,
    seasonRaces: Race[],
    setShowTeamSeason: React.Dispatch<React.SetStateAction<boolean>>,
    setHeaderText: React.Dispatch<React.SetStateAction<string>>,
    setUpdateHeadertext: React.Dispatch<React.SetStateAction<boolean>>,
    fromPage: string
}

function TeamSeason({team, teamDrivers, otherTeamNames, season, seasonRaces, setShowTeamSeason, setHeaderText, setUpdateHeadertext, fromPage}: IProps) {
    const[image, setImage] = useState<any>();
    const[graphData, setGraphData] = useState<string>("pointsPerRaces");
    const[teamsResults, setTeamsResults] = useState<TeamResult[][]>([]);
    const[teamsStandings, setTeamsStandings] = useState<TeamStanding[][]>([]);
    const[teamsDriverResults, setTeamsDriverResults] = useState<Result[][]>([]);

    const {t} = useTranslation();

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: getGraphTitle(graphData),
          },
        },
        scales: {
          y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            reverse: graphData !== "points" && graphData !== "pointsPerRaces",
            min: graphData !== "points" && graphData !== "pointsPerRaces" ? 1 : 0,
            max: graphData === "points" ? undefined : graphData === "pointsPerRaces" ? (season >= 2021 ? 60 : season >= 2010 ? 45 : 20) : graphData === "standing" ? otherTeamNames.length + 1 : 24,
            title: {
                display: true,
                text: graphData !== "points" ? "Position" : "Points"
            }
          },
          x: {
            title: {
                display: true,
                text: "Round"
            },
          }
        }
    }

    function getGraphTitle(graphData: string): string {
      return graphData !== "points" && graphData !== "standing" ? t("GraphTitle1", {graphData: t(graphData.charAt(0).toUpperCase()+graphData.slice(1)).toLowerCase()})  : graphData === "points" ? t("GraphTitle2") : t("GraphTitle3") 
    }
      
  const data = {
      labels: seasonRaces.map(r => r.round),
      datasets: teamsResults.map((teamResult, index) => {
        return {label: teamResult[0].constructor.name,
        data: getData(teamResult, teamsStandings[index]),
        borderColor: getDriverColor(teamResult[0].constructor.name),
        backgroundColor: getDriverColor(teamResult[0].constructor.name)}
      })
  };

    useEffect(() => {
      setUpdateHeadertext(false);
      setHeaderText(t("HeaderTextDriverSeason", {season: season}));
    }, [setHeaderText, season, t, setUpdateHeadertext])

    useEffect(() => {
        fetch(API_URL+"/results/constructor/"+team.id+"/"+season)
            .then(resp => resp.json())
            .then(results => setTeamsResults([results]));
        fetch(API_URL + "/standings/constructors/id/"+team.id+"/"+seasonRaces.map(r => r.id))
          .then(resp => resp.json())
          .then(ds => {
            ds.sort((ds1: any, ds2:any) => seasonRaces.find(r => r.id === ds1.raceId)!.round - seasonRaces.find(r => r.id === ds2.raceId)!.round);
            setTeamsStandings([ds])})
    }, [team, season, seasonRaces])

    useEffect(() => {
      const teamDriverResultsPromises = teamDrivers.map(async (d) => {
        const resp = await fetch(API_URL + "/results/" + d.id + "/" + season);
        const results = await resp.json();
        return results;
      });
      // Wait for all promises to resolve
      Promise.all(teamDriverResultsPromises)
        .then((resultsArray) =>setTeamsDriverResults(resultsArray));
  }, [season, teamDrivers])

    useEffect(() => {
      function fetchImage() {
        let image;
        try {
            image = require(`../../images/teams/${teamsResults[0][0].constructor.constructorRef}.png`);
        } catch (error) {
            image = require("../../images/drivers/unknown.jpg");
        }
        return image
    }
      const image = fetchImage();
      setImage(image);
      
    }, [teamsResults]);

    function getData(results: TeamResult[], driverStandings: TeamStanding[]): (number | null)[] {
      
      const newResults: TeamResult[] = fillData(results);
      const newDriverResults: TeamStanding[] = fillData(driverStandings);
      
      if (graphData === "pointsPerRaces") return newResults.map(ts => ts.points !== -1 ? ts.points : null);
      else if (graphData === "points") return newDriverResults.map(ts => ts.points !== -1 ? ts.points : null);
      return newDriverResults.map(ts => ts.position !== -1 ? ts.position : null);
    }

    function fillData(data: TeamResult[] | TeamStanding[]): any {
      if (data !== undefined) {
        var newResults: (TeamResult | TeamStanding)[] = [...data];
        if (data.length !== 0 && data.length !== seasonRaces.length) {
          var emptyResult: TeamResult | TeamStanding;
          if ("status" in data[0]) emptyResult = {
            constructor: {
                constructorRef: "",
                id: 0,
                name: "",
                nationality: "",
                url: "",
                titles: 0,
                races: 0,
                wins: 0
                },
            raceId: 0,
            constructorResultsId:0,
            points: 0,
            status: ""
          }
          else emptyResult = {
            constructorId: 0,
            constructorStandingsId:0,
            points: 0,
            position: 0,
            positionText: "",
            raceId: 0,
            wins: 0

            }
              const firstResult: TeamResult | TeamStanding = data[0]
              for (let index = 0; index < seasonRaces.length; index++) {
              if (seasonRaces[index].id < firstResult.raceId) newResults.unshift(emptyResult);
              }
        }
      }
      else newResults = []
      return newResults;
  }

    // Create a function to get the computed color value
    function getDriverColor(teamName: string) {
      const computedStyle = getComputedStyle(document.documentElement);
      return computedStyle.getPropertyValue(`--${teamName.replaceAll(" ", "")}-color`);
    }

    function handleOnClick() {
      setUpdateHeadertext(true);
      setShowTeamSeason(false); 
      setHeaderText(t(fromPage));
    }

    async function handleOnChangeSelect(newTeam:  Team) {
      await fetch(API_URL+"/results/constructor/"+newTeam.id+"/"+season)
        .then(resp => resp.json())
        .then(re => setTeamsResults([...teamsResults, re]))
      await fetch(API_URL + "/standings/constructors/id/"+newTeam.id+"/"+seasonRaces.map(r => r.id))
        .then(resp => resp.json())
        .then(ds => setTeamsStandings([...teamsStandings, ds]))
    }


    function handleUnselect(value: Team) {
      let dtcr = [...teamsResults];
      dtcr.splice(dtcr.findIndex(re => re[0].constructor.id === value.id),1);
      setTeamsResults([...dtcr]);
      let dtcs = [...teamsStandings];
      dtcs.splice(dtcs.findIndex(ts => ts[0].constructorId === value.id),1);
      setTeamsStandings([...dtcs]);
    }

    function getPodiums() {
      const driver1Podiums = teamsDriverResults[0].filter(re => re.positionOrder <= 3).map(re => re.raceId);
      const driver2Podiums = teamsDriverResults[1].filter(re => re.positionOrder <= 3).map(re => re.raceId);
      const podiums = new Set(driver1Podiums.concat(driver2Podiums));
      return podiums.size;
    }

    if (teamsResults[0] === undefined || teamsStandings[0] === undefined ||teamsDriverResults[1] === undefined) return (
        <div className="loading-spinner"></div>
    )

    return (
        <div className="content">
            <div className="button-container">
                <button onClick={() => handleOnClick()}>X</button>
            </div>
            <div className="driver-season-details">
                <div className="left-container">
                    <img className="team-logo" src={image} alt={team.name} />
                    <p>
                        {team.name}
                        <span className={`fi fi-${nationalityToFlag[teamsResults[0][0].constructor.nationality]}`}></span>
                    </p>
                </div>
                <div className="middle-container">
                    <p data-label={`${t("Ranking")}: `}>{teamsStandings[0][teamsStandings[0].length - 1].position}</p>
                    <p data-label={`${t("BestFinish")}: `}>{teamsDriverResults[0].reduce((acc, re) => re.positionOrder < acc.positionOrder ? re : acc).positionOrder}</p>
                    <p data-label={"Points: "}>{teamsStandings[0][teamsStandings[0].length-1].points}</p>
                </div>
                <div className="right-container">
                    <p data-label={`${t("Wins")}: `}>{teamsStandings[0][teamsStandings[0].length - 1].wins}</p>
                    <p data-label={"Podiums: "}>{getPodiums()}</p>
                    <p data-label={"Poles: "}>{teamsDriverResults.map(tdr => tdr.filter(r => r.grid === 1)).map(tdr => tdr.length).reduce((acc, l) => acc + l)}</p>
                </div>
            </div>
            <div className="graph-container">
              <div className="radio-buttons" onChange={e => setGraphData((e.target as HTMLInputElement).value)}>
                  <div className="label-input-container">
                    <label htmlFor="pointsPerRaces">{t("PointsPerRaces")}</label>
                    <input type="radio" id="pointsPerRaces" name="order" value="pointsPerRaces" defaultChecked/>
                  </div>
                  <div className="label-input-container">
                    <label htmlFor="points">Points</label>
                    <input type="radio" id="points" name="order" value="points"/>
                  </div>
                  <div className="label-input-container">
                    <label htmlFor="standing">{t("Standing")}</label>
                    <input type="radio" id="standing" name="order" value="standing"/>
                  </div>
              </div>
              <div className="line">
                  <Line data={data} options={options}></Line>
              </div>
              <div className="select-container">
                <Select2 data={otherTeamNames} label={`${t("CompareWith")} :`} onChange={handleOnChangeSelect} onUnselect={handleUnselect}/>
              </div>
            </div>
        </div>
    )
}
export default TeamSeason