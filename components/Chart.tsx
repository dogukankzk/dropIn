"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculatePercentage, convertFileSize } from "@/lib/utils";

const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Used",
    color: "white",
  },
} satisfies ChartConfig;

export const Chart = ({ used = 0 }: { used: number }) => {
  // Correction 1: Structure des données correcte
  const chartData = [{ 
    name: "storage", 
    used: used, 
    fill: "white" 
  }];

  // Correction 2: Calcul correct de l'angle
  const percentage = calculatePercentage(used) || 0;
  const endAngle = 90 + (percentage / 100) * 270; // 270° pour un cercle presque complet

  return (
    <Card className="chart">
      <CardContent className="flex-1 p-0">
        <ChartContainer 
          config={chartConfig} 
          className="chart-container"
          // Correction 3: Assurer une taille minimale
          style={{ minHeight: "250px", minWidth: "250px" }}
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={endAngle}
            innerRadius={80}
            outerRadius={110}
            // Correction 4: Ajouter des marges
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="polar-grid"
              polarRadius={[86, 74]}
            />
            {/* Correction 5: Utiliser la bonne clé de données */}
            <RadialBar dataKey="used" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="chart-total-percentage"
                        >
                          {percentage > 0 
                            ? Math.round(percentage)
                            : "0"}
                          %
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white/70"
                        >
                          Space used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardHeader className="chart-details">
        <CardTitle className="chart-title">Available Storage</CardTitle>
        <CardDescription className="chart-description text-light-400">
          {used ? convertFileSize(used) : "0 MB"} / 2GB
        </CardDescription>
      </CardHeader>
    </Card>
  );
};