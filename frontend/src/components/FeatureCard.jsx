function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.10)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.18)] hover:-translate-y-2 transition-all duration-300 p-8 text-center">

      <div className="text-5xl mb-5">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
        {title}
      </h3>

      <p className="mt-4 text-gray-600 dark:text-gray-300 leading-7">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;