import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchField from './searchField';
import styles from './mainLayout.module.scss';
import CardComponent from './card';
import AddModal from './Modal';

const MainLayout = () => {
    const initialData = [
        {
            id: 1,
            label: 'STEP 1',
            cards: [
                {
                    id: 1,
                    parentId: 1,
                    label: 1,
                },
                {
                    id: 2,
                    parentId: 1,
                    label: 2,
                }
            ]
        },
        {
            id: 2,
            label: 'STEP 2',
            cards: [
                {
                    id: 3,
                    parentId: 2,
                    label: 3,
                },
                {
                    id: 4,
                    parentId: 2,
                    label: 4,
                }
            ]
        },
        {
            id: 3,
            label: 'STEP 3',
            cards: [
                {
                    id: 5,
                    parentId: 3,
                    label: 5,
                },
                {
                    id: 6,
                    parentId: 3,
                    label: 6,
                }
            ]
        },
        {
            id: 4,
            label: 'STEP 4',
            cards: [
                {
                    id: 7,
                    parentId: 4,
                    label: 7,
                },
                {
                    id: 8,
                    parentId: 4,
                    label: 8,
                }
            ]
        },
    ]
    const { topContainer, mainGrid, stepPaper, addBtn, stepLabel, stepContainer } = styles;
    const [data, setData] = React.useState(initialData);
    const [showErrorMsg, setShowErrorMsg] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);

    const addCard = (value) => {
        const newData = [...data];
        const section = newData.find(data => data.label === 'STEP 1');
        let array = [];
        for (let value of newData) {
            for (let first of value.cards) {
                if (first.label !== undefined) {
                    array.push(first);
                }
            }
        }
        const nextValue = Math.max.apply(Math, array.map(obj => obj.label));
        const cardToAdd = {
            id: nextValue + 1,
            parentId: 1,
            label: value
        }
        section.cards.push(cardToAdd);
        setData(newData);
    }

    const moveCards = (operation, card, index) => {
        const newData = [...data];
        if (operation === 'next') {
            const currentStep = newData.findIndex(data => data.id === card.parentId);
            newData[currentStep].cards.splice(index, 1);
            card.parentId = card.parentId + 1;
            newData[currentStep + 1].cards.push(card);
            setData(newData);
        } else {
            const currentStep = newData.findIndex(data => data.id === card.parentId);
            newData[currentStep].cards.splice(index, 1);
            card.parentId = card.parentId - 1;
            newData[currentStep - 1].cards.push(card);
            setData(newData);
        }
    }

    const deleteCard = (card, index) => {
        const newData = [...data];
        let array = [];
        for (let value of newData) {
            for (let first of value.cards) {
                if (first.label !== undefined) {
                    array.push(first);
                }
            }
        }
        const parentIndex = newData.findIndex(data => data.id === card.parentId);
        array.splice(index, 1);
        newData[parentIndex].cards.splice(index, 1);
        setData(newData);
    }

    const findData = (value) => {
        if (value) {
            const newData = [...data];
            let array = [];
            for (let value of newData) {
                for (let first of value.cards) {
                    if (first.label !== undefined) {
                        array.push(first);
                    }
                }
            }
            const searchedData = array.find(data => data.id === +value || data.label === +value);
            if (searchedData) {
                newData.map(data => data.cards = []);
                const parentData = newData.find(data => data.id === searchedData.parentId);
                const index = newData.findIndex(data => data.id === searchedData.parentId);
                parentData.cards = [searchedData];
                newData[index] = newData.find(data => data.id === searchedData.parentId);
                setData(newData);
                setShowErrorMsg(false);
            } else {
                setData(initialData);
                setShowErrorMsg(true);
            }
        } else {
            setData(initialData);
            setShowErrorMsg(false);
        }
    }

    const showPrevBtn = (id) => data.findIndex(data => data.id === id) !== 0;

    const showNextBtn = (id) => data.findIndex(data => data.id === id) + 1 !== data.length;;

    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12} className={mainGrid}>
                <Box className={topContainer}>
                    <SearchField findData={findData} />
                    <Button startIcon={<AddIcon />} onClick={() => setOpenModal(true)} className={addBtn}>Add Task</Button>
                </Box>
                {showErrorMsg && <h1>No Such data found</h1>}
                <Grid container justifyContent="center" spacing={2} className={stepContainer}>
                    {data.map((value) => (
                        <Grid key={value.id} item>
                            <Paper className={stepPaper}>
                                <span className={stepLabel}>{value.label}</span>
                                {value.cards.map((card, index) =>
                                    <CardComponent
                                        key={index}
                                        card={card}
                                        data={data}
                                        index={index}
                                        moveCards={moveCards}
                                        deleteCard={deleteCard}
                                        showPrevBtn={showPrevBtn}
                                        showNextBtn={showNextBtn}
                                    />
                                )}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <AddModal openModal={openModal} onClose={() => setOpenModal(false)} addCard={addCard} />
        </Grid>
    );
}

export default MainLayout;