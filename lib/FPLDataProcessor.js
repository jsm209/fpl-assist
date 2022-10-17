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
export function getTeamNameFromTeamCode(teams, teamCode) {
    for (let index in teams) {
        if (teams[index].code == teamCode) {      
            return teams[index].name
        }
    }
    return "N/A"
}

export function getFirstOccurenceOfPropertyValueFromArray(array, propertyName, propertyValue) {
    for (let index in array) {
        if (array[index][propertyName] == propertyValue) {
            return array[index]
        }
    }
    return null
}