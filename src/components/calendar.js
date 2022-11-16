import React, { useEffect, useState } from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

function TrainingCalendar() {
    const localizer = momentLocalizer(moment)
    const [dates2, setDates2] = useState([])

    useEffect(() => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert("Something went wrong fething the trainings data")
                }
            })
            .then(responseData => setDates2(responseData))
    }, [])

    console.log(dates2[5]?.date)

    const [dates, setDates] = useState([{
        id: 0,
        title: "ei toimiXD",
        start: new Date("2022-11-20T05:01:51.668+00:00"),
        end: new Date(2022, 11, 21, 19, 30)
    }
    ])

    return (
        <>
            <div className="trainingwrapper">
                <div className="myCustomHeight" style={{ height: 800 }}>
                    <Calendar
                        localizer={localizer}
                        events={dates}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </div>
            </div>
        </>
    )
}

export default TrainingCalendar;