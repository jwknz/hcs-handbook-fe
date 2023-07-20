import SearchBar from "../components/SearchBar"

export default function Home() {

  return (
    <div className="w-full">
      <div className="flex flex-col w-full h-64 items-center">
        <img src="/hcs-logo.png" className="w-48 mb-4" />
        <SearchBar />
      </div>
    </div>
  )
}
