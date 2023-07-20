import { createElement, useEffect, useState } from "react"
import { useSearchParams, useLocation, Link } from "react-router-dom"
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

    const location = useLocation()

    useEffect(() => {

        setPid(searchParams.get('id'))
    
        const loadData = () => {
    
          const { data, fetching, error } = result
    
          if ( fetching ) console.log("STILL LOADING.....")
          if ( error ) console.log("SOMETHING WENT WRONG.....")
    
          if (data !== undefined) {

            const cleanTitle = sanitizeHtml(data.page.title, {
              allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2', 'header'],
              allowedAttributes: {
                a: ['href', 'target', 'rel'],
                h1: ['class'],
                h2: ['class']
              }
            });
      
            let cleanContent = sanitizeHtml(data.page.content, {
              allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'img', 'br', 'h1', 'h2', 'ul', 'li', 'table', 'tr', 'td', 'th', 'thead', 'tbody'],
              allowedAttributes: {
                a: ['href', 'target', 'rel'],
                h1: ['class'],
                h2: ['class']
              }
            });

            // format title
            const title = `<h1 class="entry-title text-black dark:text-slate-200 text-4xl">${cleanTitle}</h1>`

            //format tags

            const h1 = '<h1 class="entry-title">';
            const h1_styled = '<h1 class="entry-title text-black dark:text-slate-200 text-3xl font-bold">';
            const h1_new = cleanContent.split(h1).join(h1_styled)

            const h2 = '<h2 class="wp-block-heading">';
            const h2_styled = '<h2 class="wp-block-heading text-red-800 dark:text-yellow-200 text-3xl font-bold mb-8 mt-8">';
            const h2_new = h1_new.split(h2).join(h2_styled)

            const li = '<li>';
            const li_styled = '<li class="text-black dark:text-slate-200 text-xl mb-2">';
            const li_new = h2_new.split(li).join(li_styled)

            const table = '<table>';
            const table_styled = '<table class="mb-6">';
            const table_new = li_new.split(table).join(table_styled)

            const td = '<td>';
            const td_styled = '<td class="text-black dark:text-slate-200 text-xl mb-2 pl-6">';
            const td_new = table_new.split(td).join(td_styled)

            const p = '<p>';
            const p_styled = '<p class="text-black dark:text-slate-200 text-xl mb-6">';
            const p_new = td_new.split(p).join(p_styled)

            setPageContent({title: title, content: p_new})
          }
    
        }
    
        loadData()
    
      }, [result])

    return (
      <div className="w-full p-2 md:col-start-2 md:col-end-6 space-y-8">
          <Link to={`${location.pathname}${location.search}`} rel='noopener noreferrer' className="text-xl font-bold text-blue-800 dark:text-yellow-200 mb-8">Share this page (Right click and copy link)</Link>
          <h1 dangerouslySetInnerHTML={{__html: pageContent.title}} />
          <div dangerouslySetInnerHTML={{__html: pageContent.content}} />
      </div>
    )
}
