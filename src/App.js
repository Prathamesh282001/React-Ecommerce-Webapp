import React from 'react'
import Product from './components/Product'
import Upper from './components/Upper'
import Cardcontent from './components/Cardcontent'
import { BrowserRouter, Routes , Route ,Link} from 'react-router-dom'
import Checkout from './components/checkout'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
//import useLocalStorage from "react-use-localstorage"


export const showCartContext = React.createContext()
export const subtotalContext = React.createContext()


function App() {
  const [products, setProduct] = React.useState([])
  const [count, setCount] = React.useState(0)
  //const [cartItem, setCartItem] = React.useState([])

  var subTotal = 0 

  //----------------------------------------------------------------localstorage section------------------------------------------------------------------

  const [cartItem, setCartItem] = React.useState(JSON.parse(localStorage.getItem("cartItem")))
  
  //const [products, setProduct] = React.useState([JSON.parse([localStorage.getItem("productApi")])])
  //const [count, setCount] = React.useState(JSON.parse(localStorage.getItem("cartItem")))


  React.useEffect(()=>{
      localStorage.setItem("cartItem",JSON.stringify(cartItem));
  },[cartItem])

  /*
  React.useEffect(()=>{
    localStorage.setItem("cartCount",Number(count))
  })

  React.useEffect(()=>{
      localStorage.setItem("productApi",JSON.stringify(products));
  },[products])
  */

  //-----------------------------------------------------------------------fetching product api (fakestoreapi.com)------------------------------------------------------------------------------

  React.useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
    .then(res => res.json())
    .then(data => setProduct(data.map( item => {
        return({
          id:item.id,
          title:item.title,
          price:item.price,
          image:item.image,
          inCart:false
    })
    }
    ))) 
  },[])
    
  //----------------------------------------------------------------------adds item to cart-----------------------------------------------------------------------

  const addToCartHandle = (id) => {
      products.forEach((r) =>{          
      // eslint-disable-next-line no-unused-expressions
          if(r.id === id)  r.inCart=true            
          setCartItem((prev) =>[ ...prev, {
            id:r.id,
            title:r.title,
            price:r.price,
            image:r.image,
            cartQuantity:1            
          }]); 
      });

          setProduct([...products]);
          setCount((prevCount)=> prevCount + 1)
      }

  //-----------------------------------------------------------------------updates quantity in cart----------------------------------------------------------------

  const incQuantity = (id) => {
    cartItem.forEach((r) =>{
      // eslint-disable-next-line no-unused-expressions
      if(r.id === id) r.cartQuantity=r.cartQuantity+1
      
    
    });
  setCartItem([...cartItem])
      
  }

  const decQuantity = (id) => {
    cartItem.forEach((r) =>{
      // eslint-disable-next-line no-unused-expressions
      if(r.id === id && r.cartQuantity > 1) r.cartQuantity=r.cartQuantity - 1
      //r.price -= r.price
  });
  setCartItem([...cartItem])
  }

  //-----------------------------------------------------------------------removes item from cart-----------------------------------------------------------

  function removeItemFromCart(id){
    const items = cartItem.filter(item => item.id !== id)
    setCartItem([...items])
    setCount((prevCount)=> prevCount - 1)
    products.forEach((r) =>{              
      // eslint-disable-next-line no-unused-expressions
      if(r.id === id)  r.inCart=false})
  }

  //-----------------------------------------------------------------------component / props / --------------------------------------------------------------------

  const productsCard = products.map(item =>{
  return(
    <Product 
          key={item.id}
          addToCartHandle={addToCartHandle}
          {...item}
        />
    )
  }) 


  const cardContent = cartItem.map(item => {
    subTotal += item.price*item.cartQuantity
    return(
      <Cardcontent 
          key={item.id}
          {...item}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
          subTotal={subTotal} 
          removeItemFromCart={removeItemFromCart}
          />
    )
  })

  //----------------------------------------------------------total / subtotal (html) section in cart-------------------------------------------------------------------
  const subtotal = subTotal
  const gst = 18

  const total = 
                <div id='roott'>
                  <div style={{marginTop:"10px",marginLeft:"10px"}} class="brand-title">Summary</div>
                    <table style={{width:"100%"}}>
                        <thead>
                            <tr>
                                <th>Subtotal</th>
                                <td>${subtotal}</td>
                            </tr>
                            <tr>
                                <th>Gst</th>
                                <td>$18</td>
                            </tr>
                            <tr>
                                <th>Grand Total</th>
                                <td className="text-end fw-bold">${subTotal+gst}</td>
                            </tr>
                        </thead>
                            
                    </table>
                    <Link to="/cart/checkout"><button className='check-btn' style={{cursor:"pointer",marginTop:"15px",borderRadius:"5px"}}>Checkout</button></Link>
                  </div>

  //---------------------------------------------------------------------cart (html) summary in checkout page--------------------------------------------------------------
  const cart = 
                <div>
                  <div style={{marginTop:"100px"}} class="brand-title">Order Summary</div>
                  <table>
                      <thead>
                          <tr>
                              <th width="50%">Product</th>
                              <th>Price</th>
                              <th>Qty</th>
                              <th>Total</th>
                          </tr>
                      </thead>
                      <tbody>
                          {cartItem.map( (item, idx) => {
                              
                              return (
                                  <tr key={idx}>
                                      <td>{item.title}</td>
                                      <td>{item.price}</td>
                                      <td>{item.cartQuantity}</td>
                                      <td>{item.price * item.cartQuantity}</td>
                                  </tr>
                              )
                          })}
                          <tr>
                              <td colSpan="2" className="text-end fw-bold">Grand Total</td>
                              <td className="text-end fw-bold"></td>
                              <td colSpan="2" className="text-end fw-bold">{subTotal}</td>
                          </tr>
                      </tbody>
                  </table>
                </div>

  //-----------------------------------------------------------------------return-----------------------------------------------------------------------                        
  
  return (
    <div>      
      <showCartContext.Provider value={{count}}>
      <subtotalContext.Provider value={{subTotal}}>
      <BrowserRouter>
        <Routes>          
            <Route exact path='/' element={<><Navbar /><Upper /> {productsCard}<Footer /> </>}></Route>            
            <Route exact path='cart' element={<><h1 style={{color: "#1DA1F2",padding:"20px"}}>Cart Item(s)</h1>
                                                          {cartItem.length > 0 ?
                                                          cardContent : <h1 style={{color: "white",padding:"100px"}}>Your cart is empty</h1>
              }
                                                          {total}                                                          
                                                          </>}>                                              
            </Route>
            <Route exact path='/cart/checkout' element={<> {cart}<Checkout /> </>}></Route>
        </Routes>
      </BrowserRouter>
      </subtotalContext.Provider>
      </showCartContext.Provider>    
    </div>
  )
}

export default App
