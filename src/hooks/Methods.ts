import axios from "axios";
import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_BASE_API;
const TOKEN = import.meta.env.VITE_API_TOKEN;


interface PaymentMethod {
    methodName: string,
    providerToken: string,
    last3: string,
    brand: string,
    expMonth: number,
    expYear: number
}
// Custom hook for fetching payment methods with state management
export const useGetMethod = () => {
    const [data, setData] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMethods = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get(`${API_BASE}api/profile/paymentmethods/getall`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                
                setData(response.data.data || []);
            } catch (err: any) {
                console.error("Error fetching payment methods:", err);
                setError(err.response?.data?.message || err.message || "Failed to fetch payment methods");
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMethods();
    }, []);

    return { data, loading, error };
};

// Raw async function for direct API calls
export const getMethod = async (_formData: { methodName: string; providerToken: string; last3: string; brand: string; expMonth: number; expYear: number; }) => {
    try {
        const response = await axios.post(`${API_BASE}api/Profile/PaymentMethods/add`,_formData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}



