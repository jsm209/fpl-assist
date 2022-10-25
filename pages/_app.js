import "../styles/global.css"

import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, BarElement, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, BarElement, Legend);

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}