// Calendar Widget //

//import render Calendar component

import Head from 'next/head'
import Calendar from '../../components/Calendar/Calendar.js'


//use username from GET request, current is just mock data
let username = 'Matt';


export default function calendar () {
//import user state (mentor/mentee)
  return (
    <>
      <Head>
          <title>{`${username}'s Calendar`}</title>
      </Head>
      <Calendar />
    </>
  )
}
