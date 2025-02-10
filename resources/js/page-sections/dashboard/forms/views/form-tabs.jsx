import * as React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { FormDeclarations } from "./form-declarations";
import { FormAssignment } from "./form-assignment";
import { FormFile } from "./form-file";
import { FormNotifications } from "./form-notifications";

export function FormTabs() {

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

	return (
		<Card sx={{ minHeight : '350px'}}>
            <Stack sx={{ p : 2 }}>
			  <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Declarations" value="1" />
                        <Tab label="Files" value="2" />
                        <Tab label="Assignment" value="3" />
                        <Tab label="Notifications" value="4" />
                    </TabList>
                    </Box>
                    <TabPanel value="1"><FormDeclarations /></TabPanel>
                    <TabPanel value="2"><FormFile /></TabPanel>
                    <TabPanel value="3"><FormAssignment /></TabPanel>
                    <TabPanel value="4"><FormNotifications /></TabPanel>
                </TabContext>
            </Box>
            </Stack>
		</Card>
	);
}
