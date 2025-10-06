export type ActivityTarget = 'Strength' | 'Cardio' | 'Other';
export type ActivityType = 'Circuit' | 'Workout' | 'Sport' | 'Endurance' | 'Recovery';

export interface Exercise {
  name: string;
  warmupSets: number;
  sets: number;
  reps: number | string;
}

export interface Activity {
  id: string;
  name: string;
  description?: string;
  time: 'AM' | 'PM';
  date: string; // Format: YYYY-MM-DD
  target: ActivityTarget;
  type: ActivityType;
  exercises?: Exercise[];
}
