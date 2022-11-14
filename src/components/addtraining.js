import React from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useState } from "react"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers';

function AddTraining(props) {

    const [training, setTraining] = useState({
        date: "",
        duration: "",
        activity: "",
        customer: props.data.links[0].href
    })
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training)
        setOpen(false)
    }

    const setDate = (date) => {
        setTraining({...training, date : date});
    }

    return (
        <>
            <Button startIcon={<DirectionsRunIcon />} size="small" onClick={handleClickOpen}>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training to customer</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Set Date For Customer"
                            value={training.date}
                            onChange={(newValue) => {
                                setDate(newValue)
                            }}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Activity"
                        fullWidth
                        variant="standard"
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddTraining