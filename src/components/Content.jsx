import { createElement, useEffect, useState } from "react"
import { useSearchParams, useLocation, Link } from "react-router-dom"
import { gql, useQuery } from "urql"
import sanitizeHtml from 'sanitize-html';

import { useSearchQuery } from "../states/useSearchQuery"

const PQuery = gql`
query PAGES_SELECTED($name: String) {
  pages(where: {name: $name}) {
    edges {
      node {
        id
        title
        content
        uri
      }
    }
  }
}
`

export default function Content() {

    const [pid, setPid] = useState("")
    const [pageContent, setPageContent] = useState({})
    const [searchParams, setSearchParams] = useSearchParams({});

    const myQuery = useSearchQuery((state) => state.query)

    const [ result ] = useQuery({ 
        query: PQuery,
        variables: {name: pid},
    })

    const location = useLocation()

    useEffect(() => {

        const cleanPath = location.pathname.replace(/[^a-zA-Z0-9- ]/g, '')

        setPid(cleanPath)

        const loadData = () => {

          const { data, fetching, error } = result

          if ( fetching ) console.log("STILL LOADING.....")
          if ( error ) console.log("SOMETHING WENT WRONG.....")

          if (data !== undefined) {

            console.log(data)

            const cleanTitle = sanitizeHtml(data.pages.edges[0].node.title, {
              allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2', 'header'],
              allowedAttributes: {
                a: ['href', 'target', 'rel', 'class'],
                h1: ['class'],
                h2: ['class']
              }
            });

            let cleanContent = sanitizeHtml(data.pages.edges[0].node.content, {
              allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'img', 'br', 'h1', 'h2', 'ul', 'li', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'iframe', 'div'],
              allowedAttributes: {
                a: ['href', 'target', 'rel', 'class'],
                button: ['class'],
                h1: ['class'],
                h2: ['class'],
                p: ['class'],
                ul: ['class'],
                li: ['class'],
                div: ['class'],
                iframe: ['class', 'width', 'height', 'src', 'frameborder'],
                img: ['src', 'class', 'width', 'alt'],
                tr: ['colspan', 'rowspan']
              }
            });

            // format title
            const title = `<h1 class="entry-title text-black dark:text-slate-200 text-4xl">${cleanTitle}</h1>`

            //format tags

            const h1 = '<h1 class="entry-title">';
            const h1_styled = '<h1 class="entry-title text-black dark:text-slate-200 text-3xl font-bold">';
            const h1_new = cleanContent.split(h1).join(h1_styled)

            const h2 = '<h2 class="wp-block-heading">';
            const h2_styled = '<h2 class="wp-block-heading text-red-800 dark:text-blue-200 text-3xl font-bold mb-4 mt-8">';
            const h2_new = h1_new.split(h2).join(h2_styled)

            const ul = '<ul>';
            const ul_styled = '<ul class="list-disc mb-12 ml-6">';
            const ul_new = h2_new.split(ul).join(ul_styled)

            const li = '<li>';
            const li_styled = '<li class="text-black dark:text-slate-200 text-lg">';
            const li_new = ul_new.split(li).join(li_styled)

            const iframe = '<iframe>';
            const iframe_styled = '<iframe class="w-full h-64">';
            const iframe_new = li_new.split(iframe).join(iframe_styled)

            const table = '<table>';
            const table_styled = '<table class="mb-6 w-full">';
            const table_new = iframe_new.split(table).join(table_styled)

            const th = '<th>';
            const th_styled = '<th class="text-left pl-2 font-bold text-lg border border-collapse border-1 border-gray-200 bg-gray-300 p-1">';
            const th_new = table_new.split(th).join(th_styled)

            const td = '<td>';
            const td_styled = '<td class="text-left pr-2 text-black dark:text-slate-200 text-md mb-2 pl-6 border border-collapse border-1 border-gray-200">';
            const td_new = th_new.split(td).join(td_styled)

            const a = '<a>';
            const a_styled = '<a class="text-red-400 dark:text-slate-200 text-lg mb-6">';
            const a_new = td_new.split(a).join(a_styled)

            const p = '<p>';
            const p_styled = '<p class="text-black dark:text-slate-200 text-lg mb-6">';
            const p_new = a_new.split(p).join(p_styled)

            // const words = p_new.split(`"`)
            // let words_new = []

            // for(let w of words) {

            //   if (w.toLowerCase().includes(myQuery.toLowerCase()) && myQuery !== "") {              
            //     words_new.push(`<span>${w}</span> `) 
            //   } else {
            //     words_new.push(`${w} `) 
            //   }

            // }

            // console.log(words_new.join(""))

            setPageContent({title: title, content: p_new})
          }
    
        }
    
        loadData()
        
      }, [result])

    return (
      <div className="w-full p-2 md:col-start-2 md:col-end-6 space-y-8">
          <Link to={`${location.pathname}${location.search}`} rel='noopener noreferrer' className="text-md md:text-xl font-bold text-blue-800 dark:text-red-500 mb-8">Share this page (Right click and copy link)</Link>
          <h1 dangerouslySetInnerHTML={{__html: pageContent.title}} />
          <div dangerouslySetInnerHTML={{__html: pageContent.content}} />
      </div>
    )
}
