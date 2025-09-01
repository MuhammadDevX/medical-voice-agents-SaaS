'use client'
import Image from 'next/image'
import { useState } from 'react'
import AddNewSessionDialog from './AddNewSessionDialog'
function HistoryList() {
  const [historyList, setHistoryList] = useState([])
  return (
    <div className='mt-10'>
      {historyList.length === 0 ?
        <div className='flex items-center flex-col justify-center gap-3 p-7 border-dashed rounded-2xl'>
          <Image src={'/medical-assistance.png'} alt='empty' height={150} width={150} />
          <h2 className='font-bold text-xl'>No Recent Consultations</h2>
          <p>It looks like you haven't consulted with any doctors yet.</p>
          <AddNewSessionDialog />
        </div> : <div>List</div>}
    </div>
  )
}

export default HistoryList