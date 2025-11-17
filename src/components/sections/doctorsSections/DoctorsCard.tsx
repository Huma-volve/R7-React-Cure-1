import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import { CardContent } from '../../../components/ui/card';
import { Link } from 'react-router-dom';
import BtnFavorite from '../../../components/ui/doctors/favorite/BtnFavorite';
import { useFavorite } from '../../../context/FavoriteContext';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import photoDr from '../../../../public/photoDr.svg';

interface DoctorCardProps {
    id: number;
    fullName: string;
    imgUrl: string;
    specialistTitle: string;
    hospital: string;
    rating: number;
    price: number;
    address: string;
    
}

const DoctorCard: React.FC<DoctorCardProps> = ({
    id,
    fullName,
    imgUrl,
    specialistTitle,
    hospital,
    rating,
    price,
    address
    
}) => {
    const { doctors, toggleFavorite } = useFavorite();
    const current = doctors.find((d) => d.id === id);
    const isFavorite = current?.isFavorite || false;

    const onToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
    };

    
    
    
    return (
        <CardContent className="p-0 group transition-all duration-300 shadow-[0_0_12px_rgba(0,0,0,0.1)] hover:shadow-[0_0_16px_rgba(0,0,0,0.2)] rounded-xl">
            <div className="px-4 pb-4 pt-4 md:pt-6 flex flex-col h-full">
                {/* ====== Doctor Info ====== */}
                <div className="flex items-center gap-3 mb-3 relative">
                    {/* Favorite Button */}
                    <div className="absolute top-0 right-0 z-40 pointer-events-auto hidden lg:block">
                        <BtnFavorite id={id} />
                    </div>

                    {/* Doctor Image */}
                    <Link to={`/doctor-details/${id}`} className="shrink-0">
                        <Avatar className="w-[70px] h-[70px] sm:w-[85px] sm:h-20 md:w-[95px] md:h-[90px] rounded-[10px] overflow-hidden cursor-pointer hover:scale-[1.05] transition-transform duration-300">
                            <AvatarImage
                                className="w-[97px] h-[88px] object-cover"
                                src={imgUrl && photoDr}
                                alt={fullName}
                            />
                            <AvatarFallback className="bg-muted text-muted-foreground">
                                {fullName
                                    .split(' ')
                                    .map((n: any) => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                    </Link>

                    {/* Doctor Details */}
                    <div className="flex-1 min-w-0">
                        {/* MD-only header with favorite on the right */}
                        <div className="hidden md:flex lg:hidden items-start justify-between gap-2">
                            <Link to={`/doctors/${id}`} className="shrink">
                                <h3
                                    className="text-[15px] sm:text-[16px] w-fit md:text-[17px] font-semibold truncate cursor-pointer transition-colors duration-300 group-hover:text-(--color-main)"
                                    style={{ fontFamily: 'var(--font-secondary)' }}
                                >
                                    {fullName}
                                </h3>
                            </Link>
                            <div className="shrink-0">
                                <BtnFavorite id={id} />
                            </div>
                        </div>

                        {/* Default header (hidden on md, visible on lg) */}
                        <Link to={`/doctors/${id}`} className="md:hidden lg:block">
                            <h3
                                className="text-[15px] sm:text-[16px] w-fit md:text-[17px] font-semibold truncate cursor-pointer transition-colors duration-300 group-hover:text-(--color-main)"
                                style={{ fontFamily: 'var(--font-secondary)' }}
                            >
                                {fullName}
                            </h3>
                        </Link>

                        <p className="text-[13px] sm:text-[14px] text-(--color-text) truncate">
                            {specialistTitle} | {address}
                        </p>

                        <div className="flex items-center gap-2 mt-1 text-[13px] sm:text-[14px] flex-wrap">
                            <div className="flex items-center gap-1">
                                <img src="/icons/Star.svg" alt="" className="w-3.5 h-3.5" />
                                <span>{rating}</span>
                            </div>
                            <div className="flex items-center gap-1 ml-auto">
                                <img src="/icons/Time.svg" alt="" className="w-3.5 h-3.5" />
                                <span className="text-muted-foreground">{price}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ====== Price Section ====== */}
                <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="text-[16px]">
                        Price
                        <span className="text-[12px]">/hour</span>
                    </span>
                    <span className="text-[16px] text-[#FC4B4E]">${price}</span>
                </div>

                {/* ====== Booking Button ====== */}
                <Link to="/booking">
                    <Button className="w-full rounded-lg cursor-pointer bg-(--bg-main) text-white border border-(--bg-main) hover:text-(--bg-main) hover:bg-transparent duration-300">
                        Book appointment
                    </Button>
                </Link>

                {/* ====== Mobile/Small (below md) Favorite Action ====== */}
                <div className="md:hidden mt-3 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onToggleFavorite}
                        className="flex items-center justify-center gap-2 px-3 py-2 w-full rounded-lg border text-sm"
                    >
                        {isFavorite ? 'Remove from favorite' : 'Add to favorite'}
                        {isFavorite ? (
                            <GoHeartFill className="text-[#FC4B4E] text-[18px]" />
                        ) : (
                            <GoHeart className="text-[18px]" />
                        )}
                    </button>
                </div>
            </div>
        </CardContent>
    );
};

export default DoctorCard;
