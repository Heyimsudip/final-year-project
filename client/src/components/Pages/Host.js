import React, { useContext, useEffect, useState } from 'react'
import {UserContext} from "../../context/index"
import PriceCard from '../Cards/PriceCard';
import axios from 'axios';

function Host({history}) {
    const [state, setState] = useContext(UserContext);
    const [prices, setPrices] = useState([]);
    const [userSubscriptions, setUserSubacriptions] = useState([])

    useEffect(() => {
      fetchPrices();
    },[]);

    useEffect(() => {
      let result = []
        const check = () => 
            state && 
            state.user && 
            state.user.subscriptions 
            && state.user.subscriptions.map((sub) => {
            result.push(sub.plan.id);
        });
        check();
        setUserSubacriptions(result)
    }, [state && state.user])

    const fetchPrices = async () => {
      const {data} = await axios.get("/prices");
      console.log('prices get request', data)
      setPrices(data);
    }

    console.log('STATE =>', state)

    const handleClick = async (e, price) => {
      e.preventDefault();
      if(userSubscriptions && userSubscriptions.includes(price.id)){
        history.push(`/${price.nickname.toLowerCase()}`);
        return;
    }
      // console.log('plan clicked' , price.id);
      if(state && state.token){
        const {data} = await axios.post('/create-subscription', {
          priceId: price.id,
        })
        window.open(data);
      }else{
        history.push("/register")
      }
    }
  return (
      <div style={{
        minHeight: "100vh"
    }}><div className=" container-fluid p-5 text-center">
     <h1 className='text-center fw-bold text-warning' style={{
       fontSize: "60px"
     }}>Subscription</h1>
    </div><div className='row row-cols-1 mb-3 text-center' style={{
         maxWidth: "1068px",
         margin: 'auto',
      }}>
        {prices && prices.map((price) => <PriceCard key={price.id}
          price={price}
          handleSubscription={handleClick}
          userSubscriptions={userSubscriptions} />)}
      </div></div>
  )
}

export default Host