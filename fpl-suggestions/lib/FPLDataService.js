import { order } from "./FPLDataProcessor";

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

export function getAllPlayerQueryOptions() {
    return [
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