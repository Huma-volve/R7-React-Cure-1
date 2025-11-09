import { useContext, useEffect, useState } from "react";
import { TokenAndUrlContext } from "../context/TokenAndUrlContext";
import axios from "axios";

interface TopDoctor {
    fullName : string,
    address : string,
    rating : number,
    price : number,
    id : number,  
    imgUrl : string,
    specialistTitle : string,
}

export const useTopDoctors = () => {
   const context = useContext(TokenAndUrlContext)
   if(!context){
    throw new Error('useTopDoctors must be used within TokenAndUrlContextProvider')
   }
   const {Token, ApiBase} = context;
   const [topDoctors, setTopDoctors] = useState<TopDoctor[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const getTopDoctors = async () => {
        try{
            setLoading(true);
            setError(null)

            const response = await axios.get(`${ApiBase}api/Customer/Doctors/GetTopRatedDoctors`,{
                headers:{
                    Authorization : `Bearer ${Token}`
                },
            })
            const doctors = response?.data?.data
            setTopDoctors(doctors)
            console.log('top doctor' ,doctors)
        }catch(err){
            setError(err as string)
        }finally{
            setLoading(false)
        }
      }
      getTopDoctors()
   },[Token,ApiBase])

   return {
    topDoctors,
    loading,
    error
   }
    
    
}

export default useTopDoctors