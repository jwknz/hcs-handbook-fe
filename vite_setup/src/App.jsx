import { gql, useQuery } from "urql"

const Query = gql`
  query {
    # HERE IS THE QUERY
  }
`

function App() {

  const [ result ] = useQuery({ 
    query: Query,
    variables: {  },
  })

  const { data, fetching, error } = result

  if ( fetching ) return <div>Loading...</div>
  if ( error ) return <div>Error {error.message}</div>

  console.log(data)

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </>
  )
}

export default App
