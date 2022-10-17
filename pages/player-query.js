import { useState } from 'react';

// Styling
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

// Data
import { getGeneralInfo, getAllPlayerQueryOptions, getAllTeamCodes } from '../lib/FPLDataService';
import { order, getTeamNameFromTeamCode, getFirstOccurenceOfPropertyValueFromArray } from "../lib/FPLDataProcessor";

// Components
import Dropdown from '../components/dropdown';
import TeamSelector from '../components/teamSelector';


export async function getStaticProps() {
    const data = await getGeneralInfo()
    const players = data.elements
    const teams = data.teams
    //const playersTransfersIn = order(players, "transfers_in")

    console.log(teams)
    return {
        props: {
            players: players,
            teams: teams
     //       playersTransfersIn: [playersTransfersIn],
            //getHighestTransferredInPlayers
        }
    }
}

const filterParams = ["transfers_in"]

export default function PlayerQueryPage({ players, teams }) {

    //let queryParam = "points_per_game"
    
   
    const playerQueryOptions = getAllPlayerQueryOptions()

    const [queryParamLabel, setQueryParamLabel] = useState('Points Per Game')

    const [queryParam, setQueryParam] = useState('points_per_game')
    const handleQueryParamOnChange = (event) => {
        setQueryParam(event.target.value)
        let queryParamLabel = getFirstOccurenceOfPropertyValueFromArray(playerQueryOptions, "value", event.target.value).label
        setQueryParamLabel(queryParamLabel)
    }

    const [includedTeams, setIncludedTeams] = useState([])
    const handleIncludedTeamsOnChange = (event) => {
        var updatedList = [...includedTeams];
        if (event.target.checked) {
          updatedList = [...includedTeams, event.target.value];
        } else {
          updatedList.splice(updatedList.indexOf(event.target.value), 1);
        }
        setIncludedTeams(updatedList);
    }

    let sortedPlayers = order(players, queryParam)


    return (
        <Layout>
            <article>
                <h1 className={utilStyles.headingXl}>Player Query</h1>
                <div className={utilStyles.lightText}>
                    <p>This is a tool to query all the FPL players based on various statistics. This tool is helpful for filtering players based on your current needs or for exploring the performance of different players.</p>
                    
                    <p className={utilStyles.lightText}>Notes:</p>
                    <ul>
                        <li className={utilStyles.listItem}>Selecting "Position" as a query will label the data as "element-type" where 
                            <br />1 = Goalkeepers 
                            <br />2 = Defenders 
                            <br />3 = Midfielders 
                            <br />4 = Forwards 
                        </li>
                    </ul>

                    <Dropdown 
                        label="Query By: "
                        options={playerQueryOptions}
                        value={queryParam}
                        onChange={handleQueryParamOnChange}
                    />
                    <br />
                    <p>Included team codes: {includedTeams.map((teamCode) => (
                        getTeamNameFromTeamCode(teams, teamCode) + ", "
                    ))}</p>
                    <TeamSelector 
                        teams={teams}
                        onChange={handleIncludedTeamsOnChange}
                    />

                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Team</th>
                            <th>{queryParamLabel}</th>
                        </tr>
                        {sortedPlayers.map(player =>{
                            if (includedTeams.includes(String(player.team_code))) {
                                return (
                                    <tr>
                                        <td>{player.first_name} {player.second_name}</td>
                                        <td>{getTeamNameFromTeamCode(teams, player.team_code)}</td>
                                        <td>{player[queryParam]}</td>
                                    </tr>
                                
                                )
                            }
                        })
                    }
                    </table>
                </div>
            </article>
        </Layout>
    )
}

//

