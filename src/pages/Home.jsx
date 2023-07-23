import SearchBar from "../components/SearchBar"

export default function Home() {

  return (
    <div className="flex flex-col w-full h-64 items-center px-0 md:px-12">
      <img src="/hcs-logo.png" className="w-48 mb-4" />
      <SearchBar />
    </div>
  )
}
