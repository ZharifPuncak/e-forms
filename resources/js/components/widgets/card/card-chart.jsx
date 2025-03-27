"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ChartPieSlice as ChartPieSliceIcon } from "@phosphor-icons/react/dist/ssr/ChartPieSlice";
import { DotsThree as DotsThreeIcon } from "@phosphor-icons/react/dist/ssr/DotsThree";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

import { NoSsr } from "@/components/core/no-ssr";

export function CardChart({ data, title, icon, total }) {

	const chartSize = 200;
	const chartTickness = 30;
	const [chartData,setChartData] = React.useState([]);

	React.useEffect(() => {
		if(total && data){

			let calculatedChartData = data?.map((item) => {
				return  { ...item, value:  (item.value / total) * 100 }
			});

			setChartData(calculatedChartData)
		}
	},[total,data])
	
	return (
		<Card>
			<CardHeader
				action={
					// <IconButton>
					// 	<DotsThreeIcon weight="bold" />
					// </IconButton>
                    null
				}
				// avatar={
				// 	<>
				// 	{/* <Avatar>
				// 		<ChartPieSliceIcon fontSize="var(--Icon-fontSize)" />
				// 	</Avatar> */}
				// 	</>
					
				// }
				title={title}
			/>
			<CardContent>
				<Stack divider={<Divider />} spacing={3}>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<NoSsr fallback={<Box sx={{ height: `${chartSize}px`, width: `${chartSize}px` }} />}>
							<PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
								<Pie
									animationDuration={100}
									cx={chartSize / 2}
									cy={chartSize / 2}
									data={chartData}
									dataKey="value"
									innerRadius={chartSize / 2 - chartTickness}
									nameKey="name"
									outerRadius={chartSize / 2}
									strokeWidth={0}
								>
									{chartData.map((entry) => (
										<Cell fill={entry.color} key={entry.name} />
									))}
								</Pie>
								<Tooltip animationDuration={50} content={<TooltipContent />} />
							</PieChart>
						</NoSsr>
					</Box>
					<Legend payload={data} />
				</Stack>
			</CardContent>
		</Card>
	);
}

function Legend({ payload }) {
	return (
		<Box sx={{ display: "grid", gap: 3, gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))" }}>
			{payload?.map((entry) => (
				<div key={entry.name}>
					<Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
						<Box sx={{ bgcolor: entry.color, borderRadius: "2px", height: "4px", width: "16px" }} />
						<Typography variant="body2">{entry.name}</Typography>
					</Stack>
					<Typography variant="h5">
						{/* {new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 2 }).format(entry.value / 100)} */}
						{entry.value}
					</Typography>
				</div>
			))}
		</Box>
	);
}

function TooltipContent({ active, payload }) {
	if (!active) {
		return null;
	}

	return (
		<Paper sx={{ border: "1px solid var(--mui-palette-divider)", boxShadow: "var(--mui-shadows-16)", p: 1 }}>
			<Stack spacing={2}>
				{payload?.map((entry) => (
					<Stack direction="row" key={entry.name} spacing={3} sx={{ alignItems: "center" }}>
						<Stack direction="row" spacing={1} sx={{ alignItems: "center", flex: "1 1 auto" }}>
							<Box sx={{ bgcolor: entry.payload.fill, borderRadius: "2px", height: "8px", width: "8px" }} />
							<Typography sx={{ whiteSpace: "nowrap" }}>{entry.name}</Typography>
						</Stack>
						<Typography color="text.secondary" variant="body2">
							{new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 2 }).format(entry.value / 100)}
						</Typography>
					</Stack>
				))}
			</Stack>
		</Paper>
	);
}
