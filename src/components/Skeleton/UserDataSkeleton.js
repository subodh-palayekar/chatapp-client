import { Skeleton } from '@mui/material'
import React from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';

const UserDataSkeleton = () => {
  return (
    <div className='userdata-container'>
            <div className="userdata-icon">
                <Skeleton variant="circular" width={50} height={50} />
                
            </div>
            <div className="userdata-details">
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={150} height={16} />
            </div>
            <div className="userdata-add-icon">
                <Skeleton variant="circular" width={50} height={50} />
            </div>
        </div>
  )
}

export default UserDataSkeleton
