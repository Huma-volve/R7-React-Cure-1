import { CreditCard, CreditCardBack, CreditCardChip, CreditCardCvv, CreditCardExpiry, CreditCardFlipper, CreditCardFront, CreditCardMagStripe, CreditCardName, CreditCardNumber, CreditCardServiceProvider } from '../../components/ui/shadcn-io/credit-card'
import React from 'react'
import { useForm } from 'react-hook-form'
import { getMethod } from '../../hooks/Methods'
import { useNavigate } from 'react-router-dom'

interface methodForm {
    methodName: string,
    providerToken: string,
    last3: string,
    brand: string,
    expMonth: number,
    expYear: number,
    
}
const MethodForm: React.FC = () => {
    const [cardNumber, setCardNumber] = React.useState("")
    const [cardHolder, setCardHolder] = React.useState("")
    const [expiryMonth, setExpiryMonth] = React.useState("")
    const [expiryYear, setExpiryYear] = React.useState("")
    const [cvv, setCvv] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const { register, handleSubmit } = useForm<methodForm>()
    const navigate = useNavigate()

    const validMethods = ["Visa", "Mastercard", "Amex", "Discover"];
    const method = validMethods.includes("Visa")
        ? "Visa"
        : "Visa";

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const onSubmit = async () => {
        try {
            setLoading(true);
            setError(null);
            
            
            
            const formData = {
                methodName: 'Visa',
                providerToken: 'tok_visa_123456789',
                last3: cardNumber.slice(-3),
                brand: 'Visa',
                expMonth: Number(expiryMonth),
                expYear: Number(expiryYear),
            };
            console.log(formData)
            
            const result = await getMethod(formData);
            console.log("✅ Add Method Success:", result);
            
            // Navigate back to methods page
            navigate('/methods');
        } catch (error: any) {
            console.error("❌ Add Method Failed:", error);
            setError(error.message || "Failed to add payment method");
        } finally {
            setLoading(false);
        }
    };

    return (
        < section className="md:py-8! py-6! px-8! md:px-12! w-full flex flex-col items-center gap-8 h-full">
            <CreditCard>
                <CreditCardFlipper>
                    {/* FRONT */}
                    <CreditCardFront className="bg-gradient-to-r from-[#19D9C2] to-[#3B58E7]">
                        <CreditCardChip />
                        <div className="absolute bottom-1/2 translate-y-1/2 left-20 text-sm">
                            <CreditCardNumber>
                                {cardNumber || "•••• •••• •••• ••••"}
                            </CreditCardNumber>
                        </div>
                        <div className="absolute bottom-5 left-4">
                            <CreditCardName>
                                {cardHolder || "CARD HOLDER"}
                            </CreditCardName>
                        </div>
                        <div className="absolute bottom-12 right-6 text-right">
                            <p className="text-[10px] opacity-70">VALID THRU</p>
                            <CreditCardExpiry>
                                {expiryMonth}/{expiryYear}
                            </CreditCardExpiry>
                        </div>

                        <CreditCardServiceProvider type={method as any} />
                    </CreditCardFront>

                    {/* BACK */}
                    <CreditCardBack className="bg-gradient-to-r from-gray-800 to-gray-700">
                        <CreditCardMagStripe />
                        <div className="absolute bottom-16 right-6 text-right">
                            <p className="text-[10px] opacity-70">CVV</p>
                            <CreditCardCvv>{cvv || "•••"}</CreditCardCvv>
                        </div>
                    </CreditCardBack>
                </CreditCardFlipper>
            </CreditCard>

            {/* ✅ الفورم */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm text-gray-900">
                <div>
                    <label className="block mb-1 text-sm text-black">Card Number</label>
                    <input
                        type="text"
                        {...register("providerToken", {
                            required: 'This field is required',
                            pattern: {
                                value: /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/,
                                message: 'Invalid card number format'
                            },
                            onChange: (e: React.ChangeEvent<HTMLInputElement>   ) => {
                                e.target.value = e.target.value
                                    .replace(/\D/g, "")
                                    .replace(/(.{4})/g, "$1 ")
                                    .trim()
                                    .slice(0, 19);
                                setCardNumber(e.target.value)
                            },

                        })}
                        className="w-full p-2 rounded-md outline-none border bg-[#f1f1f1] border-gray-300 text-black"
                        placeholder="4111 1111 1111 1111"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-black">Card Holder</label>
                    <input
                        {...register("methodName", {
                            required: 'This field is required',
                        })}
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        className="w-full p-2 bg-[#f1f1f1] rounded-md outline-none border border-gray-300 text-black"
                        placeholder="CARD HOLDER"
                        required
                    />
                </div>

                <div className="flex gap-4 items-center">
                    <div className="flex items-center mt-[1.4rem]! gap-2">
                        {/* Month Select */}
                        <select
                            value={expiryMonth}
                            onChange={(e) => setExpiryMonth(e.target.value)}
                            className="w-1/2 text-center p-2 bg-[#f1f1f1] rounded-md border border-gray-300 outline-none text-black"
                            required
                        >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => {
                                const month = (i + 1).toString().padStart(2, "0");
                                return (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                );
                            })}
                        </select>

                        {/* Year Select */}
                        <select
                            value={expiryYear}
                            onChange={(e) => setExpiryYear(e.target.value)}
                            className="w-1/2 text-center p-2 bg-[#f1f1f1] rounded-md border border-gray-300 outline-none text-black"
                            required
                        >
                            <option value="">YY</option>
                            {Array.from({ length: 6 }, (_, i) => {
                                const year = (25 + i).toString();
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                    </div>


                    <div className="flex-1">
                        <label className="block mb-1 text-sm text-black">CVV</label>
                        <input
                            type="password"
                            value={cvv}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                                setCvv(value);
                            }}
                            className="w-full p-2 bg-[#f1f1f1] rounded-md border border-gray-300 outline-none text-black"
                            placeholder="•••"
                            maxLength={3}
                            required
                        />
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-[#145DB8] text-white rounded-[10px] p-3! mt-3! text-[14px] font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </section >
    )
}

export default MethodForm
