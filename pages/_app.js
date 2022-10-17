import "../styles/global.css"

import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}