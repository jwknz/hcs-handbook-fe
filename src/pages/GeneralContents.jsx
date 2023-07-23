import { useEffect, useState } from "react"
import { gql, useQuery } from "urql"

const Query = gql`
  query {
  pages(first: 1000, where: {orderby: {order: ASC, field: MENU_ORDER}} ) {
    edges {
      node {
        id
        title
        guid
        menuOrder
        slug
        uri
        parent {
          node {
            id
            uri
          }
        }
      }
    }
  }
}
`

export default function GeneralContents() {

    const [ result ] = useQuery({ 
        query: Query
    })

    const { data, fetching, error } = result

    if ( fetching ) return <div className="w-1/4 px-2"><h2 className="text-xl font-bold mb-4 mt-4">Menu</h2></div>
    if ( error ) return <p>mmmm.... Something went wrong</p>

    return (
        <div className="w-full md:w-1/2 px-2">
            <ul className="w-full md:col-start-2 md:col-end-6 h-auto">
            {data.pages.edges.filter(page => {
                console.log(page)
                return (
                    page.node.parent !== null &&
                    page.node.parent.node.uri === "/general-information/"
                )
            }).map(page => {
                return (
                    <li key={page.node.id} className="text-black dark:text-white bg-blue-200 dark:bg-blue-700 mb-2 p-2 hover:bg-blue-400 hover:cursor-pointer rounded-md">
                        <a href={`/content?id=${page.node.id}`} >{page.node.title}</a>
                    </li>
                )
            })}
        </ul>
        </div>
    )
}
