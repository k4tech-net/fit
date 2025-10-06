export interface Activity {
  id: string;
  name: string;
  description?: string;
  time: 'AM' | 'PM';
  date: string; // Format: YYYY-MM-DD
}
