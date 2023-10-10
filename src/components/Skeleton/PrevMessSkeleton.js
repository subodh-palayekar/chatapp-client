import { Skeleton } from '@mui/material'
import React from 'react'

const PrevMessSkeleton = () => {
  return (
   
    <div className='prev-message' >
        <div className="prev-icon">
            <Skeleton variant="circular" width={50} height={50} />
        </div>
        <div className="prev-details">
            <div className="prev-name">
                <Skeleton variant="text" width={150} />
            </div>
            <div className="prev-latest-message">
                <Skeleton variant="text" width={250} />
            </div>
        </div>
    </div>                        
  )
}

export default PrevMessSkeleton
