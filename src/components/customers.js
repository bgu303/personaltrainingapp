import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import AddCustomer from "./addcustomer";
import EditCustomer from "./editcustomer";
import DeleteIcon from '@mui/icons-material/Delete';
import AddTraining from "./addtraining";
import 'react-big-calendar/lib/css/react-big-calendar.css';

function Customers() {
  const [users, setUsers] = useState([])
  const gridRef = useRef();

  const getUsers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(responseData => setUsers(responseData.content))
      .catch(err => console.log(err))
  }

  const addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(customer)
    })
      .then(response => {
        if (response.ok) {
          getUsers();
        } else {
          alert("Something went wrong adding a customer!")
        }
      })
      .catch(err => console.log(err))
  }

  const editCustomer = (car, url) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(car)
    })
      .then(response => {
        if (response.ok) {
          getUsers();
        }
      })
      .catch(err => console.log(err))
  }

  const deleteCustomer = (data) => {
    if (window.confirm("Are you sure you want to delete the customer?")) {
      fetch(data.links[0].href, { method: "DELETE" })
        .then(response => {
          if (response.ok) {
            getUsers();
          }
        })
        .catch(err => console.log(err))
    }
  }

  const addTraining = (training) => {
    console.log(training)
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training)
    })
      .then(response => {
        if (response.ok) {
          getUsers()
        } else {
          alert("Something went wrong adding training!")
        }
      })
      .catch(err => console.log(err))
  }

  const [columnDefs] = useState([
    { field: "firstname", sortable: true, filter: true, width: 130 },
    { field: "lastname", sortable: true, filter: true, width: 130 },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true, width: 120 },
    { field: "city", sortable: true, filter: true, width: 120 },
    { field: "email", sortable: true, filter: true, width: 180 },
    { field: "phone", sortable: true, filter: true, width: 150 },
    {
      cellRenderer: params => <AddTraining
      data={params.data}
      addTraining={addTraining} />,
      headerName: "Add Training",
      width: 150
    },
    {
      cellRenderer: params => <EditCustomer data={params.data} editCustomer={editCustomer} />,
      headerName: "Edit Customer",
      width: 150
    },
    {
      cellRenderer: params => <Button size="small" color="error" startIcon={<DeleteIcon />}
      onClick={() => deleteCustomer(params.data)}></Button>,
      headerName: "Delete Customer"
    }
  ])

  const exportCsv = () => {
    var params = {
      columnKeys: ["firstname", "lastname", "streetaddress", "postcode", "city", "email", "phone"],
      fileName: "customers"
    }
    gridRef.current.api.exportDataAsCsv(params);
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className="addnexport">
        <div className="addnexportbuttondiv">
          <AddCustomer addCustomer={addCustomer} />
        </div>
        <div className="addnexportbuttondiv">
          <Button variant="outlined" onClick={exportCsv}>Export customers CSV</Button>
        </div>
      </div>
      <div className="ag-theme-material" style={{ height: 500, width: "90%", margin: "auto" }}>
        <AgGridReact
          ref={gridRef}
          rowData={users}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </>
  );
}

export default Customers;