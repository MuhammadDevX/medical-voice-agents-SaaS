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
interface Props {
  // propName: string
}

const AddNewSessionDialog: React.FC<Props> = (props) => {
  const [note, setNote] = useState<string>("")
  return (
    <Dialog>
      <DialogTrigger><Button>+ Start a consultation</Button></DialogTrigger>
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
          <Button>Next <ArrowRight /></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
};

export default AddNewSessionDialog;