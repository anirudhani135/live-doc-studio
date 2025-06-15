
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { day: "Monday", interactions: 15, documents: 22 },
  { day: "Tuesday", interactions: 25, documents: 13 },
  { day: "Wednesday", interactions: 32, documents: 28 },
  { day: "Thursday", interactions: 28, documents: 19 },
  { day: "Friday", interactions: 45, documents: 35 },
  { day: "Saturday", interactions: 12, documents: 8 },
  { day: "Sunday", interactions: 9, documents: 5 },
];

const chartConfig = {
  documents: {
    label: "Documents",
    color: "#2563eb",
  },
  interactions: {
    label: "Interactions",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function AnalyticsChart() {
  return (
    <Card className="bg-white border shadow-sm rounded-xl">
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>Interactions and documents created over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="documents" fill="var(--color-documents)" radius={4} />
            <Bar dataKey="interactions" fill="var(--color-interactions)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
