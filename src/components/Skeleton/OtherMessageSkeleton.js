import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const OtherMessageSkeleton = () => {
    return (
        <div className='otherMessage-container'>
            <Skeleton variant="rectangular" width={120} height={16} style={{ marginBottom: '4px' }} />
            <Skeleton variant="rectangular" width={120} height={16} style={{ marginBottom: '4px' }} />
            <Skeleton variant="rectangular" width={50} height={12}/>
        </div>
    );
};

export default OtherMessageSkeleton;
