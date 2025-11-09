// ...existing code...
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import DoctorHeader from "../../components/ui/Doctor/DoctorHeader";
import Price from "../../components/ui/Doctor/Price";
import DocCalender from "../../components/ui/Doctor/DocCalender";

const ConfirmAppointment: React.FC = () => {
    const doctor = useSelector((state: RootState) => state.doctor.selectedDoctor);
    const displayDoctor = doctor;
    // const initialDoctor = useSelector((state: RootState) => state.doctor);
    // const displayDoctor = doctor ?? initialDoctor;
console.log("doctor " , displayDoctor);
// console.log("display doctor" , displayDoctor);
if (!doctor) return <p>No doctor selected</p>;

    return (
        <div className="container">
            <div className="w-full max-w-7xl mx-auto space-y-8">
                <DoctorHeader doctor={displayDoctor} />
               <DocCalender />
                <Price doctor={displayDoctor} buttonText="Continue to Pay"/>

            </div>
        </div>
    );
};

export default ConfirmAppointment;
