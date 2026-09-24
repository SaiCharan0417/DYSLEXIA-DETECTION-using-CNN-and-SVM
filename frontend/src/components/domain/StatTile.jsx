import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

export function StatTile({ title, value, icon: Icon, trendText, trendIcon: TrendIcon, subText, className }) {
  return (
    <Card className={cn("p-4 flex flex-col justify-between h-full", className)}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-on-surface-variant font-medium">{title}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-semibold">{value}</span>
            {subText && <span className="font-mono text-xs text-secondary font-medium">{subText}</span>}
          </div>
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface">
            <Icon size={20} />
          </div>
        )}
      </div>

      {(trendText || TrendIcon) && (
        <div className="mt-4 flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-secondary">
            {TrendIcon && <TrendIcon size={16} />}
            {trendText}
          </span>
        </div>
      )}
    </Card>
  );
}