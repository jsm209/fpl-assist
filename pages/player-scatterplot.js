import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

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
    const [scatterplotDataset, setScatterplotDataset] = useState([])
    const router = useRouter()

    // Query Param X
    const [queryParamX, setQueryParamX] = useState('points_per_game')
    const [minimumQueryParamX, setMinimumQueryParamX] = useState()
    const [maximumQueryParamX, setMaximumQueryParamX] = useState()

    // Query Param Y
    const [queryParamY, setQueryParamY] = useState('points_per_game')
    const [maximumQueryParamY, setMaximumQueryParamY] = useState()
    const [minimumQueryParamY, setMinimumQueryParamY] = useState()

    useEffect(() => {
        if (router.query.y != null) {
            setQueryParamY(router.query.y)
        }
        if (router.query.x != null) {
            setQueryParamX(router.query.x)
        }
        setScatterplotDataset(prepareScatterplotPlayerData(players, router.query.x, router.query.y))

    }, [])

    const handleQueryParamXOnChange = (event) => {
        clearRouterParamsIfNecessary()
        setQueryParamX(event.target.value)
        setScatterplotDataset(prepareScatterplotPlayerData(players, event.target.value, queryParamY))
    }

    const handleQueryParamYOnChange = (event) => {
        clearRouterParamsIfNecessary()
        setQueryParamY(event.target.value)
        setScatterplotDataset(prepareScatterplotPlayerData(players, queryParamX, event.target.value))
    }

    // Repopulates the data with whatever filters and query parameters set.
    const refreshData = () => {
        setScatterplotDataset(prepareScatterplotPlayerData(
            players,
            queryParamX,
            queryParamY,
            maximumQueryParamX,
            minimumQueryParamX,
            maximumQueryParamY,
            minimumQueryParamY
        ))
    }

    // Given a max/min X and Y value, will filter the data.
    const handleMinMaxFilterchanges = (maxX, minX, maxY, minY) => {
        setScatterplotDataset(prepareScatterplotPlayerData(
            players,
            queryParamX,
            queryParamY,
            maxX,
            minX,
            maxY,
            minY))
    }

    const data = {
        labels: ['Scatter'],
        datasets: [
            {
                label: 'All Premier League Players',
                fill: false,
                backgroundColor: '#38003c',
                pointBorderColor: '#38003c',
                pointBackgroundColor: '#38003c',
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#00ff85',
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
                            let teamName = getTeamNameFromTeamCode(teams, context[index].raw.playerData.team_code)
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

    const clearRouterParamsIfNecessary = () => {
        if (router.query != null) {
            router.push({
                pathname: "/player-scatterplot",
                query: null
            },
                undefined, { shallow: true }
            )
        }
    }

    return (
        <Layout>
            <section className={utilStyles.paddingSection}>
                <h1 className={utilStyles.headingXl}>Player Scatterplot</h1>
                <p>
                    Select a characteristic to query players by selecting from the dropdown a choice for both the Y and X axis.
                    Hover over a data point to see the player's name, team, position, and exact axis values.
                </p>

                <Dropdown
                    label="Y-Axis Query "
                    options={playerQueryOptions}
                    value={queryParamY}
                    onChange={handleQueryParamYOnChange}
                />
                <br />
                {/* <label>
                    Minimum {queryParamY}: 
                    <input type="text" value={minimumQueryParamY} onChange={(event) => {
                        setMinimumQueryParamY(event.target.value)
                        handleMinMaxFilterchanges(maximumQueryParamX, minimumQueryParamX, maximumQueryParamY, event.target.value)
                    }} />
                </label>
                <br />
                <label>
                    Maximum {queryParamY}: 
                    <input type="text" value={maximumQueryParamY} onChange={(event) => {
                        setMaximumQueryParamY(event.target.value)
                        console.log("YMax is a number: " + !isNaN(event.target.value))
                        console.log("YMax is null: " + event.target.value == null ? "Yes" : "No")
                        handleMinMaxFilterchanges(maximumQueryParamX, minimumQueryParamX, event.target.value, minimumQueryParamY)
                    }} />
                </label> */}
            </section>

            <section className={utilStyles.paddingSection}>
                <Dropdown
                    label="X-Axis Query "
                    options={playerQueryOptions}
                    value={router.query.x != null ? router.query.x : queryParamX}
                    onChange={handleQueryParamXOnChange}
                />
                <br />
                {/* <label>
                    Minimum {queryParamX}: 
                    <input type="text" value={minimumQueryParamX} onChange={(event) => {
                        setMinimumQueryParamX(event.target.value)
                        handleMinMaxFilterchanges(maximumQueryParamX, minimumQueryParamX, maximumQueryParamY, minimumQueryParamY)
                    }} />
                </label>
                <br />
                <label>
                    Maximum {queryParamX}: 
                    <input type="text" value={maximumQueryParamX} onChange={(event) => {
                        setMaximumQueryParamX(event.target.value)
                        handleMinMaxFilterchanges(maximumQueryParamX, minimumQueryParamX, maximumQueryParamY, minimumQueryParamY)
                    }} />
                </label>  */}
            </section>

            <section>
                {/* <p>Filters</p>
                <label>
                    Maximum Price: 
                    <input type="text" value={maximumQueryParamX} onChange={(event) => { setMaximumQueryParamX(event.target.value) }} />
                </label>

                <Dropdown
                    label="Position "
                    options={playerQueryOptions}
                    value={queryParamX}
                    onChange={handleQueryParamXOnChange}
                /> */}
            </section>

            <Scatter
                data={data}
                options={options}
                width={400}
                height={400}
            />

            <p className={utilStyles.lightText}>Notes:</p>
            <ul>
                <li className={utilStyles.listItem}>"Position" as a query will label the data and filters as "element-type" where
                    <br />1 = Goalkeepers
                    <br />2 = Defenders
                    <br />3 = Midfielders
                    <br />4 = Forwards
                </li>
            </ul>
        </Layout>
    )

}