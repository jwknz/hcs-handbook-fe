// const Temp = () => {
//     return (
//         <ul className="w-full px-2 md:w-7/12">
//         {edge.map((e, i) => {

//           if (edge.length > 0) {

//             const item = e.node
//             const description = searchResults(item.content, qterm, i)


//             console.log(description)
//             console.log(item.content)

//             return (
//               <li key={item.id} className="border-2 border-sky-900 rounded-lg p-2 my-2 hover:bg-sky-300 hover:cursor-pointer w-full" >
//                 <a href={`${item.guid}&keyword=${qterm}`} style={{fontSize: "1rem", fontWeight: "bold", color: "#60a5fa"}} target="_blank" rel="noreferrer">
//                   <h2 style={{paddingBottom: "10px"}}>{item.title}</h2>
//                 </a>
//                 {/* <span style={{color: "black"}}>{description[0]}</span>
//                 <span style={{color: "black", backgroundColor: "yellow", paddingTop: "5px", paddingBottom: "5px"}}>{description[1]}</span>
//                 <span style={{color: "black"}}>{description[2]}</span> */}
//               </li>
//             )
            
//           } else {
//             <p>No Results</p>
//           }
//         })}
//       </ul>
//     )
// }