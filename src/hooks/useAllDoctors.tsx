import { useContext, useEffect, useState } from "react";
import { TokenAndUrlContext } from "../context/TokenAndUrlContext";
import axios from "axios";

interface TopDoctor {
    name: string;
    fullName : string,
    address : string,
    rating : number,
    price : number,
    id : number,  
    imgUrl : string,
    specialistTitle : string,
}

export const useAllDoctors = () => {
   const context = useContext(TokenAndUrlContext)
   if(!context){
    throw new Error('useAllDoctors must be used within TokenAndUrlContextProvider')
   }
   const {Token, ApiBase} = context;
   const [allDoctors, setAllDoctors] = useState<TopDoctor[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const getAllDoctors = async () => {
        try{
            setLoading(true);
            setError(null)

            const response = await axios.get(`${ApiBase}api/Customer/Doctors/GetAllDoctors`,{
                headers:{
                    Authorization : `Bearer ${Token}`
                },
            })
            const doctors = response?.data?.data
            setAllDoctors(doctors)
            console.log('all doctor' ,doctors)
        }catch(err){
            setError(err as string)
        }finally{
            setLoading(false)
        }
      }
      getAllDoctors()
   },[Token,ApiBase])

   return {
    allDoctors,
    loading,
    error
   }
    
    
}

export default useAllDoctors