import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchProfile, saveProfile } from "../../featuers/profile/profileSclice";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import defultUser from "../../assets/defultUser.png";

const EditProfile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { profile, loading } = useSelector((state: RootState) => state.profile);

    // Keep form keys aligned with API expectations
    const [formData, setFormData] = useState({
        FullName: "",
        Email: "",
        PhoneNumber: "",
        Address: "",
        // Store BirthDate as yyyy-MM-dd for the input[type=date]
        BirthDate: "",
        ImgFile: "",
    });

    const [previewImage, setPreviewImage] = useState<string>(defultUser);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    // Normalize incoming profile to our form keys
    useEffect(() => {
        if (profile?.data) {
            const p = profile.data;
            // If backend date is ISO (e.g., 2000-10-15T00:00:00Z), normalize to yyyy-MM-dd for the input
            const yyyyMmDd = p.birthDate
                ? (p.birthDate.includes("T") ? p.birthDate.split("T")[0] : p.birthDate)
                : "";
            setFormData({
                FullName: p.fullName || p.FullName || "",
                Email: p.email || p.Email || "",
                PhoneNumber: p.phoneNumber || p.PhoneNumber || "",
                Address: p.address || p.Address || "",
                BirthDate: yyyyMmDd,
                ImgFile: p.imgFile || p.ImgFile || "",
            });
            setPreviewImage(p.imgFile || p.ImgFile || defultUser);
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData((prev) => ({
                    ...prev,
                    ImgFile: base64String,
                }));
                setPreviewImage(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    // Convert yyyy-MM-dd -> dd/MM/yyyy for API
    const toDMY = (yyyyMmDd: string) => {
        if (!yyyyMmDd) return "";
        const [y, m, d] = yyyyMmDd.split("-");
        return `${d}/${m}/${y}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            data: {
                FullName: formData.FullName,
                Email: formData.Email,
                PhoneNumber: formData.PhoneNumber,
                Address: formData.Address,
                BirthDate: toDMY(formData.BirthDate),
                ImgFile: formData.ImgFile,
            },
        };

        // Assuming saveProfile sends body as-is to the API (PUT)
        dispatch(saveProfile(payload))
            .unwrap()
            .then(() => setOpenDialog(true))
            .catch((err) => console.error(err));
    };

    const handleDelete = () => setOpenDialog(true);
    const confirmDelete = () => {
        setOpenDialog(false);
        console.log("Profile deleted"); // TODO: implement delete API call
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>

            {/* User Image */}
            <div className="flex flex-col items-center mb-6">
                <div className="relative w-28 h-28">
                    <img
                        src={previewImage}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border"
                    />
                    <label
                        htmlFor="profile-image-input"
                        className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-white border rounded-full p-2 shadow cursor-pointer hover:bg-gray-50"
                        aria-label="Change profile picture"
                        title="Change profile picture"
                    >
                        {/* camera icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-700">
                            <path d="M9.5 3a1 1 0 0 0-.832.445L7.277 5H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3h-2.277l-1.39-1.555A1 1 0 0 0 13.5 3h-4ZM12 18.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg>
                    </label>
                    <input
                        id="profile-image-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
            </div>

            {/* The Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    { name: "FullName", type: "text" },
                    { name: "Email", type: "email" },
                    { name: "PhoneNumber", type: "tel" },
                    { name: "Address", type: "text" },
                    { name: "BirthDate", type: "date" }, // keeps yyyy-MM-dd in UI
                ].map((field) => (
                    <div key={field.name}>
                        <label className="block text-gray-700 font-medium mb-1 capitalize">
                            {field.name}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name as keyof typeof formData] || ""}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}

                <div className="flex justify-between gap-3 mt-6">
                    <Button
                        type="submit"
                        className="w-1/2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save Changes
                    </Button>

                    <Button
                        type="button"
                        variant="destructive"
                        className="w-1/2 bg-red-600 hover:bg-red-700"
                        onClick={handleDelete}
                    >
                        Delete Profile
                    </Button>
                </div>
            </form>

            {/* Popup for delete confirmation */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete your profile?</DialogTitle>
                    </DialogHeader>
                    <p className="text-gray-600">
                        This action cannot be undone. Your profile and all associated data will
                        be permanently deleted.
                    </p>
                    <DialogFooter className="flex justify-end gap-3 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setOpenDialog(false)}
                            className="px-4 py-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmDelete}
                            className="bg-red-600 text-white hover:bg-red-700 px-4 py-2"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditProfile;