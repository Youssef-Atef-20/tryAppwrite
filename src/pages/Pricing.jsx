import { useState } from "react";
import CheckoutModal from "../components/CheckoutModal";

const plans = [
  {
    id: "free",
    name: "Free",
    tagline: "For new freelancers testing the waters",
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
    features: [
      "Up to 5 invoices per month",
      "Standard PDF export",
      "Single currency support ($ USD)",
      "Basic email notifications",
      "Community support",
    ],
    cta: "Current Free Plan",
    disabled: true,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For busy freelancers needing unlimited invoicing",
    monthlyPrice: 15,
    yearlyPrice: 12,
    popular: true,
    features: [
      "Unlimited invoices & clients",
      "Custom branding & logo on invoices",
      "Multi-currency support (USD, EUR, EGP, GBP)",
      "Payment due alerts & automatic reminders",
      "Export to PDF, CSV, & Excel",
      "Priority customer support",
    ],
    cta: "Upgrade to Pro",
    disabled: false,
  },
  {
    id: "agency",
    name: "Agency",
    tagline: "For growing teams and digital agencies",
    monthlyPrice: 39,
    yearlyPrice: 30,
    popular: false,
    features: [
      "Everything in Pro",
      "Multi-user team collaboration (up to 5 seats)",
      "Automated recurring subscription billing",
      "Custom invoice templates",
      "Dedicated account manager",
      "99.9% Uptime SLA Guarantee",
    ],
    cta: "Upgrade to Agency",
    disabled: false,
  },
];

const Pricing = ({ userPlan, onUpgradePlan }) => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    if (plan.name === userPlan) return;
    setSelectedPlan(plan);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-4">
          Flexible Pricing
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Simple, Transparent Pricing <br />
          for <span className="pink-gradient-text">Freelancers & Agencies</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base">
          Choose the plan that fits your growth. Upgrade or cancel anytime.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className={`text-sm font-semibold ${!isYearly ? "text-white" : "text-slate-400"}`}>
            Monthly
          </span>

          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-14 h-8 rounded-full bg-slate-900 border border-white/20 p-1 transition-colors relative"
          >
            <div
              className={`w-6 h-6 rounded-full bg-pink-500 transition-transform ${
                isYearly ? "translate-x-6 bg-emerald-400" : "translate-x-0"
              }`}
            />
          </button>

          <span className={`text-sm font-semibold flex items-center gap-1.5 ${isYearly ? "text-white" : "text-slate-400"}`}>
            <span>Billed Yearly</span>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {plans.map((plan) => {
          const isCurrent = userPlan === plan.name;
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`glass-panel rounded-3xl p-8 border relative flex flex-col justify-between transition-all ${
                plan.popular
                  ? "border-pink-500/50 shadow-2xl shadow-pink-500/20 bg-slate-950/80 scale-[1.03]"
                  : "border-white/10 bg-slate-950/50 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
                  ★ Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  {isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                      Active Plan
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 min-h-[32px] mb-6">
                  {plan.tagline}
                </p>

                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">${price}</span>
                    <span className="text-xs text-slate-400 font-mono">
                      {price === 0 ? "forever" : isYearly ? "/month (billed annually)" : "/month"}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 text-xs text-slate-300">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <span className="text-emerald-400 font-bold text-sm">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan(plan)}
                disabled={isCurrent || plan.disabled}
                className={`w-full py-3 text-xs font-bold rounded-xl transition-all ${
                  isCurrent
                    ? "bg-slate-900 text-slate-500 border border-white/5 cursor-default"
                    : plan.popular
                    ? "btn-primary justify-center shadow-lg shadow-pink-500/25"
                    : "btn-secondary justify-center"
                }`}
              >
                {isCurrent ? "Current Plan" : plan.cta}
              </button>

            </div>
          );
        })}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        plan={selectedPlan}
        isYearly={isYearly}
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        onUpgradeSuccess={(newPlan) => onUpgradePlan(newPlan)}
      />

    </div>
  );
};

export default Pricing;
