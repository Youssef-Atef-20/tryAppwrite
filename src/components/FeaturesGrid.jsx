import React from "react";

const features = [
  {
    icon: "🔐",
    title: "Authentication",
    description: "OAuth2 with Google, GitHub, Apple & 30+ providers, magic links, phone SMS, and session management.",
    gradient: "from-pink-500/10 to-rose-500/5",
    border: "border-pink-500/20",
  },
  {
    icon: "🗄️",
    title: "Databases",
    description: "Schemaless or structured NoSQL & SQL collections with deep indexing, relationships, and queries.",
    gradient: "from-blue-500/10 to-cyan-500/5",
    border: "border-blue-500/20",
  },
  {
    icon: "📁",
    title: "Storage",
    description: "Secure file uploads, image transformations, built-in antivirus scanning, and global CDN caching.",
    gradient: "from-amber-500/10 to-orange-500/5",
    border: "border-amber-500/20",
  },
  {
    icon: "⚡",
    title: "Cloud Functions",
    description: "Deploy serverless code in Node.js, Python, Go, PHP, or Rust triggered by events, webhooks, or CRON.",
    gradient: "from-purple-500/10 to-violet-500/5",
    border: "border-purple-500/20",
  },
  {
    icon: "📡",
    title: "Realtime",
    description: "Subscribe to any database collection, auth event, or file state change over WebSockets effortlessly.",
    gradient: "from-emerald-500/10 to-teal-500/5",
    border: "border-emerald-500/20",
  },
  {
    icon: "🛡️",
    title: "Security & RLS",
    description: "Role-based access control, document-level security permissions, rate limiting, and encrypted tokens.",
    gradient: "from-indigo-500/10 to-blue-500/5",
    border: "border-indigo-500/20",
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-16 max-w-6xl mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Everything You Need to Build <br />
          <span className="pink-gradient-text">Full-Stack React Applications</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Appwrite powers your backend infrastructure so you can focus entirely on craft, speed, and user experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`glass-panel p-6 rounded-2xl border ${feature.border} bg-gradient-to-br ${feature.gradient} hover:scale-[1.02] transition-all`}
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
