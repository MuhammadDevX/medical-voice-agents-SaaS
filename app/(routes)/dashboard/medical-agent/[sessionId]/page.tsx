'use client'
import axios from "axios";
import { Circle } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  // propName: string
}

type SessionDetail = {
  id: number,
  notes: string,
  sessionId: string,
  report: JSON,
  selectedDoctor: any,
  createdOn: string
}


const MedicalVoiceAgent: React.FC<Props> = (props) => {
  const { sessionId } = useParams()
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  useEffect(() => {
    sessionId && GetSessionDetails()
  }, [sessionId])

  const GetSessionDetails = async () => {
    const result = await axios.get(
      `/api/session-chat?sessionId=${sessionId}`
    )
    console.log(result.data)
    setSessionDetail(result.data)
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center"><Circle className="h-4 w-4" /> Not Connected</h2>
        <h2 className="font-bold text-gray-400">00:00</h2>
      </div>
      <div>
        <Image src={sessionDetail?.selectedDoctor?.image
        } alt={sessionDetail?.selectedDoctor?.specialist} height={80} width={80} className="rounded" />
      </div>
    </div>
  );
};

export default MedicalVoiceAgent;