import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchProfile, saveProfile } from "../../featuers/profile/profileSclice";

interface Profile {
    fullName: string;
    Email: string;
    PhoneNumber: string;
    Address: string;
    BirthDate: string;
}

const EditProfile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { profile, loading } = useSelector((state: RootState) => state.profile);

    // تحديد نوع الـ state بوضوح باستخدام Profile
    const [formData, setFormData] = useState<Profile>({
        fullName: "",
        Email: "",
        PhoneNumber: "",
        Address: "",
        BirthDate: "",
    });

    // جلب البيانات عند تحميل الصفحة
    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    // تحديث formData بعد ما البيانات تتجلب
    useEffect(() => {
        if (profile) {
            setFormData(profile);
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // تحديث البيانات مع الاحتفاظ بالقيم القديمة إذا كانت فارغة
        const updatedData: Profile = {
            fullName: formData.fullName || profile.fullName,
            Email: formData.Email || profile.Email,
            PhoneNumber: formData.PhoneNumber || profile.PhoneNumber,
            Address: formData.Address || profile.Address,
            BirthDate: formData.BirthDate || profile.BirthDate,
        };

        dispatch(saveProfile(updatedData));
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {["fullName", "Email", "PhoneNumber", "Address", "BirthDate"].map((field) => (
                    <div key={field}>
                        <label className="block text-gray-700 font-medium mb-1">
                            {field}
                        </label>
                        <input
                            type={field === "BirthDate" ? "date" : "text"}
                            name={field}
                            value={formData[field as keyof Profile] || ""}
                            onChange={handleChange}
                            
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
