import type { ActivityTarget, ActivityType } from '../types';

export interface ActivityColor {
  border: string;
  background: string;
  calendarBackground: string;
  text: string;
}

const targetColors: Record<ActivityTarget, ActivityColor> = {
  Strength: {
    border: '#4db87d',
    background: 'rgba(77, 184, 125, 0.12)',
    calendarBackground: 'rgba(77, 184, 125, 0.25)',
    text: '#4db87d'
  },
  Cardio: {
    border: '#d66b6b',
    background: 'rgba(214, 107, 107, 0.12)',
    calendarBackground: 'rgba(214, 107, 107, 0.25)',
    text: '#d66b6b'
  },
  Other: {
    border: '#9b7bc4',
    background: 'rgba(155, 123, 196, 0.12)',
    calendarBackground: 'rgba(155, 123, 196, 0.25)',
    text: '#9b7bc4'
  }
};

const typeColors: Record<ActivityType, ActivityColor> = {
  Circuit: {
    border: '#e88d3a',
    background: 'rgba(232, 141, 58, 0.12)',
    calendarBackground: 'rgba(232, 141, 58, 0.25)',
    text: '#e88d3a'
  },
  Workout: {
    border: '#5bb8d4',
    background: 'rgba(91, 184, 212, 0.12)',
    calendarBackground: 'rgba(91, 184, 212, 0.25)',
    text: '#5bb8d4'
  },
  Sport: {
    border: '#d47ba3',
    background: 'rgba(212, 123, 163, 0.12)',
    calendarBackground: 'rgba(212, 123, 163, 0.25)',
    text: '#d47ba3'
  },
  Endurance: {
    border: '#8b7bd4',
    background: 'rgba(139, 123, 212, 0.12)',
    calendarBackground: 'rgba(139, 123, 212, 0.25)',
    text: '#8b7bd4'
  },
  Recovery: {
    border: '#5fa89e',
    background: 'rgba(95, 168, 158, 0.12)',
    calendarBackground: 'rgba(95, 168, 158, 0.25)',
    text: '#5fa89e'
  }
};

export const getActivityColor = (target: ActivityTarget, _type: ActivityType): ActivityColor => {
  // Primary color based on target, could be extended to use type as well
  return targetColors[target];
};

export const getActivityColorByType = (type: ActivityType): ActivityColor => {
  return typeColors[type];
};
