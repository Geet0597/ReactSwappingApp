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
            <Box style={{ display: 'flex' }}>
                <DialogTitle style={{ width: '350px' }}>Add Task</DialogTitle>
                <CloseIcon style={{ padding: '15px', cursor: 'pointer' }} onClick={handleClose} />
            </Box>
            <TextField
                label="Add Title"
                variant="outlined"
                onChange={(e) => setTitle(+e.target.value)}
                style={{ width: '300px', margin: '0 auto', backgroundColor: '#EEEEFF', marginBottom: '30px' }}
                helperText='Please insert only numbers'
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': { border: 'none' },
                    },
                }}
            />
            <Button
                onClick={() => { title && addCard(title); handleClose() }}
                style={{ backgroundColor: '#EEEEFF', color: 'black', width: '100px', margin: '0 auto', marginBottom: '30px' }}
            >
                Add Task
            </Button>
        </Dialog>
    );
}

export default AddModal;