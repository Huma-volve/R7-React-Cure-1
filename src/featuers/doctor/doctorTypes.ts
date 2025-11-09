export interface Review {
  // "patientId": 134,
  //               "doctorId": 1,
  //               "patientName": null,
  //               "doctorName": null,
  //               "rating": 4,
  //               "comment": "Excellent service!",
  //               "createdAt": "0001-01-01T00:00:00"
  patientId: number;
  doctorId: number;
  patientName: string;
  doctorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Doctor {
  selectedDoctor: any;
  id: number;
  image?: string;
  fullName: string;
  specialization: string;
  address: string;
  rating: number;
  specialty?: string;
  reviewsCount: number;
  experience: number;
  patients: number;
  pricePerHour: number;
  about: string;
  education: string;
  hospital: string;
  languages: string[];
  fee: number;
  reviews?: Review[];
}
export interface DoctorState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}