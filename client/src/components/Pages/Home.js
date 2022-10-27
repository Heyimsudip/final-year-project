import React from 'react'
import { InfoDataTwo } from '../SliderData/InfoData'
import { SliderData } from '../SliderData/SliderData'
import HomePage from './HomePage'
import InfoSection from './InfoSection'

function Home() {
  return (
    <div>
        <HomePage slides={SliderData} />
        <InfoSection {...InfoDataTwo}/>
    </div>
  )
}

export default Home