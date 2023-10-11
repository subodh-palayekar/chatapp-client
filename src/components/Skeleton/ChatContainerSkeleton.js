import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import SelfMessageSkeleton from './SelfMessageSkeleton';
import OtherMessageSkeleton from './OtherMessageSkeleton';

const ChatContainerSkeleton = () => {
    return (
        <div className="chats">
            <SelfMessageSkeleton/>
            <OtherMessageSkeleton/>
            <SelfMessageSkeleton/>
            <OtherMessageSkeleton/>
            <SelfMessageSkeleton/>
            <SelfMessageSkeleton/>
        </div>
    );
};

export default ChatContainerSkeleton;
