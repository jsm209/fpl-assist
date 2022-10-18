import { useState } from 'react';

// Styling
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

// Data
import { getGeneralInfo, getAllPlayerQueryOptions, } from '../lib/FPLDataService';
import { getTeamNameFromTeamCode, prepareScatterplotPlayerData, getPositionNameFromElementType } from "../lib/FPLDataProcessor";

// Components
import Dropdown from '../components/dropdown';
import { Scatter } from 'react-chartjs-2';

export async function getStaticProps() {
    const data = await getGeneralInfo()
    const players = data.elements
    const teams = data.teams

    return {
        props: {
            players: players,
            teams: teams
        }
    }
}

export default function PlayerScatterplotPage({ players, teams }) {

    const playerQueryOptions = getAllPlayerQueryOptions()
    
    const [queryParamX, setQueryParamX] = useState('points_per_game')
    const [queryParamY, setQueryParamY] = useState('points_per_game')

    const [scatterplotDataset, setScatterplotDataset] = useState([])

    const data = {
        labels: ['Scatter'],
        datasets: [
            {
                label: 'My First dataset',
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 5,
                data: scatterplotDataset
            }
        ]
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    title: (context) => {
                        let label = "";
                        for (let index in context) {
                            let teamName =  getTeamNameFromTeamCode(teams, context[index].raw.playerData.team_code)
                            let position = getPositionNameFromElementType(context[index].raw.playerData.element_type)
                            label = label + context[index].raw.name + " (" + teamName + ", " + position + ")" + "\n"
                        }
                        return label
                    }
                }
            },
            legend: { display: true },
            title: {
                display: true,
                text: "FPL Players (Y: " + queryParamY + " vs. X: " + queryParamX + ")",
                position: "top"
            }
        },
        scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: queryParamY
              }
            },
            x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: queryParamX
                }
              },
          },
    }

    const handleQueryParamXOnChange = (event) => {
        setQueryParamX(event.target.value)
        console.log(players)
        setScatterplotDataset(prepareScatterplotPlayerData(players, event.target.value, queryParamY))
    }

    const handleQueryParamYOnChange = (event) => {
        setQueryParamY(event.target.value)
        setScatterplotDataset(prepareScatterplotPlayerData(players, queryParamX, event.target.value))
    }

    return (
        <Layout>
            <Dropdown
                label="Y-Axis Query "
                options={playerQueryOptions}
                value={queryParamY}
                onChange={handleQueryParamYOnChange}
            />
            <br />
            <Dropdown
                label="X-Axis Query "
                options={playerQueryOptions}
                value={queryParamX}
                onChange={handleQueryParamXOnChange}
            />

            <Scatter
                data={data}
                options={options}
                width={400}
                height={400}
            />

            <p className={utilStyles.lightText}>Notes:</p>
            <ul>
                <li className={utilStyles.listItem}>Selecting "Position" as a query will label the data as "element-type" where 
                    <br />1 = Goalkeepers 
                    <br />2 = Defenders 
                    <br />3 = Midfielders 
                    <br />4 = Forwards 
                </li>
            </ul>
        </Layout>
    )

}