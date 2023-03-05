import React from 'react'
import {Link} from 'react-router-dom'

const Product = (props) => {
    const inCart = props.inCart
    
  return (
    <>
    <div className = "cart">      
        <img className = "product-img" src = {props.image} alt="Product"/>
        <h1 className = "product-title">{props.title}</h1>
        <h1 className = "product-price"><small><b style={{fontSize:"14px"}}>Price:</b> ${props.price}  <b style={{fontSize:"14px"}}>Rate:</b> 3.9/5</small></h1>
        <div className='card-cart-btn'>
                    { inCart ?
                    <Link to="/cardcontent"><button className='prod-cart-btn'>
                        <i class="fa-solid fa-cart-shopping" style={{marginRight:"10px"}}>
                            </i>Go to cart</button></Link> 
                            :
                    <button className='prod-cart-btn' onClick={() => props.addToCartHandle(props.id)}>
                        <i class="fa-solid fa-cart-shopping" style={{marginRight:"10px"}}>
                            </i>Add to cart</button>

                    }   
        </div>
    </div>
</>

  )
}

export default Product
