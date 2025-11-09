import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { useParams } from "react-router-dom";
import DoctorHeader from "../../components/ui/Doctor/DoctorHeader";
import AboutDoctor from "../../components/ui/Doctor/AboutDoctor";
import ReviewsSection from "../../components/ui/Doctor/ReviewsSection";
import Price from "../../components/ui/Doctor/Price";
import { getDoctorByIdThunk } from "../../featuers/doctor/doctorSlice";
import ErrorPage from "../../components/error_boundary/Error";

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedDoctor, loading, error } = useSelector(
    (state: RootState) => state.doctor
  );

  useEffect(() => {
    if (id) {
      dispatch(getDoctorByIdThunk(Number(id)));
    }
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorPage message={error} />;;
  if (!selectedDoctor) return <p>No doctor found</p>;

  return (
    <div className="container">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        <DoctorHeader doctor={selectedDoctor} />
        <AboutDoctor doctor={selectedDoctor} />
        <ReviewsSection reviews={selectedDoctor.reviews ?? []}  />
        <Price doctor={selectedDoctor} buttonText="Book Appointment" urlLink="/confirm-appointment" />
      </div>
    </div>
  );
};

export default DoctorDetails;
