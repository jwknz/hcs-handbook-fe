import { useEffect, useState } from "react"
import { gql, useQuery } from "urql"
import sanitizeHtml from 'sanitize-html';

import { useSearchQuery } from "../states/useSearchQuery"

const Query = gql`
  query($term: String) {
  	pages(where: {search: $term, tag: "public"}) {
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
        
        let cleanContent = sanitizeHtml(string, {
          allowedTags: ['p'],
          allowedAttributes: {
            p: ['class'],
          }
        });

        const i = cleanContent.indexOf(keyword)

        // const start = cleanContent.from(i, -100)
        // const end = cleanContent.from(i, 100)

        const start = ""
        const end = ""
    
        return [start, keyword, end]

        // return cleanContent
    }
    
    if ( fetching ) return <div>Loading...</div>
    if ( error ) return <p>mmmm.... Something went wrong</p>

    return (
        <ul className="w-full px-2 md:col-start-2 md:col-end-6">
        {results.length > 0 ? (
          results.map((e, i) => {

            const item = e.node
            const description = searchResults(item.content, myQuery, i)

            //console.log(description)

            return (
                description !== undefined ? (
                    <li key={item.id} className="border-2 border-sky-900 dark:border-rose-500  rounded-lg my-2 hover:bg-blue-300 hover:cursor-pointer w-full" >
                        <a href={`/content?id=${item.id}`} className="text-blue-400 dark:text-white hover:text-red-500 text-lg font-bold">
                          <h2 className="p-2 hover:text-black">{item.title}</h2>
                        </a>
                        {/* <span className="text-black dark:text-white" dangerouslySetInnerHTML={{__html: description}} /> */}
                        {/* <span className="text-black dark:text-white" dangerouslySetInnerHTML={{__html: description[0]}} />
                        <span className="text-black dark:text-white bg-yellow-400 dark:bg-orange-500 p-0.5" dangerouslySetInnerHTML={{__html: description[1]}} />
                        <span className="text-black dark:text-white" dangerouslySetInnerHTML={{__html: description[2]}} /> */}
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