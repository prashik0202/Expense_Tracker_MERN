import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

export default function Spinner() {
  return (
        <div className='loadingSpinnerContainer'>
            <div className='loadingSpinner'>
                {/* <CircularProgress color='success'/> */}
                <LinearProgress color="primary" />
                <LinearProgress color="success" />
                <LinearProgress color="warning" />
                <LinearProgress color="warning" />
                <LinearProgress color="success" />
                <LinearProgress color="primary" />
            </div>
        </div>
    )
}
