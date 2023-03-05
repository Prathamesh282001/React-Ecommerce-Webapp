import React, {useState} from 'react';

const Checkout = () => {

    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });
    
    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value });
    }

    var user_info = {
        firstname: checkoutInput.firstname,
        lastname: checkoutInput.lastname,
        phone: checkoutInput.phone,
        email: checkoutInput.email,
        address: checkoutInput.address,
        city: checkoutInput.city,
        state: checkoutInput.state,
        zipcode: checkoutInput.zipcode,
        payment_mode: 'Paid by PayPal',
        payment_id: '',
    }
   
    return (
        <div class="container">
            <div class="brand-logo"></div>
            <div class="brand-title">Basic Information Of {checkoutInput.firstname}</div>
            
            <div class="inputs">
                <label>Firstname</label>
                <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} placeholder="example@test.com" />
                <label>Lastname</label>
                <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} placeholder="Min 6 charaters long" />
                <label>Phone Number</label>
                <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} placeholder="example@test.com" />
                <label>E-mail address</label>
                <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} placeholder="example@test.com" />
                <div className='side' style={{marginLeft:"400px", marginTop:"-390px"}}>
                    <label>Full address</label>
                    <input name="address" onChange={handleInput} value={checkoutInput.address} type="email" placeholder="example@test.com" />
                    <label>City</label>
                    <input name="city" onChange={handleInput} value={checkoutInput.city} type="email" placeholder="example@test.com" />
                    <label>State</label>
                    <input name="state" onChange={handleInput} value={checkoutInput.state} type="email" placeholder="example@test.com" />
                    <label>Zip code</label>
                    <input name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} type="email" placeholder="example@test.com" />
                </div>
                <button className='plc-ord' style={{marginLeft:"190px"}} type="submit">Place order</button>
            </div> 
        </div>
        )
    }       

export default Checkout;
