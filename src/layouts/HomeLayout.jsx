import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'

import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";

export default function HomeLayout() {

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {

    if (location.pathname === "/") {
      const queryParams = new URLSearchParams(location.search)
      queryParams.keys().length = 0

      navigate({ 
        pathname: '/', 
        search: null
      });
    }

  }, [location.pathname])

  return (
    <>
      <TopNavBar />
      <div className="absolute top-12">
        <div className="space-y-6 flex flex-col items-center justify-start w-screen h-screen bg-white dark:bg-slate-400 pt-8">
          <Outlet />
        </div>
      </div>
    </>
  )
}
