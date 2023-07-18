import SearchBar from "../components/SearchBar"
import Content from "../components/Content"

export default function ContentPage() {
  return (
    <div className="w-2/3">
      <div className="flex flex-row">
        <img src="./hcs-logo.png" className="w-16" />
        <SearchBar />
      </div>
      <Content />
    </div>
  )
}
