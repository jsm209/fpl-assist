import utilStyles from '../styles/utils.module.css';

export default function Dropdown({ label, value, options, onChange }) {
    return (
        <label className={utilStyles.marginRight}>
            {label}
            <select value={value} onChange={onChange} className={utilStyles.marginLeft}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
};