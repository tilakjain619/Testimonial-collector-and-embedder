import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='px-4 py-2 md:py-0 md:ml-64 mt-2 md:mt-0'>
      <h2 className='mt-4 text-lg text-zinc-300 md:mt-0'>You cancelled the payment. <br/>Something went wrong? Let us know at <Link className='underline' to='#'>demo@demo.com</Link></h2>
    </div>
  )
}

export default Cancel
