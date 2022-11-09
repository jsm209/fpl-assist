import { getAllTeams } from "../lib/FPLDataService";
import utilStyles from '../styles/utils.module.css';

export default function FPLTeamSelector({teams, onChange }) {

    return (
        <div className={utilStyles.teamSelectorFlexbox}>
            {teams.map((team) => (
                <div key={team.code} className={utilStyles.paddingRight}>
                    <label>
                        <input value={team.code} type="checkbox" onChange={onChange} />
                        {team.name}
                    </label>
                </div>
            ))}
        </div>
    );
};
