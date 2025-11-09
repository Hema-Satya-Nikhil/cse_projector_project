const StatsCard = ({ title, value, icon, bgColor, borderColor }) => {
  return (
    <div className={`card bg-gradient-to-br ${bgColor} ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="opacity-80">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
