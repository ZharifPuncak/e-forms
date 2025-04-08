import "./style.css"; // Make sure the CSS file is imported
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from "@fullcalendar/multimonth";
import { Card,CardContent,Typography } from "@mui/material";

export function Calendar1({ events }) {


    return (

      <Card sx={{ p : 4 }}>
 
         <FullCalendar
                                  
            headerToolbar={{
                left: "title",
                center: "", 
                //  right: "prev,next today", 
                right: "prev,next"
              }}
              height={600}
              width={400}
                  // plugins={[ dayGridPlugin ]}
                  // weekends={false}
                  // initialView="dayGridMonth"
                  plugins={[multiMonthPlugin]}
                  initialView="multiMonthYear" // Shows all 12 months
                  multiMonthMaxColumns={1}
                
                events={events}
                  eventDidMount={(info) => {
                    info.el.style.fontSize = "12px"; // ✅ Increase title font size
                    info.el.style.fontWeight = "bold";
                  }}
            />
      
        </Card>        
                         
    );
}