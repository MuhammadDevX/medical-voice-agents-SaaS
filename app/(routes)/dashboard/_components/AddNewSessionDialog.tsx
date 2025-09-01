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
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
interface Props {
  // propName: string
}

const AddNewSessionDialog: React.FC<Props> = (props) => {
  const [note, setNote] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [suggestedDoctors, setSuggestedDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState<any>()

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
      {suggestedDoctors.length === 0 &&
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Basic Details</DialogTitle>
            <DialogDescription asChild>
              <div>
                <h2>Add Symptoms or any other details</h2>
                <Textarea placeholder="Add Detail here" className="h-[200px] mt-1"
                  value={note}
                  onChange={(e) => { setNote(e.target.value) }} />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant={'outline'}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={loading} onClick={() => OnClickNext()}>Next <ArrowRight /></Button>
          </DialogFooter>
        </DialogContent>
      }

      {suggestedDoctors.length != 0 &&
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Suggested Lawyer</DialogTitle>
            <DialogDescription asChild>
              <div className="flex flex-col gap-5">
                <h2 className="font-bold text-xl text-gray-500">Select Lawyers</h2>
                <div className="flex gap-4 w-96 overflow-scroll">
                  {suggestedDoctors.map((doctor, index) => {
                    return <SuggestedDoctorCard
                      key={index} selectedDoctor={selectedDoctor} doctorAgent={doctor}
                      setSelectedDoctor={setSelectedDoctor} />
                  })}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant={'outline'}>
                Back
              </Button>
            </DialogClose>
            <Button onClick={() => onStartConsultation()}>+ Start Consultation <ArrowRight /></Button>
          </DialogFooter>
        </DialogContent>
      }
    </Dialog >
  );
};

export default AddNewSessionDialog;