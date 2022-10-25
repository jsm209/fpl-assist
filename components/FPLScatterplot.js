// import { getAllTeams } from "../lib/FPLDataService";
// import utilStyles from '../styles/utils.module.css';

// // Data
// import { getGeneralInfo, getAllPlayerQueryOptions, } from '../lib/FPLDataService';
// import { getTeamNameFromTeamCode, prepareScatterplotPlayerData, getPositionNameFromElementType } from "../lib/FPLDataProcessor";

// export default function FPLScatterplot({scatterplotDataset, onChange }) {

//     const data = {
//         labels: ['Scatter'],
//         datasets: [
//             {
//                 label: 'My First dataset',
//                 fill: false,
//                 backgroundColor: 'rgba(75,192,192,0.4)',
//                 pointBorderColor: 'rgba(75,192,192,1)',
//                 pointBackgroundColor: '#fff',
//                 pointBorderWidth: 5,
//                 pointHoverRadius: 5,
//                 pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//                 pointHoverBorderColor: 'rgba(220,220,220,1)',
//                 pointHoverBorderWidth: 2,
//                 pointRadius: 1,
//                 pointHitRadius: 5,
//                 data: scatterplotDataset
//             }
//         ]
//     };

//     const options = {
//         plugins: {
//             tooltip: {
//                 callbacks: {
//                     title: (context) => {
//                         let label = "";
//                         for (let index in context) {
//                             let teamName =  getTeamNameFromTeamCode(teams, context[index].raw.playerData.team_code)
//                             let position = getPositionNameFromElementType(context[index].raw.playerData.element_type)
//                             label = label + context[index].raw.name + " (" + teamName + ", " + position + ")" + "\n"
//                         }
//                         return label
//                     }
//                 }
//             },
//             legend: { display: true },
//             title: {
//                 display: true,
//                 text: "FPL Players (Y: " + queryParamY + " vs. X: " + queryParamX + ")",
//                 position: "top"
//             }
//         },
//         scales: {
//             y: {
//               beginAtZero: true,
//               title: {
//                 display: true,
//                 text: queryParamY
//               }
//             },
//             x: {
//                 beginAtZero: true,
//                 title: {
//                   display: true,
//                   text: queryParamX
//                 }
//               },
//           },
//     }

//     return (
//         <Scatter
//             data={data}
//             options={options}
//             width={400}
//             height={400}
//         />
//     );
// };
