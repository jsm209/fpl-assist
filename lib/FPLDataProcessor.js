

// FPLDataProcessor is responsible for performing operations on groups of data.

import { FixtureDifficultyColorConstants } from "../constants"

// Given an array of objects, 
// will order it from highest to lowest
// based on a given key name
export function order(array, keyName) {
    return array.sort((a, b) => {
        // check for string, return alphabetical
        // check for number, return higher number
        // check for bool, return trues over falses

        let propertyA = a[keyName]
        let propertyB = b[keyName]

        if (!isNaN(propertyA) && !isNaN(propertyB)) {
            return propertyB - propertyA
        } else if (typeof propertyA === 'string' && typeof propertyB === 'string') {
            return propertyA.localeCompare(propertyB)
        } else if (typeof propertyA == 'boolean' && typeof propertyB == 'boolean') {
            if (propertyA && propertyB) {
                return 0
            } else if (a) {
                return -1
            } else {
                return 1
            }
        } else {
            // Uncomparable, so consider them equal, order unaltered
            return 0
        }
    })
}

// Given a team ID,
// will return a string of the team name.
// TODO: Make it so this function doesn't require you to pass teams to it.
export function getTeamNameFromTeamID(teams, teamID, isShortName = false) {
    for (let team of teams) {
        if (team.id == teamID) {
            if (isShortName) {
                return team.short_name
            }
            return team.name
        }
    }
    return "N/A"
}

// Given a team code,
// will return a string of the team name.
// TODO: Make it so this function doesn't require you to pass teams to it.
export function getTeamNameFromTeamCode(teams, teamCode) {
    for (let team of teams) {
        if (team.code == teamCode) {
            return team.name
        }
    }
    return "N/A"
}


// Given a team name,
// will return a number of the team's ID.
// TODO: Make it so this function doesn't require you to pass teams to it.
export function getTeamIDFromTeamName(teams, name) {
    for (let index in teams) {
        if (teams[index].name == name) {
            return teams[index].id
        }
    }
    return "N/A"
}

// Given a team name,
// will return a number of the team's ID.
// TODO: Make it so this function doesn't require you to pass teams to it.
export function getTeamCodeFromTeamID(teams, teamID) {
    for (let index in teams) {
        if (teams[index].id == teamID) {
            return teams[index].code
        }
    }
    return "N/A"
}

// Given a team name,
// will return a number of the team's code.
// TODO: Make it so this function doesn't require you to pass teams to it.
export function getTeamCodeFromTeamName(teams, name) {
    for (let index in teams) {
        if (teams[index].name == name) {
            return teams[index].code
        }
    }
    return "N/A"
}

// Given a fixture and the desired team code
// Will return a hexcode for a color corresponding to that team's fixture difficulty rating.
export function getTeamChallengeLevelColor(fixture, teamID) {
    let teamDifficulty;
    if (fixture.team_h == teamID) {
        teamDifficulty = fixture.team_h_difficulty
    } else {
        teamDifficulty = fixture.team_a_difficulty
    }

    switch (teamDifficulty) {
        case 1:
        case 2:
            return FixtureDifficultyColorConstants.easy
        case 3:
            return FixtureDifficultyColorConstants.medium
        case 4:
        case 5:
            return FixtureDifficultyColorConstants.hard
    }
}

export function getPositionNameFromElementType(elementType) {
    switch (elementType) {
        case 1:
            return "Goalkeeper"
        case 2:
            return "Defender"
        case 3:
            return "Midfielder"
        case 4:
            return "Forward"
        default:
            return "N/A"
    }
}

// Given an array, property name, and property value,
// will iterate O(n) to find the first occurence of the value
// and return the object.
// Useful for finding a specific player or team that has a certain property value.
export function getFirstOccurenceOfPropertyValueFromArray(array, propertyName, propertyValue) {
    for (let index in array) {
        if (array[index][propertyName] == propertyValue) {
            return array[index]
        }
    }
    return null
}

// Given an array of FPL players, an xAxisName and yAxisName that corresponds to a player property,
// will return an array of points for a scatterplot.
export function prepareScatterplotPlayerData(
    players,
    xAxisPropertyName,
    yAxisPropertyName,
    xMax = null,
    xMin = null,
    yMax = null,
    yMin = null) {
    let filteredAndPreparedPlayerDataPoints = []
    for (let index in players) {
        let playerDataPoint = {
            x: players[index][xAxisPropertyName],
            y: players[index][yAxisPropertyName],
            name: players[index].first_name + " " + players[index].second_name,
            playerData: players[index]
        }
        if (isPlayerDataPointWithinMinMaxFilter(playerDataPoint, xMax, xMin, yMax, yMin)) {
            filteredAndPreparedPlayerDataPoints.push(playerDataPoint)
        }
    }
    console.log(filteredAndPreparedPlayerDataPoints)
    return filteredAndPreparedPlayerDataPoints

    // let filteredPlayerDataPoints = players.map((player) => (
    //     {
    //         x: player[xAxisPropertyName],
    //         y: player[yAxisPropertyName],
    //         name: player.first_name + " " + player.second_name,
    //         playerData: player
    //     }
    // ));
    // console.log(filteredPlayerDataPoints);
    // return filteredPlayerDataPoints;
}

// Helper function for filtering a player data point based on a given max and min
// Given a playerDataPoint, and x/y min and max values (that may or may not be numbers),
// will attempt to use it as a number to compare the data point. Non-numbers will be disregarded.
// Will return true if the point lies within the filtered axis and false otherwise
function isPlayerDataPointWithinMinMaxFilter(playerDataPoint, xMax, xMin, yMax, yMin) {
    if ((xMax != null && !isNaN(xMax) && playerDataPoint.x > +xMax) ||
        (xMin != null && !isNaN(xMin) && playerDataPoint.x < +xMin) ||
        (yMax != null && !isNaN(yMax) && playerDataPoint.y > +yMax) ||
        (yMin != null && !isNaN(yMin) && playerDataPoint.y < +yMin)
    ) {
        return false
    }
    return true
}

// Given a player and a query param for a player,
// will return the value or another data mapping for special or nondescriptive values.
export function getPlayerDataMapping(player, queryParam) {

    switch (queryParam) {
        case "element_type":
            return getPositionNameFromElementType(player[queryParam]);
        case "now_cost":
            return Math.round(player[queryParam] * 0.1 * 10) / 10;
        default:
            return player[queryParam];
    }
}

// A player is at risk if they have news, 4 yellows cards, or a red card.
export function getAllAtRiskPlayersForTeamCode(players, teamCode) {
    let atRiskPlayers = []
    for (let player of players) {
        if (player.news != null || player.yellow_cards >= 4 || player.red_cards >= 1) {
            if (player.team_code == teamCode) {
                atRiskPlayers.push(player)
            }
        }
    }
    console.log(atRiskPlayers)
    return atRiskPlayers
}

export function getCurrentGameWeek() {
    //define a date object variable that will take the current system date  
    let todaydate = new Date();

    //find the year of the current date  
    var oneJan = new Date(todaydate.getFullYear(), 0, 1);

    // calculating number of days in given year before a given date   
    var numberOfDays = Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));

    // adding 1 since to current date and returns value starting from 0   
    var result = Math.ceil((todaydate.getDay() + 1 + numberOfDays) / 7);

    // FPL season started 30 weeks in
    return result - 30 

}