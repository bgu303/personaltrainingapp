import React, { useEffect, useState, useRef } from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

function TrainingCalendar() {
    const localizer = momentLocalizer(moment)
    const [dates2, setDates2] = useState([])
    
    useEffect(() => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                alert("Something went wrong fething the trainings data")
            }
        })
        .then(responseData => setDates2(responseData.content))
    }, [])

    const [dates, setDates] = useState([{
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(dates2[3]),
        end: new Date(2022, 3, 1),
      }
    ])

    return (
        <>
            <div className="myCustomHeight" style={{height: 500}}>
                <Calendar
                    localizer={localizer}
                    events={dates}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
        </>
    )
}

export default TrainingCalendar;