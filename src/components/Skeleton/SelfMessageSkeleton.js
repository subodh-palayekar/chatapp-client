import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SelfMessageSkeleton = () => {
    return (
        <div className='selfMessage-container'>
            <Skeleton variant="text" width={120} height={20} style={{ marginBottom: '4px' }} />
            <Skeleton variant="text" width={50} height={10} className="time" />
        </div>
    );
};

export default SelfMessageSkeleton;
