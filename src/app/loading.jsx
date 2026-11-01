import React from 'react'

const LoadingPage = () => {
  return (
    <div className='flex items-center h-[85vh] justify-center gap-2'>
        <h2 className='font-bold'>Global Loading</h2>
        <span className="loading loading-infinity loading-xl"></span>
    </div>
  )
}

export default LoadingPage;