import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { CiLight } from "react-icons/ci"
import { BiMoon } from "react-icons/bi"
import { WiMoonAltThirdQuarter } from "react-icons/wi"

export default function TopNavBar() {

    const [isOpen, setIsOpen] = useState(false)
    const [themeLabel, setThemeLabel] = useState("")

    const selectTheme = () => {

        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setThemeLabel("Dark")
          } else {
            document.documentElement.classList.remove('dark')
            setThemeLabel("Light")
        }

    }

    const setLightTheme = () => {
        localStorage.theme = 'light'
        setThemeLabel("Light")
        window.location.reload()
        setIsOpen(false)
    }

    const setDarkTheme = () => {
        localStorage.theme = 'dark'
        setThemeLabel("Dark")
        window.location.reload()
        setIsOpen(false)
    }

    const setSystemDefault = () => {
        localStorage.removeItem('theme')
        setThemeLabel("Default")
        window.location.reload()
        setIsOpen(false)
    }

    useEffect(() => {

        selectTheme()

    }, [themeLabel]) 

  return (
    <>
        <div className="w-full h-24 px-2 py-6 bg-blue-900 dark:bg-blue-950 absolute top-0 flex flex-row items-center justify-between" >
            <div className="space-x-4 flex flex-row items-center -mt-4">
                <img src="/hcs-logo.png" className="w-12 mb-4" />
                <NavLink to="/"><h1 className="h-12 text-white dark:text-white text-lg font-light">Hoogle</h1></NavLink>
                {/* <a href="#" className="rounded-md bg-blue-200 p-1">HCS Web</a> */}
                {/* <a href="#" className="rounded-md bg-blue-200 p-1">HCS Web</a> */}
            </div>
            <div className="space-x-2 justify-end flex -mt-8">
                {/* <a href="#" className="rounded-md bg-slate-100 dark:bg-slate-700 text-black dark:text-white p-2">Staff Login</a> */}
                <button onClick={() => setIsOpen(prev => !prev)} className="rounded-md bg-slate-100 dark:bg-slate-700 hover:bg-slate-400 dark:text-white p-2 w-16 flex justify-center">{themeLabel}</button>
            </div>
        </div>
        <div className="absolute top-16 w-full h-auto flex justify-end px-2 py-1 ">
            {isOpen && (
                <div className="w-auto flex flex-col space-y-2 z-10">
                    <button onClick={setLightTheme} className="rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-400 dark:text-white p-2 w-20 flex justify-center">
                        <p className="flex flex-row">
                            Light
                            <CiLight className="text-xl pt-1" />
                        </p>
                    </button>
                    <button onClick={setDarkTheme} className="rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-400 dark:text-white p-2 w-20 flex justify-center">
                        <p className="flex flex-row">
                            Dark
                            <BiMoon className="text-xl pt-1" />
                        </p>
                    </button>
                    <button onClick={setSystemDefault} className="rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-400 dark:text-white p-2 w-20 flex justify-center">
                        <p className="flex flex-row">
                            Default
                            <WiMoonAltThirdQuarter className="text-xl pt-1" />
                        </p>
                    </button>
                </div>
            )}
        </div>
    </>
  )
}
