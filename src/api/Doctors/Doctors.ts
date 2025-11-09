

export interface DoctorsType {
    id: number;
    name: string;
    specialty: string;
    hospital: string;
    image: string;
    rate: number;
    availability: string;
    isFavorite: boolean;
    price: number;
    gender: 'Male' | 'Female';
}



export const DoctorsList: DoctorsType[] = [
    {
        id: 1,
        name: 'Dr. John Doe',
        specialty: 'Cardiologist',
        hospital: 'El-Nasr Hospital',
        image: '/photoDr.svg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        isFavorite: true,
        price: 350,
        gender: 'Male'
    },
    {
        id: 2,
        name: 'Dr. Jane Smith',
        specialty: 'Orthopedic',
        hospital: 'El-Nasr Hospital',
        image: '/photoDr.svg',
        rate: 4.5,
        availability: '9:30am - 8:00pm',
        isFavorite: false,
        price: 350,
        gender: 'Female'
    },
    {
        id: 3,
        name: 'Dr. Emily Johnson',
        specialty: 'Pediatrician',
        hospital: 'El-Nasr Hospital',
        image: '/photoDr.svg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        isFavorite: true,
        price: 350,
        gender: 'Female'
    },
    {
        id: 4,
        name: 'Dr. Michael Brown',
        specialty: 'Neurologist',
        hospital: 'El-Nasr Hospital',
        image: '/photoDr.svg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        isFavorite: false,
        price: 350,
        gender: 'Male'
    },
    {
        id: 5,
        name: 'Dr. John Doe',
        specialty: 'Cardiologist',
        hospital: 'El-Nasr Hospital',
        image: '/photoDr.svg',
        rate: 4.5,
        availability: '9:30am - 8:00pm',
        isFavorite: false,
        price: 350,
        gender: 'Male'
    },
    {
        id: 6,
        name: 'Dr. Jane Smith',
        specialty: 'Dermatologist',
        hospital: 'El-Nasr Hospital',
        image: '/photoDr.svg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        isFavorite: false,
        price: 350,
        gender: 'Female'
    },
    {
        id: 7,
        name: 'Dr. Emily Johnson',
        specialty: 'Pediatrician',
        hospital: 'El-Nasr Hospital',
        image: '/photoDr.svg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        isFavorite: false,
        price: 350,
        gender: 'Female'
    },
    {
        id: 8,
        name: 'Dr. Michael Brown',
        specialty: 'Neurologist',
        hospital: 'El-Nasr Hospital',
        image: '/photoDr.svg',
        rate: 4.5,
        availability: '9:30am - 8:00pm',
        isFavorite: true,
        price: 350,
        gender: 'Male'
    }
];