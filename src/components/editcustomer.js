import * as React from 'react';
import { useState } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Edit } from '@mui/icons-material';

function EditCustomer(props) {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: props.data.firstname,
        lastname: props.data.lastname,
        email: props.data.email,
        phone: props.data.phone,
        streetaddress: props.data.streetaddress,
        postcode: props.data.postcode,
        city: props.data.city
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.editCustomer(customer, props.data.links[0].href)
    }

    return (
        <div>
          <Button startIcon={<Edit />} size="small" onClick={handleClickOpen}>
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Car</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="First Name"
                fullWidth
                variant="standard"
                value={customer.firstname}
                onChange={e => setCustomer({...customer, firstname : e.target.value})}
              />
              <TextField
                margin="dense"
                label="Last Name"
                fullWidth
                variant="standard"
                value={customer.lastname}
                onChange={e => setCustomer({...customer, lastname : e.target.value})}
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                variant="standard"
                value={customer.email}
                onChange={e => setCustomer({...customer, email : e.target.value})}
              />
              <TextField
                margin="dense"
                label="Street Address"
                fullWidth
                variant="standard"
                value={customer.streetaddress}
                onChange={e => setCustomer({...customer, streetaddress : e.target.value})}
              />
              <TextField
                margin="dense"
                label="Phone Number"
                fullWidth
                variant="standard"
                value={customer.phone}
                onChange={e => setCustomer({...customer, phone : e.target.value})}
              />
              <TextField
                margin="dense"
                label="Post Code"
                fullWidth
                variant="standard"
                value={customer.postcode}
                onChange={e => setCustomer({...customer, postcode : e.target.value})}
              />
              <TextField
                margin="dense"
                label="City"
                fullWidth
                variant="standard"
                value={customer.city}
                onChange={e => setCustomer({...customer, city : e.target.value})}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default EditCustomer