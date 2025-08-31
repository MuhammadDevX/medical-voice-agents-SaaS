import Image from 'next/image'
import React, { useState } from 'react'
function HistoryList() {
  const [historyList, setHistoryList] = useState([])
  return (
    <div>
      {historyList.length === 0 ? <div>
        <Image src={'medical-assistant.png'} alt='empty' height={150} width={150} />
      </div> : <div>List</div>}
    </div>
  )
}

export default HistoryList