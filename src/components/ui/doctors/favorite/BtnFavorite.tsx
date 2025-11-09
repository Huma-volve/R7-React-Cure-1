import React from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useFavorite } from '../../../../context/FavoriteContext';

interface BtnFavoriteProps {
    id: number;
}

const BtnFavorite: React.FC<BtnFavoriteProps> = ({ id }) => {
    const { doctors, toggleFavorite } = useFavorite();
    const doctor = doctors.find((doc) => doc.id === id);
    const isFavorite = doctor?.isFavorite || false;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('[BtnFavorite] click', { id, isFavorite });
        toggleFavorite(id);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="cursor-pointer relative z-50 w-8 h-8 flex items-center justify-center"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            {isFavorite ? (
                <GoHeartFill className="text-[#FC4B4E] text-[20px] pointer-events-none" />
            ) : (
                <GoHeart className="text-[20px] pointer-events-none" />
            )}
        </button>
    );
};

export default BtnFavorite;
