import { order } from "./FPLDataProcessor";
import useSWR from 'swr'

// FPLDataService is responsible for collecting groups of data.



const fetcher = (...args) => fetch(...args).then(res => res.json())

export function useGeneralInfo() {
    const { data, error } = useSWR("http://gobetween.oklabs.org/https://fantasy.premierleague.com/api/bootstrap-static/", fetcher)
  
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
  }


export async function getGeneralInfo() {

    let sessionData = null;
    let data = null;

    if (typeof window !== "undefined") {
        // Client-side-only code
        console.log("Using session storage FPL data...")
        sessionData = window.sessionStorage.getItem("fpl-data")
        data = sessionData
    }

    // If we failed to get session data because we're trying to execute severside
    if (sessionData == null) {
        console.log("Fetching updated FPL data...")
        const res = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/")
        data = await res.json();

        if (typeof window !== "undefined") {
            // Client-side-only code
            console.log("Storing FPL data in session storage...")
            window.sessionStorage.setItem("fpl-data", data)
        }


    }

    return data
}

export async function refreshStoredFPLData() {
    console.log("Refreshing FPL data...")
    const res = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/")
    const data = await res.json();
    window.sessionStorage.setItem("fpl-data", data)
}

export async function getAllPlayers() {
    const data = await getGeneralInfo()
    const players = data.elements

    return players
}

// Given the gameweek, will get the fixtures for that gameweek
// If gameweek is null, fixtures for the upcoming game week will be returned
// If gameweek is 0, will return all fixtures, past and future.
export async function getFixtures(gameweek) {

    let baseUrl = "https://fantasy.premierleague.com/api/fixtures/"

    if (gameweek == null) {
        baseUrl = baseUrl + "?future=1"
    } else if (gameweek != 0) {
        baseUrl = baseUrl + "?event=" + gameweek
    } else {
        baseUrl = baseUrl + "?future=0"
    }
    const res = await fetch(baseUrl)
    const data = await res.json()
    return data;
}

export function getAllPlayerQueryOptions() {
    return [
        {
            label: "Price Value",
            value: "now_cost"
        },
        {
            label: "Position",
            value: "element_type"
        },
        {
            label: "Form",
            value: "form"
        },
        {
            label: "Points Per Game",
            value: "points_per_game"
        },
        {
            label: "Total Points",
            value: "total_points"
        },
        {
            label: "Transfers In (Gameweek)",
            value: "transfers_in_event"
        },
        {
            label: "Transfers In (Overall)",
            value: "transfers_in"
        },
        {
            label: "Transfers Out (Gameweek)",
            value: "transfers_out_event"
        },
        {
            label: "Transfers Out (Overall)",
            value: "transfers_out"
        },
        {
            label: "Yellow Cards",
            value: "yellow_cards"
        },
        {
            label: "Red Cards",
            value: "red_cards"
        },
        {
            label: "Goals Scored",
            value: "goals_scored"
        },
        {
            label: "Goals Condeded",
            value: "goals_conceded"
        },
        {
            label: "Clean Sheets",
            value: "clean_sheets"
        },
        {
            label: "Minutes Played",
            value: "minutes"
        },
    ]
}

export async function getAllTeams() {
    const data = await getGeneralInfo()
    const teams = data.teams

    return teams
}

export async function getAllTeamCodes(teams) {
    let teamCodes = [];
    for (let index in teams) {
        teamCodes.push(teams[index].code)
    }

    return teamCodes
}