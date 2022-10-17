import { getAllTeams } from "../lib/FPLDataService";

export default function TeamSelector({teams, onChange }) {

    return (
        <label>
            Teams:
            {teams.map((team) => (
                <div key={team.code}>
                    <input value={team.code} type="checkbox" onChange={onChange} />
                    <span>{team.name}</span>
                </div>
            ))}
        </label>
    );
};

