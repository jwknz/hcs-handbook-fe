import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'

import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import Contents from "../components/Contents";

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
      <div className="absolute top-16 w-full">
        <div className="flex flex-col md:flex-row bg-slate-200 dark:bg-blue-950 dark:text-white">        
          <Contents />
          <div className="space-y-6 flex flex-col items-center justify-start w-screen min-h-screen max-h-full bg-white dark:bg-blue-900 pt-8 px-0 md:px-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
