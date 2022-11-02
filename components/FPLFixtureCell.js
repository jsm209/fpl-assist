import { getTeamNameFromTeamID, getTeamChallengeLevelColor } from '../lib/FPLDataProcessor';
import utilStyles from '../styles/utils.module.css';

// Given a fixture from the FPL API
// Will return a view with the fixture formatted
export default function FPLFixtureCell({ fixture, teams }) {
    let homeTeamName = getTeamNameFromTeamID(teams, fixture.team_h, true)
    let awayTeamName = getTeamNameFromTeamID(teams, fixture.team_a, true)

    let homeTeamStyle = {
        backgroundColor: getTeamChallengeLevelColor(fixture, fixture.team_a)
    }

    let awayTeamStyle = {
        backgroundColor: getTeamChallengeLevelColor(fixture, fixture.team_h)
    }

    let seperatorStyle = {
        backgroundColor: "black"
    }


    return (
        <div>
            <span className={utilStyles.centeredFlexbox}>
                <p style={homeTeamStyle} className={utilStyles.fixtureCell}>{homeTeamName}</p> 
                <p style={seperatorStyle} className={utilStyles.fixtureCell}></p>
                <p style={awayTeamStyle} className={utilStyles.fixtureCell}>{awayTeamName}</p>
            </span>
        </div>
    );
};