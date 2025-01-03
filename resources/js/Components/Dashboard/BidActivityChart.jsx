import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BidActivityChart({ data }) {
    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Bids',
                data: data.map(item => item.count),
                backgroundColor: 'rgb(99, 102, 241)',
                borderRadius: 4
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Bid Activity',
                color: '#111827',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    bottom: 20
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#6B7280'
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#E5E7EB'
                },
                ticks: {
                    color: '#6B7280',
                    stepSize: 1
                }
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="h-[300px]">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
} 