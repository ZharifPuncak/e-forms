"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { dayjs } from "@/lib/dayjs";
import { DataTable } from "@/components/core/data-table";
import { useMediaQuery } from "@/hooks/use-media-query";
import { purple } from '@mui/material/colors';






export function FormRecentList({ data }) {

    const mdDown = useMediaQuery("down", "md");
    const [columns,setColumns] =  React.useState([]);

    React.useEffect(() => {
        setColumns([
            {
                formatter: (row) => (
                   <Box sx={{ display: "flex", gap: 1 }}>
                  {!mdDown  &&  <>
                    <Box
                        sx={{
                            bgcolor: "var(--mui-palette-background-level1)",
                            borderRadius: 1.5,
                            flex: "0 0 auto",
                            p: "4px 8px",
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="caption">{dayjs(row.from).format("MMM").toUpperCase()}</Typography>
                        <Typography variant="h6">{dayjs(row.from).format("D")}</Typography>
                        <Typography variant="caption">{dayjs(row.from).format("YYYY")}</Typography>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "var(--mui-palette-background-level1)",
                            borderRadius: 1.5,
                            flex: "0 0 auto",
                            p: "4px 8px",
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="caption">{dayjs(row.to).format("MMM").toUpperCase()}</Typography>
                        <Typography variant="h6">{dayjs(row.to).format("D")}</Typography>
                          <Typography variant="caption">{dayjs(row.to).format("YYYY")}</Typography>
                    </Box>
                    </>}
                   </Box>
                ),
                name: "Date",
                width: mdDown  ? "0px" : "75px",
            },
            {
                formatter: (row) => (
                    <div>
                        <Typography sx={{ whiteSpace: "nowrap" }} variant="subtitle2">
                            { row.title }
                        </Typography>
                        <Typography color="text.secondary" sx={{ whiteSpace: "nowrap" }} variant="caption">
                            { row.subtitle }
                        </Typography>
                    </div>
                ),
                name: "subtitle1",
            },
            {
                formatter: (row) => (
                    <Typography
                        color={row.subtitle2 === "ongoing" ? "success.main" : row.subtitle2 === "closed" ?  "error.main" :  row.subtitle2 === "pending" ? "warning.main" : purple[500]}
                        sx={{ whiteSpace: "nowrap", }}
                        variant="subtitle2"
                    >
                    {row.subtitle2}
                    </Typography>
                ),
                name: "subtitle2",
                align: "right",
            },
        ])
    },[mdDown]);

    return (
        <Box sx={{  p: 1 }}>
            <Card>
        
                <Divider />
                <Box sx={{ overflowX: "auto" }}>
                    {data  && <DataTable columns={columns} hideHead rows={data} />}
                </Box>
            </Card>
        </Box>
    );
}
