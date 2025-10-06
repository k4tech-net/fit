export type ActivityTarget = 'Strength' | 'Cardio' | 'Other';
export type ActivityType = 'Circuit' | 'Workout' | 'Sport' | 'Endurance' | 'Recovery';

export interface Activity {
  id: string;
  name: string;
  description?: string;
  time: 'AM' | 'PM';
  date: string; // Format: YYYY-MM-DD
  target: ActivityTarget;
  type: ActivityType;
}
