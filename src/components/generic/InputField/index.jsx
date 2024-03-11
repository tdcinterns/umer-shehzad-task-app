import React from 'react';

import { TextField } from '@mui/material';

const index = (prop) => {
    return (
        <TextField
            fullWidth
            disabled
            id={prop.id}
            name={prop.name}
            label={prop.label}
            variant={prop.variant}
            color={prop.color}
            value={prop.value}
            onChange={prop.onChange}
            onBlur={prop.onBlur}
            error={prop.error}
            helperText={prop.helperText}
        />
    )
}

export default index
