import SearchBar from "../components/SearchBar"
import Results from "../components/Results"

export default function Search() {
  return (
    <div className="w-2/3">
      <div className="flex flex-row">
        <img src="./hcs-logo.png" className="w-16" />
        <SearchBar />
      </div>
      <Results />
    </div>
  )
}
