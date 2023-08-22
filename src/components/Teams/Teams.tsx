import React, { useEffect, useState } from "react"
import { API_URL, Team } from "../../utils"
import TeamsForm from "./TeamsForm";
import "../../styles/Teams.css"
import TeamReview from "./TeamReview";

function Teams() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [wantedteams, setWantedTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(API_URL + "/constructors")
        .then(resp => resp.json())
        .then(teams => {
            setTeams(teams);
            setWantedTeams(teams);
            setIsLoading(false);
        })
    }, []);

    return (
        <div className="content">
            <TeamsForm teams={teams} setWantedTeams={setWantedTeams} />
        { isLoading ? (
            <div className="loading-spinner">
                {/* Add your loading spinner component or animation here */}
            </div>
        ) :
            <section className="team-reviews">
                {wantedteams.map(team => (
                    <TeamReview key={team.id} team={team} />
                ))}
            </section>
        }
        </div>
    )
}

export default Teams