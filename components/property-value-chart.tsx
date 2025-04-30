"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { year: 2017, value: 2500000 },
  { year: 2018, value: 2650000 },
  { year: 2019, value: 2800000 },
  { year: 2020, value: 2750000 },
  { year: 2021, value: 3000000 },
  { year: 2022, value: 3250000 },
  { year: 2023, value: 3500000 },
]

export default function PropertyValueChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Property Value (₹)",
          color: "#138808",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis
            tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <ChartTooltip
            content={<ChartTooltipContent formatter={(value) => `₹${(Number(value) / 100000).toFixed(2)}L`} />}
          />
          <Line type="monotone" dataKey="value" stroke="#138808" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
