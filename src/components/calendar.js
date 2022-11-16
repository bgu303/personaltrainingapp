import React, { useEffect, useState } from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

function TrainingCalendar() {
    const localizer = momentLocalizer(moment)
    const [dates, setDates] = useState([])

    useEffect(() => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert("Something went wrong fething the trainings data")
                }
            })
            .then(responseData => setDates(responseData))
    }, [])

    const events = dates.map((training) => 
        training =
        {
          title: training.activity + " / " + training.customer.firstname + " " + training.customer.lastname,
          start: moment(training.date).toDate(),
          end: moment(training.date).add(training.duration, "minutes").toDate(),
        }
    );

    return (
        <>
            <div className="trainingwrapper">
                <div className="myCustomHeight" style={{ height: 800 }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        titleAccessor="title"
                        endAccessor="end"
                    />
                </div>
            </div>
        </>
    )
}

export default TrainingCalendar;