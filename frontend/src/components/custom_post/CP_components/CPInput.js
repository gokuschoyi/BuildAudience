import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'

const CPInput = (props) => {
    const { label, value, onChange, options, name } = props;
    return (
        <FormControl size="small" required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id={`${label}`}>{label}</InputLabel>
            <Select
                labelId={`${label}`}
                id={`${label}`}
                value={value}
                label={label}
                onChange={onChange}
                name={name}
            >
                
                {options.map((category, index) => {
                    return (
                        <MenuItem key={index} value={category}>{category}</MenuItem>
                    )
                })}
            </Select>
            <FormHelperText>Required</FormHelperText>
        </FormControl>
    )
}

export default CPInput