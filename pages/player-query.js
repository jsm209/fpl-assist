import { useState } from 'react';

// Styling
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

// Data
import { getGeneralInfo, getAllPlayerQueryOptions } from '../lib/FPLDataService';
import { order, getTeamNameFromTeamCode, getFirstOccurenceOfPropertyValueFromArray, getPlayerDataMapping } from "../lib/FPLDataProcessor";

// Components
import Dropdown from '../components/dropdown';
import FPLTeamSelector from '../components/FPLTeamSelector';
import FPLPlayerSummaryModal from '../components/FPLPlayerSummaryModal';


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

    const [playerModalInfo, setPlayerModalInfo] = useState({})
    const [showPlayerModal, setShowPlayerModal] = useState(false)

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
                <p>
                    Select a quality from the dropdown to sort players by, and select which teams are included from the checkboxes below. Click on a table row to see a player's full FPL stats.
                </p>


                <Dropdown
                    label="Sort By: "
                    options={playerQueryOptions}
                    value={queryParam}
                    onChange={handleQueryParamOnChange}
                />
                <br />

                <section className={utilStyles.paddingSection}>
                    <p>Included Teams:</p>
                    <FPLTeamSelector
                        teams={teams}
                        onChange={handleIncludedTeamsOnChange}
                    />
                </section>

                <section className={utilStyles.paddingSection}>
                    <table className={utilStyles.playerTable}>
                        <thead>
                            <tr className={utilStyles.paddingRight}>
                                <th>Name</th>
                                <th>Team</th>
                                <th>{queryParamLabel}</th>
                            </tr>
                        </thead>

                        {sortedPlayers.map(player => {
                            if (includedTeams.includes(String(player.team_code))) {
                                return (
                                    <tbody>
                                        <tr className={utilStyles.paddingRight} onClick={() => {
                                            setShowPlayerModal(true)
                                            setPlayerModalInfo({ ...player, team_name: getTeamNameFromTeamCode(teams, player.team_code) })
                                        }}>
                                            <td><a style={{color: "black"}}>{player.first_name} {player.second_name}</a></td>
                                            <td>{getTeamNameFromTeamCode(teams, player.team_code)}</td>
                                            <td>{getPlayerDataMapping(player, queryParam)}</td>
                                        </tr>
                                    </tbody>
                                )
                            }
                        })
                        }
                    </table>
                </section>
            </article>
            <FPLPlayerSummaryModal
                player={playerModalInfo}
                open={showPlayerModal}
                callback={() => {
                    setShowPlayerModal(false)
                }}
            />
        </Layout>
    )
}

//

