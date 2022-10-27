import React, { useEffect, useState } from 'react'
import {Card, Avatar, Badge} from "antd"
import moment from 'moment'
import { useSelector } from 'react-redux'
import {isAuth} from '../Auth/helpers'
import { getAccountBalance, payoutSetting } from '../action/stripe'
import { currencyFormatter } from '../action/auth'
import {SettingOutlined} from "@ant-design/icons"
import {toast} from 'react-toastify'

const {Meta} = Card
const {Ribbon} = Badge

function ConnectNav() {
    const [loading, setLoading] = useState(false)
    const {auth} = useSelector((state) => ({...state}))
    const {user, token} = auth;
    const [balance, setBalance] = useState(0);

    useEffect(() =>{
      getAccountBalance(auth.token)
      .then(res => {
        // console.log(res)
        setBalance(res.data)
      })
    }, [])

    const handlePayoutSettings = async () => {
      setLoading(true)
      try {
        const res = await payoutSetting(token)
        // console.log('RES FOR PAYOUT SETTING LINK', res)
        window.location.href = res.data.url
        setLoading(false);
      } catch (err) {
        console.log(err)
        setLoading(false)
        toast.error('Unable to access setting. Try again',
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
      }
    }

  return (
    <div className='d-flex justify-content-around'>
        <Card>
            <Meta 
            avatar={<Avatar>{user.name[0]}</Avatar>} 
            title={isAuth().name} 
            description={`Joined ${moment(user.createdAt).fromNow()}`}/>
        </Card>
        {auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && (
          <>
            <Ribbon text="Avaliable" color="grey">
              <Card className='bg-light pt-1'>
                {balance && 
                balance.pending &&
                balance.pending.map((bp, i) => (
                  <span key={i} className="lead">
                    {currencyFormatter(bp)}
                  </span>
                ))}
              </Card>
            </Ribbon>
            <Ribbon text="Payouts" color="grey" >
              <Card onClick={handlePayoutSettings} className="bg-light pe-auto" style={{
              cursor: "pointer"
            }}>
                  <SettingOutlined className='h5 pt-2' />
              </Card>
            </Ribbon>
          </>
        )}
    </div>
  )
}

export default ConnectNav