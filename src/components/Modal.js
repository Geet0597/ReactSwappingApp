import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, TextField, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddModal = (props) => {
    const { onClose, openModal, addCard } = props;
    const [title, setTitle] = React.useState('');

    const handleClose = () => {
        onClose(false);
    };

    return (
        <Dialog onClose={handleClose} open={openModal}>
            <CloseIcon style={{ padding: '15px', cursor: 'pointer', left: '85%', position: 'relative' }} onClick={handleClose} />
            <DialogTitle style={{ width: '350px', justifyContent: 'center', display: 'flex', paddingTop: '0px' }}>Add Task</DialogTitle>
            <TextField
                label="Add Title"
                variant="outlined"
                onChange={(e) => setTitle(+e.target.value)}
                style={{ width: '350px', margin: '0 auto', backgroundColor: '#EEEEFF', marginBottom: '30px' }}
                helperText='Please insert only numbers'
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': { border: 'none' },
                    },
                }}
            />
            <Button
                onClick={() => { title && addCard(title); handleClose() }}
                style={{ backgroundColor: '#EEEEFF', color: 'black', width: '100px', marginBottom: '30px', marginLeft: '25px' }}
            >
                Add Task
            </Button>
        </Dialog>
    );
}

export default AddModal;