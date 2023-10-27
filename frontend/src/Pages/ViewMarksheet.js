import React from 'react'

const ViewMarksheet = () => {
  return (
    <>
        <div className="bg-yellow-100 h-screen">
            <iframe src={`https://digisheild.infura-ipfs.io/ipfs/${localStorage.getItem('path')}`} width="100%" height="100%" />
        </div>
    </>
  )
}

export default ViewMarksheet