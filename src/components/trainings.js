import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from "@mui/material/Button";

function Trainings() {

    const [trainings, setTrainings] = useState([])

    const getTrainings = () => {
      fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => setTrainings(responseData))
    }

    const deleteTraining = (data) => {
      if(window.confirm("Are you sure you want to delete the training?")) {
        fetch("https://customerrest.herokuapp.com/api/trainings/" + data.id, {method : "DELETE"})
        .then(response => {
          if (response.ok) {
            getTrainings()
          } else {
            alert("Something went wrong!")
          }
        })
        .catch(err => console.log(err))
      }
    }

    const [columnDefs] = useState([
        {field : "date", 
        cellRenderer: (data) => {
          return (new Date(data.value)).toLocaleDateString("fi-FI") + " " + new Date(data.value).toLocaleTimeString()
        }, sortable: true, filter: true},
        {field : "duration", sortable: true, filter: true},
        {field : "activity", sortable: true, filter: true},
        {field : "customer.firstname", headerName: "First Name", sortable: true, filter: true},
        {field : "customer.lastname", headerName: "Last Name", sortable: true, filter: true},
        {
          cellRenderer: params => <Button size="small" color="error" onClick={() => deleteTraining(params.data)}>Delete training</Button>,
          headerName: "Delete Training"
        },
    ])

    useEffect(() => {
      getTrainings()
  }, [])

    return (
        <div className="ag-theme-material trainings" style={{height: 500, width: "80%"}}>
          <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}>
          </AgGridReact>
        </div>
      );
}

export default Trainings