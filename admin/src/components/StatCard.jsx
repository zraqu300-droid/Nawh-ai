import React from 'react';

function StatCard({ title, value, icon: Icon, badgeText, badgeIcon: BadgeIcon, iconBgClass }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between transition-transform hover:scale-[1.01]">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <h3 className="text-3xl font-bold mt-2 font-mono">{value}</h3>
        {badgeText && (
          <span className="text-xs text-green-500 flex items-center gap-1 mt-2">
            {BadgeIcon && <BadgeIcon className="w-3 h-3" />} {badgeText}
          </span>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}

export default StatCard;
