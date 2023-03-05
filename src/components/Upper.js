import React from 'react'

const Upper = () => {
  
  return (    
    <div style={{
        backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.7),rgba(0.7, 0.7, 0.7, 0.7),black),url(' + require('../header3.jpeg') + ')',
        height:"50vh",
        backgroundSize:"cover",
        backgroundPosition:"center",    
    }}>
      <h1 className='head-title'>Ready to use <br></br>E-commerce <br></br>Website</h1>        
    </div>
  )
}

export default Upper



