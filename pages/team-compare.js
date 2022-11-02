import { useState } from 'react';

// Styling
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { FixtureDifficultyColorConstants } from "../constants"

// Data
import { getGeneralInfo, getFixtures, } from '../lib/FPLDataService';
import { getTeamNameFromTeamID, getTeamIDFromTeamName, getFirstOccurenceOfPropertyValueFromArray, getTeamChallengeLevelColor } from "../lib/FPLDataProcessor";

// Components
import Dropdown from '../components/dropdown';
import FPLBarChart from '../components/FPLBarChart';
import FPLFixtureCell from '../components/FPLFixtureCell';

export async function getStaticProps() {
    const data = await getGeneralInfo()
    const teams = data.teams
    const fixtures = await getFixtures(15)
    console.log(teams)
    console.log(fixtures)

    return {
        props: {
            teams: teams,
            fixtures: fixtures
        }
    }
}

export default function PlayerScatterplotPage({ teams, fixtures }) {

    const [team1Name, setTeam1Name] = useState()
    const [team2Name, setTeam2Name] = useState()

    const [team1Color, setTeam1Color] = useState()
    const [team2Color, setTeam2Color] = useState()

    const [datasetTeam1, setDatasetTeam1] = useState({})
    const [datasetTeam2, setDatasetTeam2] = useState({})

    let teamOptions = teams.map((team) => {
        return {
            label: team.name,
            value: team.id
        }
    })

    let fixtureCells = fixtures.map((fixture) =>
        <div>
            <button onClick={ () => {
                loadFixtureIntoBarchart(fixture.team_h, fixture.team_a)
                }
            }>
                <FPLFixtureCell key={fixture.code} fixture={fixture} teams={teams}/>
            </button>      
        </div>
    )

    function loadFixtureIntoBarchart(team1ID, team2ID) {
        setTeam1BarChartInfo(team1ID)
        setTeam2BarChartInfo(team2ID)
        setTeamColorsBasedOnFixtureOrRelativeStrength(team1ID, team2ID)
    }

    // Given two team IDs,
    // will return the correct color coding if a fixture for that team exists
    // or will return color coding denoting their relative strength to each other.
    function setTeamColorsBasedOnFixtureOrRelativeStrength(team1ID, team2ID) {
        let fixture = getFixtureThatIncludesThisTeam(team1ID)
        let fixtureTeamIDs = [fixture.team_h, fixture.team_a]
        console.log(fixture)

        // If the fixture does not include both teams
        if (!fixtureTeamIDs.includes(team1ID) || !fixtureTeamIDs.includes(team2ID)) {
            // Compare overall home and away strength
            let team1 = getFirstOccurenceOfPropertyValueFromArray(teams, "id", team1ID)
            let team2 = getFirstOccurenceOfPropertyValueFromArray(teams, "id", team2ID)
            let team1Strength = team1.strength_overall_home + team1.strength_overall_away
            let team2Strength = team2.strength_overall_home + team2.strength_overall_away
            console.log("comparing teams relative strength, team 1: " + team1Strength + " VS. team 2: " + team2Strength)
            if (team1Strength > team2Strength) {
                setTeam1Color(FixtureDifficultyColorConstants.hard)
                setTeam2Color(FixtureDifficultyColorConstants.easy)
            } else if (team1Strength < team2Strength) {
                console.log("team 2 is stronger")
                setTeam1Color(FixtureDifficultyColorConstants.easy)
                setTeam2Color(FixtureDifficultyColorConstants.hard)
            } else {
                setTeam1Color(FixtureDifficultyColorConstants.medium)
                setTeam2Color(FixtureDifficultyColorConstants.medium)
            }
        } else {
            // Or else use the challenge level in the fixture data
            console.log("getting teams challenge level")
            setTeam1Color(getTeamChallengeLevelColor(fixture, team1ID))
            setTeam2Color(getTeamChallengeLevelColor(fixture, team2ID))
        }
    }

    function setTeam1BarChartInfo(teamID) {
        setTeam1Name(getTeamNameFromTeamID(teams, teamID))
        let currentTeam = getFirstOccurenceOfPropertyValueFromArray(teams, "id", teamID)
        setDatasetTeam1({
            label: getTeamNameFromTeamID(teams, teamID),
            data: [currentTeam.strength_overall_home, currentTeam.strength_overall_away, currentTeam.strength_attack_home,
            currentTeam.strength_attack_away, currentTeam.strength_defence_home, currentTeam.strength_defence_away]
        })
    }

    function setTeam2BarChartInfo(teamID) {
        setTeam2Name(getTeamNameFromTeamID(teams, teamID))
        let currentTeam = getFirstOccurenceOfPropertyValueFromArray(teams, "id", teamID)
        setDatasetTeam2({
            label: getTeamNameFromTeamID(teams, teamID),
            data: [currentTeam.strength_overall_home, currentTeam.strength_overall_away, currentTeam.strength_attack_home,
            currentTeam.strength_attack_away, currentTeam.strength_defence_home, currentTeam.strength_defence_away]
        })
        console.log(getTeamChallengeLevelColor(fixtures, currentTeam.id))
    }

    function summaryStatement() {
        if (datasetTeam1.data != null && datasetTeam2.data != null) {
            return(
                <section>
                    <h2 className={utilStyles.headingLg}>Summary</h2>
                    <section>
                        <p className={utilStyles.headingSm}>Team Summary</p>
                        <p>Comparing the attacking strength of {team1Name} against the defensive strength of {team2Name}:</p>
                        <p>At a home game for {team1Name}, they are {datasetTeam1.data[2] >= datasetTeam2.data[5] ? "stronger than" : "weaker than"} {team2Name}.</p>
                        <p>At an away game for {team1Name}, they are {datasetTeam1.data[3] >= datasetTeam2.data[4] ? "stronger than" : "weaker than"} {team2Name}.</p>
                        <p>Overall the {team1Name} team is {(datasetTeam1.data[0] + datasetTeam1.data[1]) >= (datasetTeam2.data[0] + datasetTeam2.data[1]) ? "stronger than" : "weaker than"} {team2Name}.</p>
                    </section>
                    <section>
                        <p className={utilStyles.headingSm}>Player Summary For {team1Name}</p>
                    </section>
                    <section>
                        <p className={utilStyles.headingSm}>Player Summary For {team2Name}</p>
                    </section>

                </section>
            )
        } else {
            return (<p className={utilStyles.lightText}>Summary will be generated once two teams are selected.</p>)
        }
    }

    function getFixtureThatIncludesThisTeam(teamID) {
        for (let fixture of fixtures) {
            if (fixture.team_h == teamID || fixture.team_a == teamID) {
                return fixture
            }
        }
        return null
    }

    return (
        <Layout>
            <h1 className={utilStyles.headingXl}>Team Comparer</h1>
            <p className={utilStyles.lightText}>
                Select two teams from the dropdowns below to compare their strength for both home and away games. 
                A summary will be generated to know at a glance which team is better in which situation. Alternatively, you
                can click on the fixture to select those two teams to compare. Comparing two teams will also summerize any players
                for those teams that have a game related note (ex: injuries, suspensions, etc.) or are close to being suspended (4 yellow cards).
            </p>
            <p className={utilStyles.lightText}>
                The color denotes the team's strength against the opposing team. Red is strong against, green is weak against, and blue is 
                evenly matched against the opposing team.
            </p>
            
            <section className={utilStyles.centeredFlexboxTeamComparePage}>
                <section>
                    <p className={utilStyles.headingSm}>Current GW Fixtures</p>
                    {fixtureCells}
                </section> 
                <section className={utilStyles.centeredFlexboxTeamCompareColumn}>
                    <section className={utilStyles.centeredFlexbox}>
                            <Dropdown
                                label="Team 1"
                                options={teamOptions}
                                value={getTeamIDFromTeamName(teams, team1Name)}
                                onChange={ (event) => {
                                    //setTeam1BarChartInfo()
                                    loadFixtureIntoBarchart(event.target.value, getTeamIDFromTeamName(teams, team2Name))
                                }}
                            />
                            <Dropdown
                                label="Team 2"
                                options={teamOptions}
                                value={getTeamIDFromTeamName(teams, team2Name)}
                                onChange={ (event) => {
                                    loadFixtureIntoBarchart(getTeamIDFromTeamName(teams, team1Name), event.target.value)
                                    //setTeam2BarChartInfo(event.target.value)
                                }}
                            />
                    </section>
                    <FPLBarChart 
                        datasetTeam1={datasetTeam1}
                        datasetTeam2={datasetTeam2}
                        team1Color={team2Color}
                        team2Color={team1Color}
                    />
                    {summaryStatement()}
                </section>
            </section>
        </Layout>
    )

}