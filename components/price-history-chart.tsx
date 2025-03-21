"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PricePoint {
  date: string
  price: number
}

interface PriceHistoryChartProps {
  priceHistory: PricePoint[]
}

export default function PriceHistoryChart({ priceHistory }: PriceHistoryChartProps) {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={priceHistory}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin - 50", "dataMax + 50"]} />
          <Tooltip formatter={(value) => [`$${value}`, "Price"]} labelFormatter={(label) => `Date: ${label}`} />
          <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

