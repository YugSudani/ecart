import { createContext , useState } from "react";
import { useContext } from "react";

const genContext = createContext(null);

const useGenContext=()=>{
    const genCtxt = useContext(genContext);
    return genCtxt;
}

const GenProvider=(props)=>{
    const[prdCT,setPrdCT] = useState(0); // cart item count
    const[total,setTotal] = useState(0); // total payment amount
    const[prds,setPrds] = useState() // product in users cart
    
    // const[order,setOrder] = useState({  // created order
    //     adrs:"",
    //     prds:[],
    //     total:""
    // });

    return (
        <genContext.Provider value={{prdCT,setPrdCT,total,setTotal,prds,setPrds}}>
                {props.children}
        </genContext.Provider>  
    )
}

export{useGenContext,GenProvider};