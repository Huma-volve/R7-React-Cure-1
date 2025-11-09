import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { DoctorsList, type DoctorsType } from '../api/Doctors/Doctors';

interface FavoriteContextType {
    doctors: DoctorsType[];
    toggleFavorite: (id: number) => void;
    updateDoctors: (updatedDoctors: DoctorsType[]) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
    const [doctors, setDoctors] = useState<DoctorsType[]>(DoctorsList);

    // Load doctors from localStorage on mount
    useEffect(() => {
        const savedDoctors = localStorage.getItem('doctors');
        if (savedDoctors) {
            try {
                setDoctors(JSON.parse(savedDoctors));
            } catch (error) {
                console.error('Error loading doctors from localStorage:', error);
            }
        }
    }, []);

    // Save doctors to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('doctors', JSON.stringify(doctors));
    }, [doctors]);

    const toggleFavorite = (id: number) => {
        console.log('[FavoriteContext] toggleFavorite', id);
        setDoctors((prevDoctors) =>
            prevDoctors.map((doc) =>
                doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc
            )
        );
    };

    const updateDoctors = (updatedDoctors: DoctorsType[]) => {
        setDoctors(updatedDoctors);
    };

    return (
        <FavoriteContext.Provider value={{ doctors, toggleFavorite, updateDoctors }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => {
    const context = useContext(FavoriteContext);
    if (context === undefined) {
        throw new Error('useFavorite must be used within a FavoriteProvider');
    }
    return context;
};
