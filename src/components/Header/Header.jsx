import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
// import { ClassNames } from '@emotion/react';

const Header = () => {
    return (
        <>
            <h1>Header</h1>
            <AppBar position="static">
            {/* <Toolbar className={classes.toolbar}>
                <Typography variant="h5" classes={classes.title}>
                    Santander Cycle Companian
                </Typography>
            </Toolbar> */}
            </AppBar>
        </>
    );
}

export default Header;