import React from "react";
import type { Doctor } from "../../../featuers/doctor/doctorTypes";

type AboutDoctorProps = {
  doctor: Doctor;
};

const AboutDoctor: React.FC<AboutDoctorProps> = ({ doctor }) => {
  return (
    <div className="bg-white text-justify p-6 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">About Doctor</h3>
      <p className="text-gray-600 leading-relaxed">{doctor.about}</p>

      {/* <div className="grid md:grid-cols-2 gap-4 text-gray-600">
        <p><span className="font-medium text-gray-800">Education:</span> {doctor.education}</p>
        <p><span className="font-medium text-gray-800">Hospital:</span> {doctor.hospital}</p>
        <p><span className="font-medium text-gray-800">Consultation Fee:</span> ${doctor.fee}</p>
      </div> */}
    </div>
  );
};

export default AboutDoctor;
