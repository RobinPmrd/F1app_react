import React, { useEffect, useState } from "react"
import { API_URL, Team, alphabeticOrder } from "../../utils"
import TeamsForm from "./TeamsForm";
import TeamReview from "./TeamReview";

function Teams() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [wantedteams, setWantedTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(API_URL + "/constructors")
        .then(resp => resp.json())
        .then((teams: Team[]) => {
            setTeams(teams);
            setWantedTeams(teams.filter(t => t.seasons?.includes(2023)).sort((t1,t2) => alphabeticOrder(t1.name, t2.name)));
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
            <section className="reviews">
                {wantedteams.map(team => (
                    <TeamReview key={team.id} team={team} />
                ))}
            </section>
        }
        </div>
    )
}

export default Teams