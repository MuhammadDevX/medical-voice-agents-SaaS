'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import DoctorAgentCard, { DoctorAgentType } from "./DoctorAgentCard";
interface Props {
  // propName: string
}

const AddNewSessionDialog: React.FC<Props> = (props) => {
  const [note, setNote] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [suggestedDoctors, setSuggestedDoctors] = useState<DoctorAgentType[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorAgentType>()

  const router = useRouter()

  const OnClickNext = async () => {
    setLoading(true)
    const result = await axios.post("/api/suggest-doctors", {
      notes: note
    })
    console.log(result.data)
    setSuggestedDoctors(result.data)
    setLoading(false)
  }

  const onStartConsultation = async () => {
    setLoading(true)

    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor: selectedDoctor
    })

    console.log(result.data)
    if (result.data?.sessionId) {
      console.log(result.data.sessionId)
    }

    setLoading(false)
    router.push("/dashboard/medical-agent/" + result.data.sessionId)
  }

  return (
    <Dialog>
      <DialogTrigger><Button>+ Start a consultation</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>

            {suggestedDoctors?.length === 0 ?
              <div>
                <h2>Add Symptoms or any other details</h2>
                <Textarea placeholder="Add Detail here" className="h-[200px] mt-1"
                  value={note}
                  onChange={(e) => { setNote(e.target.value) }} />
              </div>
              : <div className="grid grid-cols-2 gap-5">
                {/* //Suggested Doctors */}
                {suggestedDoctors.map((doctor, index) => {
                  return <SuggestedDoctorCard key={index} doctorAgent={doctor} setSelectedDoctor={setSelectedDoctor} selectedDoctor={selectedDoctor} />
                })}
              </div>}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={'outline'}>
              Cancel
            </Button>
          </DialogClose>
          {suggestedDoctors.length === 0 ?
            <Button disabled={loading} onClick={() => OnClickNext()}>{loading && <Loader2 className="animate-spin" />} Next <ArrowRight /></Button>
            :
            <Button onClick={() => onStartConsultation()} disabled={!note || loading}>Start Conversation {loading && <Loader2 className="animate-spin" />}</Button>
          }
        </DialogFooter>
      </DialogContent>


    </Dialog >
  );
};

export default AddNewSessionDialog;