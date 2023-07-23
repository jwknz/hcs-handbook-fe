import { Outlet } from "react-router-dom";

export default function ContentsLayout() {

  return (
    <>
        <div className="space-y-6 flex flex-col justify-start w-screen min-h-screen max-h-ful pt-8 px-0 md:px-4">
            <Outlet />
        </div>
    </>
  )
}