import React, { useContext } from 'react'
import { UserContext } from "../../context/index"

function PriceCard({price, handleSubscription, userSubscriptions}) {

  const [state, setState] = useContext(UserContext);

  const buttonText = () => {
    return state && state.token ? "Buy the plan" : "Sign up"
  }
  return (
              <div className='d-flex justify-content-center align-items-center'>
                <div className='card mb-4 rounded-3 shadow-sm border-danger w-50'>
                    <div className='card-header py-3 bg-danger text-light'>
                      <h4 className='my-0 fw-normal text-white'>{price.nickname}</h4>
                    </div>

                    <div className='card-body'>
                      <h1 className='card-title'>
                      {(price.unit_amount / 100).toLocaleString("en-US",{
                                        style: 'currency',
                                        currency: "USD",
                                    })}{" "}  <small className="text-muted font-weight-light">/mo</small>
                      </h1>
                      <ul className='list-unstyled mt-3 mb-4'>
                        <li className='font-weight-bold'>Post your rooms to find perfect customer</li>
                        <li>Easy Navaigation and usages of application</li>
                        <li>Email Support</li>
                        <li>Help center access</li>
                      </ul>

                      <button className='w-100 btn btn-lg btn-danger' onClick={(e) => handleSubscription(e,price)}>
                      {userSubscriptions && userSubscriptions.includes(price.id) ? 'Access plan' : buttonText()}
                      </button>
                    </div>
                </div>
              </div>
  )
}

export default PriceCard