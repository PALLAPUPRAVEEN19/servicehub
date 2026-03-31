const StatsCard = ({
    icon,
    label,
    value,
    change,
    changeType = 'positive',
    subtitle,
    iconBg = 'bg-violet-50',
    valueColor = 'text-gray-900',
    trend,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:shadow-gray-100 hover:-translate-y-0.5 transition-all duration-300 group ${onClick ? 'cursor-pointer' : ''}`}
        >
            {/* Icon + Change badge */}
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center text-xl group-hover:scale-105 transition-transform duration-300`}>
                    {icon}
                </div>
                {change && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${changeType === 'positive' ? 'bg-emerald-50 text-emerald-600' :
                            changeType === 'negative' ? 'bg-red-50 text-red-500' :
                                'bg-gray-50 text-gray-500'
                        }`}>
                        {changeType === 'positive' && '↑ '}
                        {changeType === 'negative' && '↓ '}
                        {change}
                    </span>
                )}
            </div>

            {/* Value */}
            <p className={`text-2xl font-bold ${valueColor} leading-tight tracking-tight`}>{value}</p>

            {/* Label */}
            <p className="text-sm text-gray-400 mt-0.5">{label}</p>

            {/* Subtitle */}
            {subtitle && <p className="text-xs text-gray-400 mt-1.5">{subtitle}</p>}

            {/* Sparkline */}
            {trend && trend.length > 0 && (
                <div className="flex items-end gap-[2px] mt-3 h-5">
                    {trend.map((val, i) => {
                        const max = Math.max(...trend);
                        const height = max > 0 ? (val / max) * 100 : 0;
                        return (
                            <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-primary/40 to-primary/10 rounded-sm group-hover:from-primary/60 group-hover:to-primary/20 transition-colors duration-300"
                                style={{ height: `${Math.max(height, 8)}%` }}
                            ></div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export const StatsGrid = ({ stats = [], columns = 4 }) => {
    const gridCols = {
        2: 'grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-3',
        4: 'grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={`grid ${gridCols[columns] || gridCols[4]} gap-4`}>
            {stats.map((stat) => (
                <StatsCard
                    key={stat.label}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    change={stat.change}
                    changeType={stat.changeType}
                    subtitle={stat.subtitle}
                    iconBg={stat.iconBg || stat.bgIcon}
                    valueColor={stat.valueColor || stat.color}
                    trend={stat.trend}
                    onClick={stat.onClick}
                />
            ))}
        </div>
    );
};

export default StatsCard;
