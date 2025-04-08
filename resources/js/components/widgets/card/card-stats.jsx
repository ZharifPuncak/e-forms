import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';

export function CardStats({title, amount, tooltip, icon: Icon}) {
    return (
        <Box >
            <Card>
             
                    <Stack
                        spacing={1}
                        sx={{
                            alignItems: "center",
                     
                        
                            display: "flex",
                            justifyContent: "center",
                            p: 1,
                        }}
                    >
                        <Typography variant="h5" sx={{ mb : -0.5, mt : 1}}>
                                {amount}
                        </Typography>
                        <Typography color="text.secondary" variant="overline">
                              { <Tooltip arrow placement="bottom-start" title={tooltip}> <Box sx={{ color : '#4DB5E5', cursor : 'pointer' }}>{title}</Box>     </Tooltip>}
                        </Typography>
                    </Stack>
            
            </Card>
        </Box>
    );
}
