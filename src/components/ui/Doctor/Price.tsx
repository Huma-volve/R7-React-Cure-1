// ...existing code...
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import type { Doctor } from "../../../featuers/doctor/doctorTypes";

type PriceProps = {
    doctor?: Doctor;
    onBook?: (doctor?: Doctor) => void;
    className?: string;
    buttonText?: string;
};

export default function Price({ doctor, onBook, className, buttonText }: PriceProps) {
    const navigate = useNavigate();
    const btnText = buttonText ?? "Book Appointment";

    // shared container classes: full width on mobile, larger card & horizontal layout on md+
    const containerCls = [
        "w-full",
        "inline-block",
        "rounded-t-2xl",
        "p-4",
        "text-center",
        "bg-white",
        // "shadow-[0_-4px_20px_rgba(0,0,0,0.05)]", 
        "fixed bottom-0 left-0",
        "z-50",
        "md:static",
        "md:rounded-2xl",
        "md:flex",
        "md:items-center",
        "md:justify-between",
        "md:gap-6",
        "md:p-6",
        className ?? "",
    ].join(" ");

    if (!doctor) {
        return (
            <div className={containerCls}>
                <hr />
                <div className="mb-3 md:mb-0 md:flex-1">
                    <div className="text-xs text-gray-500 mb-2">Price / hour</div>
                    <div className="text-lg md:text-2xl font-semibold mb-1 text-gray-400">—</div>
                </div>

                <div className="md:w-64">
                    <Button disabled className="w-full py-2 md:py-3">No Doctor Selected</Button>
                </div>
            </div>
        );
    }

    const currency = "USD";
    const priceValue = doctor.price ?? 0;

    const formatted = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
    }).format(priceValue);

    return (
        <div className={containerCls}>
            <div className="md:flex-1 md:text-left">
                <div className="text-xs text-gray-500 mb-2">Price / hour</div>
                <div className="text-xl md:text-3xl font-semibold mb-1 text-gray-800">
                    {formatted}
                </div>
            </div>

            <div className="mt-3 md:mt-0 md:w-64">
                <Button
                    onClick={() => {
                        onBook?.(doctor);
                        navigate("/confirm-appointment");
                    }}
                    aria-label="Book Appointment"
                    className="w-full py-2 md:py-3"
                >
                    {btnText}
                </Button>
            </div>
        </div>
    );
}
