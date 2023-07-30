import { gql, useQuery } from "urql"
import { useState } from 'react'

const Query = gql`
query {
    pages(first: 1000, where: {orderby: {order: ASC, field: MENU_ORDER}}) {
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
                    }
                }
            }
        }
    }
}
`

export default function Contents() {

    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const [ result ] = useQuery({ 
        query: Query
    })

    const { data, fetching, error } = result

    if ( fetching ) return <div className="w-1/4 px-2"><h2 className="text-xl font-bold mb-4 mt-4">Loading...</h2></div>
    if ( error ) return <p>mmmm.... Something went wrong</p>

    return (
    <div className="w-full md:w-1/4 px-2 ">
        <h2 className="text-xl font-bold mb-4 mt-4" onClick={() => setShowMobileMenu(!showMobileMenu)}>Menu</h2>
        {window.innerWidth < 768 ? 
        showMobileMenu ? (
        <ul className="w-full md:col-start-2 md:col-end-6 h-auto">
            <li className="bg-blue-200 dark:bg-blue-700 mb-2 p-2 hover:bg-blue-400 hover:cursor-pointer rounded-md">
                <a href={`/`} >Home</a>
            </li>
            {data.pages.edges.filter(page => {
                return (
                    page.node.parent === null
                )
            }).map(page => {
                return (
                    <li className="bg-blue-200 dark:bg-blue-700 mb-2 p-2 hover:bg-blue-400 hover:cursor-pointer rounded-md">
                        <a href={`${page.node.uri}`} >{page.node.title}</a>
                    </li>
                )
            })}
        </ul>
        ) : null
        :
        <ul className="w-full md:col-start-2 md:col-end-6 ">
            <li className="w-full bg-blue-200 dark:bg-blue-700 mb-2 p-2 hover:bg-blue-400 hover:cursor-pointer rounded-md">
                <a href={`/`} >Home</a>
            </li>
            {data.pages.edges.filter(page => {
                return (
                    page.node.parent === null
                )
            }).map(page => {
                return (
                    <li key={page.node.id} className="w-full bg-blue-200 dark:bg-blue-900 mb-2 p-2 hover:bg-blue-400 hover:cursor-pointer rounded-md">
                        <a href={`${page.node.uri}`} >{page.node.title}</a>
                    </li>
                )
            })}
        </ul>
        }
    </div>
    )
}
