// export default useBackButton = () => {

//     const [isBack, setIsBack] = useState(false);

//     const handleEvent = () => {
//       setIsBack(true);
//     };
  
//     useEffect(() => {
    
//         console.log("Testing 123")

//         window.addEventListener("popstate", handleEvent);
//         return () => window.removeEventListener("popstate", handleEvent);
        
//     });
  
//     return isBack;

// };