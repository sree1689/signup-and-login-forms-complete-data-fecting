import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const Sample = () => {
    const [data, setData] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Confirmation dialog state
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newFirstname, setNewFirstname] = useState('');
    const [newLastname, setNewLastname] = useState('');
    const [itemToDelete, setItemToDelete] = useState(null); // Item to delete

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:3001/api/signup')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    };

    const handleDelete = (id) => {
        setItemToDelete(id); // Set the item to delete
        setOpenConfirmDialog(true); // Show confirmation dialog
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:3001/api/signup/${itemToDelete}`)
            .then(() => {
                setOpenConfirmDialog(false);
                fetchData();
            })
            .catch(error => {
                console.error('There was an error deleting the item!', error);
            });
    };

    const handleEditClick = (item) => {
        setEditItem(item);
        setNewUsername(item.username);
        setNewEmail(item.email);
        setNewFirstname(item.firstname);
        setNewLastname(item.lastname);
        setOpenDialog(true);
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:3001/api/signup/${editItem._id}`, {
            username: newUsername,
            email: newEmail,
            firstname: newFirstname,
            lastname: newLastname
        })
        .then(() => {
            setOpenDialog(false);
            fetchData();
        })
        .catch(error => {
            console.error('There was an error updating the item!', error);
        });
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Serial Number</TableCell>
                            <TableCell align="center">Firstname</TableCell>
                            <TableCell align="center">Lastname</TableCell>
                            <TableCell align="center">Username</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={item._id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{item.firstname}</TableCell>
                                <TableCell align="center">{item.lastname}</TableCell>
                                <TableCell align="center">{item.username}</TableCell>
                                <TableCell align="center">{item.email}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => handleEditClick(item)} color="primary">Edit</Button>
                                    <Button onClick={() => handleDelete(item._id)} color="secondary">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Firstname"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newFirstname}
                        onChange={(e) => setNewFirstname(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Lastname"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newLastname}
                        onChange={(e) => setNewLastname(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary">Update</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this item?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={confirmDelete} color="secondary">Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Sample;
