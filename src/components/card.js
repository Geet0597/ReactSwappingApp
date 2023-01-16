import * as React from 'react';
import { Box, Button, Card } from '@mui/material';
import styles from './card.module.scss';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const CardComponent = ({ card, index, moveCards, deleteCard, showPrevBtn, showNextBtn }) => {

    const { cardStyle, deleteBtn, topBox, btnBox, prevBtn, nextBtn, nextBtnBox } = styles;
    return (
        <Card className={cardStyle}>
            <Box className={topBox}>
                <h6>{card.label}</h6>
                <Button startIcon={<DeleteOutlinedIcon />} className={deleteBtn} onClick={() => deleteCard(card, index)}>Delete</Button>
            </Box>
            <Box className={showPrevBtn(card.parentId) ? btnBox : nextBtnBox}>
                {showPrevBtn(card.parentId) && <Button className={prevBtn} onClick={() => moveCards('prev', card, index)}>{<ArrowCircleLeftOutlinedIcon />}</Button>}
                {showNextBtn(card.parentId) && <Button className={nextBtn} onClick={() => moveCards('next', card, index)}>{<ArrowCircleRightOutlinedIcon />}</Button>}
            </Box>
        </Card>
    );
}

export default CardComponent;