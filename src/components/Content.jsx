import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { gql, useQuery } from "urql"
import sanitizeHtml from 'sanitize-html';

const PQuery = gql`
  query ($pid: ID!) {
    page(id: $pid) {
      title
      content
    }
  }
`

export default function Content() {

    const [pid, setPid] = useState("")
    const [pageContent, setPageContent] = useState({})
    const [searchParams, setSearchParams] = useSearchParams({});

    const [ result ] = useQuery({ 
        query: PQuery,
        variables: {pid},
    })

    useEffect(() => {

        setPid(searchParams.get('id'))
    
        const loadData = () => {
    
          const { data, fetching, error } = result
    
          if ( fetching ) console.log("STILL LOADING.....")
          if ( error ) console.log("SOMETHING WENT WRONG.....")
    
          if (data !== undefined) {
            const cleanTitle = sanitizeHtml(data.page.title, {
              allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p'],
              allowedAttributes: {
                a: ['href', 'target']
              }
            });
      
            const cleanContent = sanitizeHtml(data.page.content, {
              allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p'],
              allowedAttributes: {
                a: ['href', 'target']
              }
            });
        
            setPageContent({title: cleanTitle, content: cleanContent})
          }
    
        }
    
        loadData()
    
      }, [result])

    return (
        <div className="w-full p-2 md:col-start-2 md:col-end-6 space-y-2">
            <h1 className="text-2xl font-bold">{pageContent.title}</h1>
            <p dangerouslySetInnerHTML={{__html: pageContent.content}} className="space-y-2" />
        </div>
    )
}
