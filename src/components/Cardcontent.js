import React from 'react'
const Cardcontent = (props) => {


  return(
  <>
    <div className = "cart">      
      <img className = "cart-prod-img" src = {props.image} alt="Product"/>
      <h1 className = "cart-prod-title">{props.title}</h1>
      <h1 className = "cart-prod-price">${props.price*props.cartQuantity}</h1>
      <button onClick ={()=>props.incQuantity(props.id)} style={{width:"30px",height:"5vh",borderRadius:"10px",fontSize:"20px"}}>+</button>
      <h1 style={{color:"white",fontSize:"25px"}}>{props.cartQuantity}</h1>
      <button onClick ={()=>props.decQuantity(props.id)} style={{width:"30px",height:"5vh",borderRadius:"10px",fontSize:"20px"}}>-</button>
      <small style={{fontSize:"14px",color:"whitesmoke",marginLeft:"180px",marginTop:"200px",position:"absolute"}}><b style={{fontSize:"14px",color:"whitesmoke"}}>Rating:</b> 3.9/5</small>

      <button style={{backgroundColor:"Red",
                      padding:"10px",
                      marginLeft:"380px",
                      marginTop:"120px",
                      width:"100px",
                      border:"none",
                      cursor:"pointer",
                      color:"white"}}                     
        onClick={()=>props.removeItemFromCart(props.id)}>Remove</button>
    </div>          
  </>    
  )
}

export default Cardcontent