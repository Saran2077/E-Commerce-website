import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const AddressDialog = ({ open, onClose, onSave }) => {
  const [streetName, setStreetName] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    const address = {
      streetName,
      country,
      state,
      zipCode,
      name,
      phoneNo
    };
    onSave(address);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Shipping Address</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Street Name"
          type="text"
          fullWidth
          value={streetName}
          onChange={(e) => setStreetName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Country"
          type="text"
          fullWidth
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <TextField
          margin="dense"
          label="State"
          type="text"
          fullWidth
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Zip Code"
          type="text"
          fullWidth
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          type="tel"
          fullWidth
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressDialog;
