'use client'
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Circle, PhoneCall } from "lucide-react";
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
    <div className="p-10 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center"><Circle className="h-4 w-4" /> Not Connected</h2>
        <h2 className="font-bold text-gray-400">00:00</h2>
      </div>
      <div className="flex items-center flex-col">
        <Image src={sessionDetail?.selectedDoctor?.image
        } alt={sessionDetail?.selectedDoctor?.specialist} height={120} width={120} className="object-cover h-[100px] w-[100px] rounded-full" />
        <h2 className="mt-2 text-lg">{sessionDetail?.selectedDoctor?.specialist}</h2>
        <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

        <div className="mt-32">
          <h2 className="text-gray-400">Assitant Msg</h2>
          <h2 className="text-lg">User Msg</h2>
        </div>

        <Button className="mt-20"> <PhoneCall /> Start Call</Button>
      </div>
    </div>
  );
};

export default MedicalVoiceAgent;