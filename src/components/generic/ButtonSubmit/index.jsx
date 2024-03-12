import React from 'react';

import { Button } from "@mui/material";

import CONSTANT from '../../../constants/constant';

const index = (prop) => {
    return (
        <>
            <Button
                disabled={prop.disabled}
                color={CONSTANT.color.base}
                variant="contained"
                type="submit"
                onClick={prop.onClick}
                sx={{
                    width: {
                        xs: '140px',
                        sm: '150px',
                    },
                    height: {
                        xs: '37px',
                        sm: '50px',
                    },
                }}
            >
                {prop.name}
            </Button>
        </>
    )
}

export default index
