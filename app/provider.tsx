"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useUser } from '@clerk/nextjs';
import { UserDetailsContext } from '@/context/userDetailContext';


export type UserDetailsType = {
  name: string,
  email: string,
  credits: number
}


export function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = useUser()
  const [userDetail, setUserDetail] = useState<any>(undefined)
  useEffect(() => {
    user && createNewUser()
  }, [user])

  const createNewUser = async () => {
    const result = await axios.post("/api/users")
    console.log(result.data)
    setUserDetail(result.data)
  }
  return <div>
    <UserDetailsContext.Provider value={{ userDetail, setUserDetail }}></UserDetailsContext.Provider>
    {children}</div>
}