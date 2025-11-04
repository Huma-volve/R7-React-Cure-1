import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import DoctorHeader from "../../components/ui/Doctor/DoctorHeader";
import AboutDoctor from "../../components/ui/Doctor/AboutDoctor";
import ReviewsSection from "../../components/ui/Doctor/ReviewsSection";
import Price from "../../components/ui/Doctor/Price";

const DoctorDetails: React.FC = () => {
  const doctor = useSelector((state: RootState) => state.doctor.selectedDoctor);
  const initialDoctor = useSelector((state: RootState) => state.doctor.doctors[0]);
  const displayDoctor = doctor ?? initialDoctor;

  return (
    <div className="container">
      <div className="w-full max-w-7xl mx-auto space-y-8">

        <DoctorHeader doctor={displayDoctor} />
        <AboutDoctor doctor={displayDoctor} />
        <ReviewsSection reviews={displayDoctor.reviews} />
        <Price doctor={displayDoctor} buttonText="Book Appointment"/>
      </div>
    </div>
  );
};

export default DoctorDetails;
