import { Bar } from 'react-chartjs-2';

// Given two datasets in the following format:
/*
let data = [
    {
        label: "Team Name,
        data: [1000, 900, 200, 400, 300, 400] // 6 values in the label order
    }
]

*/
export default function FPLBarChart({ datasetTeam1, datasetTeam2, team1Color, team2Color }) {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: datasetTeam1.label + " vs. " + datasetTeam2.label,
          },
        },
      };

    const labels = ["Strength Overall Home", "Strength Overall Away", "Strength Attack Home", "Strength Attack Away", "Strength Defense Home", "Strength Defense Away"]


    const data = {
        labels,
        datasets: [
          {
            label: datasetTeam1.label,
            data: datasetTeam1.data,
            backgroundColor: team1Color,
          },
          {
            label: datasetTeam2.label,
            data: datasetTeam2.data,
            backgroundColor: team2Color,
          },
        ],
      };

    return (
        <Bar options={options} data={data} />
    );
};
