import React, { useState } from "react";
import type { Doctor } from "../../../featuers/doctor/doctorTypes";
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import {
    FaMapMarkerAlt,
    FaStar,
    FaBriefcase,
    FaCommentDots,
    FaUsers,
    FaHeart,
    FaRegHeart,
} from "react-icons/fa";
import doctorImg from "../../../assets/NoImageDoctor.png";
import chat from "../../../assets/icons/chat.svg";
import { toggleFavouriteDoctor } from "../../../featuers/apis/doctorApi";
type DoctorHeaderProps = {
    doctor: Doctor;
};

const DoctorHeader: React.FC<DoctorHeaderProps> = ({ doctor }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    console.log(doctor);

    // const getInitials = (name: string) =>
    //     name
    //         .split(" ")
    //         .map((n) => n[0])
    //         .join("")
    //         .toUpperCase();
    const toggleFavorite = async () => {
        try {
            await toggleFavouriteDoctor(doctor.id); // doctor.id هو ID الدكتور الحالي
            setIsFavorite((prev) => !prev);
        } catch (err) {
            console.error("Error toggling favourite:", err);
        }
        // setIsFavorite(!isFavorite);
    };

    const handleChat = () => {
        console.log(`Start chat with ${doctor.fullName}`);
        // navigate("/chat") //  navigation to chat page
    };
    return (
        <div className="doctorImage w-full bg-white p-6 md:p-1 my-2">
            {/* main container */}
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 w-full">
                {/* top section: image + info side by side on mobile */}
                <div className="flex items-center justify-center lg:justify-start w-full lg:w-2/3 gap-4">
                    {/* doctor image */}
                    <div className="w-20 h-20 md:w-20 md:h-20 rounded-full ring-1  flex items-center justify-center overflow-hidden text-3xl font-bold text-primary">
                        {/* {doctor.image ? (
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <img
                                src={doctorImg}
                                alt="No Doctor"
                                className="w-full h-full object-cover rounded-full"
                            />
                        )} */}
                        <Avatar className="w-[70px] h-[70px] sm:w-[85px] sm:h-20 md:w-[95px] md:h-[90px] rounded-[10px] overflow-hidden cursor-pointer hover:scale-[1.05] transition-transform duration-300">
                            <AvatarImage
                                className="w-[97px] h-[88px] object-cover"
                                src={doctor.image && doctorImg}
                                alt={doctor.fullName}
                            />
                            <AvatarFallback className="bg-muted text-muted-foreground">
                                {doctor.fullName
                                    .split(' ')
                                    .map((n: any) => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                        {/* <img
                            src={doctor.image || doctorImg}
                            alt={doctor.fullName || "Doctor"}
                            className="w-full h-full object-cover rounded-full"
                        /> */}
                    </div>

                    {/* doctor info */}
                    <div className="text-left space-y-1 grow">
                        <h2 className="text-xl md:text-2xl font-bold text-primary">
                            {doctor.fullName}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {doctor.specialty}
                        </p>
                        <div className="flex items-center text-muted-foreground gap-1 text-xs md:text-sm">
                            <FaMapMarkerAlt className="text-primary" />
                            <span>{doctor.address}</span>
                        </div>
                    </div>

                    {/* favorite + chat buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleFavorite}
                            aria-label="Add to favorites"
                            className="p-2 rounded-full border border-gray-200 transition"
                        >
                            {isFavorite ? (
                                <FaHeart className="text-red-500 text-xl" />
                            ) : (
                                <FaRegHeart className="text-black-500 text-xl" />
                            )}
                        </button>

                        <button
                            onClick={handleChat}
                            className="flex items-center gap-2 p-2"
                            aria-label="Start chat"
                        >
                            <img
                                src={chat}
                                alt="Chat Icon"
                                className="w-[25px] h-[25px] min-w-[25px] min-h-[25px] object-contain"
                            />
                        </button>


                    </div>
                </div>

                {/* statistics */}
                <div className="flex flex-wrap justify-center lg:justify-end gap-6 mt-4 lg:mt-0 w-full">
                    <div className="flex flex-col items-center">
                        <FaUsers className="text-primary mb-1 text-lg" />
                        <span className="font-semibold text-gray-700">
                            {doctor.patients}+
                        </span>
                        <span className="text-xs text-muted-foreground">patients</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <FaBriefcase className="text-primary mb-1 text-lg" />
                        <span className="font-semibold text-gray-700">
                            {doctor.experience}+
                        </span>
                        <span className="text-xs text-muted-foreground">experience</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <FaStar className="text-primary mb-1 text-lg" />
                        <span className="font-semibold text-gray-700">
                            {doctor.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">rating</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <FaCommentDots className="text-primary mb-1 text-lg" />
                        <span className="font-semibold text-gray-700">
                            {doctor.reviews?.length ?? 0}
                        </span>
                        <span className="text-xs text-muted-foreground">reviews</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorHeader;
// function setIsFavorite(arg0: boolean) {
//     throw new Error("Function not implemented.");
// }

