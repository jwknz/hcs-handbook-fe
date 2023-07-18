import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { gql, useQuery } from "urql"

import { useSearchQuery } from "../states/useSearchQuery"
import SearchBar from "../components/SearchBar"

const TQuery = gql`
  query($tags: String, $term: String) {
    tags(where: {search: $tags}) {
      edges {
        node {
          pages(where: {search: $term}) {
            edges {
              node {
                id
                title
                guid
                content
              }
            }
          }
        }
      }
    }
  }
`

const PQuery = gql`
  query($term: String) {
  	pages(where: {search: $term}) {
      edges {
        node {
          id
          title
          guid
          content
        }
      }
    }
  }
`

export default function Staff() {

  const [searchParams, setSearchParams] = useSearchParams({});
  const myQuery = useSearchQuery((state) => state.query)

  const [qtags] = useState("") //setQtags
  const [edge, setEdge] = useState([])

  const [ result ] = useQuery({ 
    query: qtags === "" ? PQuery : TQuery,
    variables: qtags === "" ? { tags: qtags, term: myQuery } : { term: myQuery },
  })

  useEffect(() => {

    console.log(window.location.pathname)

    const params = new URLSearchParams(window.location.pathname);

    console.log(params)

    if (result.fetching === false) {  
      const { data, fetching, error } = result
  
      if ( fetching ) return <div>Loading...</div>
      if ( error ) return <p>mmmm.... Something went wrong</p>

      //<div>Error {error.message}</div>
      
      const { edges } = qtags === "" ? data.pages : data.tags.edges[0].node.pages
      
      setEdge(edges)
    } else {
      setEdge([]) 
    }

  }, [result])

  const searchResults = (string, keyword, num) => {
    var regex = /(<([^>]+)>)/ig
    
    const lower_string = string.toLowerCase().replace(regex, "")
    const lower_keyword = keyword.toLowerCase().replace(regex, "")
  
    // const allParts = lower_string.split(lower_keyword)
  
    // if (num < allParts.length - 1 ) {
  
    //   const start = allParts[num].slice(-100)
    //   const end = allParts[num + 1].slice(0, 100)
  
    //   return [start, keyword, end]
    // } 
  }

  return (
    <div className="w-full grid grid-cols-6">
      <SearchBar />
      <ul className="w-full px-2 md:col-start-2 md:col-end-6">
        {edge.length > 0 ? (
          edge.map((e, i) => {
            const item = e.node
            const description = searchResults(item.content, myQuery, i)

            console.log(description)
          })
        ) : (
          <p>No Results</p>
        )}
      </ul>
    </div>
  )
}
