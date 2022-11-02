import { useState } from 'react';

// Styling
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

// Data
import { getGeneralInfo, getAllPlayerQueryOptions, useGeneralInfo } from '../lib/FPLDataService';
import { order, getTeamNameFromTeamCode, getFirstOccurenceOfPropertyValueFromArray, getPlayerDataMapping } from "../lib/FPLDataProcessor";

// Components
import Dropdown from '../components/dropdown';
import TeamSelector from '../components/TeamSelector';


export async function getStaticProps() {
    const data = await getGeneralInfo()
    // const { data, isLoading, isError } = useGeneralInfo()
    const players = data.elements
    const teams = data.teams
    //const playersTransfersIn = order(players, "transfers_in")

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
    // const { data, isLoading, isError } = useGeneralInfo()

    // if (isError) return <div>Failed to load</div>
    // if (isLoading) return <div>Loading...</div>

   
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
                    <p className={utilStyles.lightText}>This is a tool to query all the FPL players based on various statistics. This tool is helpful for filtering players based on your current needs or for exploring the performance of different players.</p>

                    
                    <Dropdown 
                        label="Query By: "
                        options={playerQueryOptions}
                        value={queryParam}
                        onChange={handleQueryParamOnChange}
                    />
                    <br />

                    <section className={utilStyles.paddingSection}>
                        <p>Included Teams:</p>
                        <TeamSelector 
                            teams={teams}
                            onChange={handleIncludedTeamsOnChange}
                        />
                    </section>

                    <section className={utilStyles.paddingSection}>
                        <table className={utilStyles.playerQueryTable}>
                            <tr className={utilStyles.paddingRight}>
                                <th>Name</th>
                                <th>Team</th>
                                <th>{queryParamLabel}</th>
                            </tr>
                            {sortedPlayers.map(player =>{
                                if (includedTeams.includes(String(player.team_code))) {
                                    return (
                                        <tr className={utilStyles.paddingRight}>
                                            <td>{player.first_name} {player.second_name}</td>
                                            <td>{getTeamNameFromTeamCode(teams, player.team_code)}</td>
                                            <td>{getPlayerDataMapping(player, queryParam)}</td>
                                        </tr>
                                    
                                    )
                                }
                            })
                        }
                        </table>
                    </section>
            </article>
        </Layout>
    )
}

//

