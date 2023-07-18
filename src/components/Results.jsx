import { useEffect, useState } from "react"
import { gql, useQuery } from "urql"

import { useSearchQuery } from "../states/useSearchQuery"
import { BiUnderline } from "react-icons/bi"

const Query = gql`
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

export default function Results() {

    const [results, setResults] = useState([])

    const myQuery = useSearchQuery((state) => state.query)

    const [ result ] = useQuery({ 
        query: Query,
        variables: { term: myQuery },
    })

    const { data, fetching, error } = result

    useEffect(() => {

        if (myQuery !== "") {
            if ( data !== undefined ) setResults(data.pages.edges)
        } else {
            []
        }

    }, [data])

    const searchResults = (string, keyword, num) => {
        var regex = /(<([^>]+)>)/ig
        
        const lower_string = string.toLowerCase().replace(regex, "")
        const lower_keyword = keyword.toLowerCase().replace(regex, "")

        const clean_string = lower_string.replace("&nbsp;", "")
        const clean_keywords = lower_keyword.replace("&nbsp;", "")

        const allParts = clean_string.split(lower_keyword)

        if (num < allParts.length - 1 ) {
      
          const start = allParts[num].slice(-100)
          const end = allParts[num + 1].slice(0, 100)
      
          return [start, clean_keywords, end]
        } 
    }
    
    if ( fetching ) return <div>Loading...</div>
    if ( error ) return <p>mmmm.... Something went wrong</p>

    return (
        <ul className="w-full px-2 md:col-start-2 md:col-end-6">
        {results.length > 0 ? (
          results.map((e, i) => {

            const item = e.node
            const description = searchResults(item.content, myQuery, i)

            console.log(description)

            return (
                description !== undefined ? (
                    <li key={item.id} className="border-2 border-sky-900 rounded-lg p-2 my-2 hover:bg-sky-100 hover:cursor-pointer w-full" >
                        <a href={`${import.meta.env.VITE_FE_URL}/content?id=${item.id}`} style={{fontSize: "1rem", fontWeight: "bold", color: "#60a5fa"}}>
                        <h2 style={{paddingBottom: "10px"}}>{item.title}</h2>
                        </a>
                        <span style={{color: "black"}}>{description[0]}</span>
                        <span style={{color: "black", backgroundColor: "yellow", paddingTop: "5px", paddingBottom: "5px", paddingRight: "5px", paddingLeft: "5px"}}>{description[1]}</span>
                        <span style={{color: "black"}}>{description[2]}</span>
                    </li>
                ) : ( 
                    <div key={item.id}></div>
                )
            )
          })
        ) : (
          myQuery === "" ? <p></p> : <p>No Results</p>
        )}
      </ul>
    )
}

/*



*/