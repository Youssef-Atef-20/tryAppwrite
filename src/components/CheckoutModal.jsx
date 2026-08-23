import React, { useState } from "react";

const CheckoutModal = ({ plan, isYearly, isOpen, onClose, onUpgradeSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen || !plan) return null;

  const calculatePrice = () => {
    if (plan.name === "Free") return "$0";
    const monthlyPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    return `$${monthlyPrice}${isYearly ? "/mo (Billed annually)" : "/month"}`;
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onUpgradeSuccess(plan.name);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-lg">
              ⚡
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Upgrade to {plan.name} Plan</h2>
              <p className="text-xs text-slate-400">Unlock unlimited invoices and premium features</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Plan Summary Box */}
        <div className="p-4 bg-slate-900/80 rounded-2xl border border-white/10 mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Selected Plan</span>
            <span className="text-lg font-bold text-white">{plan.name} Membership</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-extrabold text-pink-400">{calculatePrice()}</span>
          </div>
        </div>

        {/* Payment Methods Selector */}
        <div className="space-y-4">
          <label className="block text-xs font-semibold text-slate-300">
            Select Payment Method
          </label>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                paymentMethod === "card"
                  ? "bg-pink-600/20 border-pink-500 text-pink-300"
                  : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <span className="text-lg">💳</span>
              <span>Credit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("paypal")}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                paymentMethod === "paypal"
                  ? "bg-pink-600/20 border-pink-500 text-pink-300"
                  : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <span className="text-lg">🟦</span>
              <span>PayPal</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("fawry")}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                paymentMethod === "fawry"
                  ? "bg-pink-600/20 border-pink-500 text-pink-300"
                  : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <span className="text-lg">📱</span>
              <span>Vodafone / Fawry</span>
            </button>
          </div>

          <form onSubmit={handleProcessPayment} className="space-y-4 pt-2">
            {paymentMethod === "card" && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4532 •••• •••• 8920"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      placeholder="•••"
                      className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm font-mono"
                    />
                  </div>
                </div>
              </>
            )}

            {paymentMethod === "fawry" && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mobile Wallet Number (Vodafone / Orange / Etisalat Cash)
                </label>
                <input
                  type="text"
                  required
                  placeholder="01012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm font-mono"
                />
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="p-4 bg-slate-900 rounded-xl text-xs text-slate-300 text-center">
                You will be redirected to PayPal to complete your subscription securely.
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">🔒 256-bit Encrypted Checkout</span>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary text-xs px-4 py-2.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-xs px-6 py-2.5 shadow-lg shadow-pink-500/25"
                >
                  {loading ? "Processing..." : "Confirm & Subscribe"}
                </button>
              </div>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};

export default CheckoutModal;
