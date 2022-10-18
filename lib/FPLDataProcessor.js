

// FPLDataProcessor is responsible for performing operations on groups of data.

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
            console.log("COMPARING STRINGS")
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

// Given a team code,
// will return a string of the team name.
// TODO: Make it so this function doesn't require you to pass teams to it.
export function getTeamNameFromTeamCode(teams, teamCode) {
    for (let index in teams) {
        if (teams[index].code == teamCode) {      
            return teams[index].name
        }
    }
    return "N/A"
}

export function getPositionNameFromElementType(elementType) {
    switch(elementType) {
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
export function prepareScatterplotPlayerData(players, xAxisPropertyName, yAxisPropertyName) {
    console.log(players)
    return players.map((player) => (
        {
            // itemname: player.first_name + " " + player.second_name,
            // axis: [+player[xAxisPropertyName], +player[yAxisPropertyName]]
            x: player[xAxisPropertyName],
            y: player[yAxisPropertyName],
            name: player.first_name + " " + player.second_name,
            playerData: player
        }
    ));

        //let xAxisValue = isNan(player[xAxisPropertyName]) ? 0 : +player[xAxisPropertyName]
        //let yAxisValue = isNan(player[yAxisPropertyName]) ? 0 : +player[yAxisPropertyName]
    //     return {
    //         itemname: player.first_name + " " + player.second_name,
    //         axis: [+player[xAxisPropertyName], +player[yAxisPropertyName]]
    //     }

    //     const reformattedArray = kvArray.map(({ key, value}) => ({ [key]: value }));
    // })
}

// Given a player and a query param for a player,
// will return the value or another data mapping for special or nondescriptive values.
export function getPlayerDataMapping(player, queryParam) {

    switch(queryParam) {
        case "element_type":
            return getPositionNameFromElementType(player[queryParam]);
        case "now_cost":
            return Math.round(player[queryParam] * 0.1 * 10) / 10;
        default:
            return player[queryParam];
    }
}