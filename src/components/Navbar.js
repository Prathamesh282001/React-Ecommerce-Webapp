import React from 'react'
import { showCartContext } from '../App'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const {count} = React.useContext(showCartContext)

    function showCart(){
        navigate("/cart")
      }

  return (
    <header class="header">
		<h1 class="logo"><a href="#">E-commerce</a></h1>
      <ul class="main-nav">
          <li><a href="#">About</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Demo</a></li>
          <li><a href="#">Help</a></li>
          <li><i class="fa badge" style={{fontSize:"24px",cursor:"pointer"}} 
                value={count} onClick={showCart}>&#xf07a;
              </i>
            </li>
      </ul>
	  </header> 
  )
}

export default Navbar