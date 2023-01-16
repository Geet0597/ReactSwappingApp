import React from "react";
import {
    FormControl,
    InputAdornment,
    TextField
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from './searchField.module.scss';

const SearchField = ({ findData }) => {
    const { field } = styles;

    const handleChange = event => {
        findData(event.target.value);
    };

    return (
        <FormControl >
            <TextField
                size="small"
                variant="outlined"
                onChange={handleChange}
                className={field}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': { border: 'none' },
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment
                            position="end"
                        >
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </FormControl>
    );
};

export default SearchField;
