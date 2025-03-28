import "./style.css"; // Make sure the CSS file is imported
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Card } from "@mui/material";

export function Calendar1({ events }) {


    return (

      <Card sx={{ p : 2 }}>
        <FullCalendar
                                
        headerToolbar={{
            left: "title",
            center: "", 
            right: "prev,next today", 
          }}
           height={600}
           width={400}
            plugins={[ dayGridPlugin ]}
            weekends={false}
            initialView="dayGridMonth"
            
            events={events}
              eventDidMount={(info) => {
                info.el.style.fontSize = "12px"; // ✅ Increase title font size
                info.el.style.fontWeight = "bold";
              }}
        />
        </Card>        
                         
    );
}