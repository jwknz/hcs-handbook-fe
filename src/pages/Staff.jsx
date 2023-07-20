import SearchBar from "../components/SearchBar"
import StaffResults from "../components/StaffResults"

export default function StaffSearch() {
  return (
    <div className="w-full lg:w-2/3 px-4 lg:px-0">
      <div className="flex flex-row">
        <img src="/hcs-logo.png" className="w-16" />
        <SearchBar />
      </div>
      <StaffResults />
    </div>
  )
}
