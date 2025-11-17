/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Button from "../../common/Button";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addReview } from "../../../featuers/apis/reviewApi";
import { useParams } from "react-router-dom";

// type ReviewPopupProps = {
//     onSubmit?: (payload: { rating: number; review: string }) => void;
// };

export default function ReviewPopup() {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [userReview, setReview] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [responsePopup, setResponsePopup] = useState<{
        message: string;
        isError: boolean;
    } | null>(null); //  popup state for response message

    const dialogRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
   const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        if (open) {
            document.addEventListener("keydown", onKey);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        if (open) {
            const first = dialogRef.current?.querySelector<HTMLElement>(
                "textarea, button, input"
            );
            first?.focus();
        }
    }, [open]);

    const submit = async () => {
        if (rating === 0) return;

        try {
            const data = await addReview({
                doctorId: Number(id),
                patientId: 0, // need to get patient id auth
                rating: rating,
                review: userReview,
            });

            console.log("✅ Review added successfully:", data);
            setResponsePopup({ message: "Thanks for your review!", isError: false }); // done popup
            setSubmitted(true);
        } catch (error: any) {
            console.error("❌ Error adding review:", error);
            setResponsePopup({
                message: error.response?.data?.message || "Failed to add review",
                isError: true,
            }); // error popup
        }
    };

    const handleDone = () => {
        setSubmitted(false);
        setOpen(false);
        setRating(0);
        setReview("");
    };

    const handleBackHome = () => {
        navigate("/");
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline focus:outline-none"
                aria-haspopup="dialog"
            >
                + Add review
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Add review dialog"
                >
                    <div
                        className="fixed inset-0 bg-black/40 transition-opacity"
                        onClick={() => setOpen(false)}
                        aria-hidden="true"
                    />

                    <div
                        ref={dialogRef}
                        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* ✅ If submitted -> show thank you message */}
                        {submitted ? (
                            <div className="text-center space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    🎉 Thanks for your review!
                                </h3>
                                <p className="text-gray-600">
                                    We really appreciate your feedback ❤️
                                </p>

                                <div className="flex gap-3 justify-center mt-6">
                                    <Button
                                        onClick={handleDone}
                                        variant="primary"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Done
                                    </Button>
                                    <Button
                                        onClick={handleBackHome}
                                        variant="secondary"
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                                    >
                                        Back to Home
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Add Review</h3>
                                    <button
                                        onClick={() => setOpen(false)}
                                        aria-label="Close"
                                        className="text-gray-500 hover:text-gray-700 rounded focus:outline-none"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="mt-4 flex flex-col items-center gap-3">
                                    <p className="font-medium text-gray-700">Your Rate</p>

                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className="p-1 rounded focus:outline-none"
                                                aria-label={`${star} star`}
                                            >
                                                <Star
                                                    size={24}
                                                    className={`${star <= rating
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-300 fill-transparent"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    <p className="text-sm text-gray-600">{rating}/5</p>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Your review
                                    </label>
                                    <textarea
                                        value={userReview}
                                        onChange={(e) => setReview(e.target.value)}
                                        placeholder="Write your review"
                                        className="w-full h-28 resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>

                                <div className="mt-6">
                                    <Button
                                        onClick={submit}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md"
                                    >
                                        Send your review
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/*response Popup */}
            {responsePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white rounded-3xl shadow-xl w-80 p-8 text-center">
                        <h2
                            className={`text-lg font-semibold mb-6 ${responsePopup.isError ? "text-red-600" : "text-gray-900"
                                }`}
                        >
                            {responsePopup.message}
                        </h2>
                        <button
                            onClick={() => setResponsePopup(null)}
                            className="bg-[#0b1528] text-white px-6 py-2 rounded-full font-medium hover:bg-[#14233d] transition"
                        >
                            Done
                        </button>
                        <p
                            onClick={() => {
                                setResponsePopup(null);
                                navigate("/");
                            }}
                            className="mt-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            Back to Home
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
