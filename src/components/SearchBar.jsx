import { useState, useEffect, cloneElement } from "react"
import { NavLink, Form, useNavigate, useSearchParams } from "react-router-dom"

import { useSearchQuery } from "../states/useSearchQuery"

export default function SearchBar() {

  const [query, setQuery] = useState("")
  const [route, setRoute] = useState()

  const myQuery = useSearchQuery((state) => state.query)
  const addQuery = useSearchQuery((state) => state.savedQuery)

  const navigate = useNavigate()

  useEffect(() => {

    setRoute(window.location.pathname)

    if (window.location.pathname === "/") {
      addQuery("")
    } else {
      setQuery(myQuery)
    }

  }, []) 

  const handleSubmit = (event) => {

    if (event.key === 'Enter') {

      addQuery(query)

      // if (myQuery === "") {
      //   navigate({
      //     pathname: "/"
      //   })
      // } else {
      //   navigate({
      //     pathname: "/search"
      //   })
      // }

      navigate({
        pathname: "/search",
        search: "public"
      })

    }

  }

  const handleClickSubmit = (event) => {

    addQuery(query)

    // if (myQuery === "") {
    //   navigate({
    //     pathname: "/"
    //   })
    // } else {
    //   navigate({
    //     pathname: "/search"
    //   })
    // }

    navigate({
      pathname: "/search",
      search: "q=public"
    })

  }

  return (
    <>
    {route === "/" ? (
      <Form className="flex flex-col items-center rounded-lg px-1 w-full sm:w-full">
        <input tabIndex={0} onKeyDown={handleSubmit} className="my-2 p-2 border-rose-500 border-2 rounded-lg w-full" placeholder="search..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="flex justify-between space-x-4">
          <NavLink to="/Search?q=public" className="text-center border-2 bg-sky-300 border-sky-900 dark:bg-blue-500 dark:text-white dark:border-rose-500 rounded-lg p-2 my-2" onClick={handleClickSubmit} type="button">Search Whānau Handbook</NavLink>
          {/* <NavLink to="/Search?q=staff" className="text-center border-2 bg-sky-300 border-sky-900 dark:bg-blue-500 dark:text-white dark:border-rose-500 rounded-lg p-2 my-2" onClick={handleClickSubmit} type="button">Search Staff Handbook</NavLink> */}
          {/* <NavLink to="/Search?q=student" className="text-center border-2 bg-sky-300 border-sky-900 dark:bg-blue-500 dark:text-white dark:border-rose-500 rounded-lg p-2 my-2" onClick={handleClickSubmit} type="button">Search Student Handbook</NavLink> */}
        </div>
      </Form>
    ) : (
      <Form className="flex flex-row items-center rounded-lg px-1 w-full space-x-4">
        <input tabIndex={0} onKeyDown={handleSubmit} className="my-2 p-2 border-rose-500 border-2 rounded-lg w-full" placeholder="search..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="flex justify-between space-x-4">
          <button className="border-2 bg-slate-300 dark:bg-slate-700 border-blue-900 rounded-lg py-2 px-3 h-11 my-2 text-sm" onClick={handleClickSubmit} type="button">Search</button>
        </div>
      </Form>
    )}
    </>
  )
}
