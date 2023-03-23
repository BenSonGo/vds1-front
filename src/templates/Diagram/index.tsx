import React, { useRef, useEffect, useState } from 'react';
import type { ChartData, ChartArea } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import {api, baseUrl} from "../../api";
// import faker from 'faker';

interface DataEntry {
    company_id: number;
    company_subunit_id: number | null;
    indicator_id: number;
    value: number;
    month: string;
}

interface Dataset {
    label: string;
    data: number[];
    borderColor: string;
}

interface ChartDataC {
    labels: string[];
    datasets: Dataset[];
}

function transformData(data: DataEntry[]): ChartDataC {
    const datasets: Dataset[] = [];
    const labels: string[] = [];
    const groupedData: { [key: number]: DataEntry[] } = {};

    // Group the data entries by indicator_id
    for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        if (!groupedData[entry.indicator_id]) {
            groupedData[entry.indicator_id] = [];
        }
        groupedData[entry.indicator_id].push(entry);
        if (!labels.includes(entry.month)) {
            labels.push(entry.month);
        }
    }

    // Create a dataset for each indicator_id
    for (let indicatorId in groupedData) {
        const entries = groupedData[indicatorId];
        const label = indicatorId;
        const data = labels.map((month) => {
            for (let i = 0; i < entries.length; i++) {
                if (entries[i].month === month) {
                    return entries[i].value;
                }
            }
            return 0;
        });
        const borderColor = "";
        datasets.push({ label, data, borderColor });
    }

    return { labels, datasets };
}


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const colors = [
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'teal',
    'blue',
    'purple',
];

const fakeData = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => 1000),
            borderColor: ""
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => 2000),
            borderColor: ""
        },
    ],
};
function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {


    const colorStart = colors[0];
    const colorMid = colors[1];
    const colorEnd = colors[2];

    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);

    return gradient;
}

export function Diagram() {
    const chartRef = useRef<ChartJS>(null);
    const [data, setData] = useState<ChartDataC>(fakeData);
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
        datasets: [],
    });

    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) {
            return;
        }

        api.get(`${baseUrl}indicator-value-by-month`)
            .then((response)=>{
                setData(transformData(response as unknown as DataEntry[]))
            })
            .catch((reason) => console.log(reason))

        const chartData = {
            ...data,
            datasets: data.datasets.map(dataset => ({
                ...dataset,
                borderColor: createGradient(chart.ctx, chart.chartArea),
            })),
        };

        setChartData(chartData);
    }, [data]);

    return <Chart ref={chartRef} type='line' data={chartData} />;
}

