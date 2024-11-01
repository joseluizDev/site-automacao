"use client";

import Card from "@/components/card/card";
import Chart from "@/components/chart/chart";
import { ChartConfig } from "@/components/ui/chart";

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig



export default function Admin() {
    return (
        <div className="text-black">
            <Chart data={chartData} config={chartConfig} />
            <Card />
        </div>
    );
}