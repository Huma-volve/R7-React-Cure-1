export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  time: string;
}

export interface Doctor {
  selectedDoctor: any;
  id: number;
  image?: string;
  name: string;
  specialization: string;
  address: string;
  rating: number;
  specialty?: string;
  reviewsCount: number;
  experience: number;
  patients: number;
  price: number;
  about: string;
  education: string;
  hospital: string;
  languages: string[];
  fee: number;
  reviews: Review[];
}
export interface DoctorState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}