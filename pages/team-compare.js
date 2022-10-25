import { useState } from 'react';

// Styling
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

// Data
import { getGeneralInfo, getAllPlayerQueryOptions, } from '../lib/FPLDataService';
import { getTeamNameFromTeamCode, getTeamCodeFromTeamName, getFirstOccurenceOfPropertyValueFromArray } from "../lib/FPLDataProcessor";

// Components
import Dropdown from '../components/dropdown';
import FPLBarChart from '../components/FPLBarChart';

export async function getStaticProps() {
    const data = await getGeneralInfo()
    const teams = data.teams

    return {
        props: {
            teams: teams
        }
    }
}

export default function PlayerScatterplotPage({ players, teams }) {

    const [team1Name, setTeam1Name] = useState()
    const [team2Name, setTeam2Name] = useState()

    const [datasetTeam1, setDatasetTeam1] = useState({})
    const [datasetTeam2, setDatasetTeam2] = useState({})

    let teamOptions = teams.map((team) => {
        return {
            label: team.name,
            value: team.code
        }
    })

    function summaryStatement() {
        if (datasetTeam1.data != null && datasetTeam2.data != null) {
            return(
                <section>
                    <h2 className={utilStyles.headingLg}>Summary</h2>
                    <p>Comparing the attacking strength of {team1Name} against the defensive strength of {team2Name}:</p>
                    <p>At a home game for {team1Name}, they are {datasetTeam1.data[2] >= datasetTeam2.data[5] ? "stronger than" : "weaker than"} {team2Name}.</p>
                    <p>At an away game for {team1Name}, they are {datasetTeam1.data[3] >= datasetTeam2.data[4] ? "stronger than" : "weaker than"} {team2Name}.</p>
                    <p>Overall, at a home game for {team1Name}, they are {datasetTeam1.data[0] >= datasetTeam2.data[1] ? "stronger than" : "weaker than"} {team2Name}.</p>
                </section>
            )
        } else {
            return (<p className={utilStyles.lightText}>Summary will be generated once two teams are selected.</p>)
        }
    }

    return (
        <Layout>
            <h1 className={utilStyles.headingXl}>Team Comparer</h1>
            <p className={utilStyles.lightText}>Select two teams from the dropdowns below to compare their strength for both home and away games. A summary will be generated to know at a glance which team is better in which situation.</p>
    
            <section className={utilStyles.centeredFlexbox}>
                <Dropdown
                    label="Team 1"
                    options={teamOptions}
                    value={getTeamCodeFromTeamName(teams, team1Name)}
                    onChange={ (event) => {
                        setTeam1Name(getTeamNameFromTeamCode(teams, event.target.value))
                        let currentTeam = getFirstOccurenceOfPropertyValueFromArray(teams, "code", event.target.value)
                        setDatasetTeam1({
                            label: getTeamNameFromTeamCode(teams, event.target.value),
                            data: [currentTeam.strength_overall_home, currentTeam.strength_overall_away, currentTeam.strength_attack_home,
                            currentTeam.strength_attack_away, currentTeam.strength_defence_home, currentTeam.strength_defence_away]
                        })
                    }}
                />
                <Dropdown
                    label="Team 2"
                    options={teamOptions}
                    value={getTeamCodeFromTeamName(teams, team2Name)}
                    onChange={ (event) => {
                        setTeam2Name(getTeamNameFromTeamCode(teams, event.target.value))
                        let currentTeam = getFirstOccurenceOfPropertyValueFromArray(teams, "code", event.target.value)
                        setDatasetTeam2({
                            label: getTeamNameFromTeamCode(teams, event.target.value),
                            data: [currentTeam.strength_overall_home, currentTeam.strength_overall_away, currentTeam.strength_attack_home,
                            currentTeam.strength_attack_away, currentTeam.strength_defence_home, currentTeam.strength_defence_away]
                        })
                    }}
                />
            </section>
              
            <FPLBarChart 
                datasetTeam1={datasetTeam1}
                datasetTeam2={datasetTeam2}
            />
            {summaryStatement()}
        </Layout>
    )

}