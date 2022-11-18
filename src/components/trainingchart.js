import React, { PureComponent, useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import _ from 'lodash';

function TrainingChart() {

    const [trainings, setTrainings] = useState([])

    useEffect(() => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert("Something went wrong fething the trainings data")
                }
            })
            .then(responseData => setTrainings(responseData))
    }, [])

    const categories = _.groupBy(trainings, "activity")
    let arrayCategories = []
    let arrayMinutes = []

    _.forEach(categories, function (value, i) {
        arrayCategories.push(i)
        arrayMinutes.push(_.sumBy(value, "duration"))
    });

    const events = arrayCategories.map((training, i) =>
        training =
        {
            name: arrayCategories[i],
            duration: arrayMinutes[i]
        }
    );

    return (
        <>
            <div className="trainingwrapper">
                <ResponsiveContainer width="80%" height={300}>
                    <BarChart width={600} height={300} data={events}>
                        <Bar dataKey="duration" fill="#8884d8" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <YAxis label="Minutes" />
                        <Tooltip />
                        <Legend />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default TrainingChart;