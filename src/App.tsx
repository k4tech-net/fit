import { useState, useEffect } from 'react';
import './App.css';
import type { Activity } from './types';
import ActivityModal from './components/ActivityModal';
import { getDaysInMonth, getFirstDayOfMonth, getMonthName, formatDate, isToday } from './utils/calendar';
import { getActivityColor, getActivityColorByType } from './utils/activityColors';

const App = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  useEffect(() => {
    fetch('/data/activities.json')
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load activities:', err);
        setLoading(false);
      });
  }, []);

  const getActivitiesForDate = (dateStr: string): { am?: Activity; pm?: Activity } => {
    const result: { am?: Activity; pm?: Activity } = {};
    activities.forEach(activity => {
      if (activity.date === dateStr) {
        if (activity.time === 'AM') {
          result.am = activity;
        } else {
          result.pm = activity;
        }
      }
    });
    return result;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Create calendar grid
  const calendarDays: (number | null)[] = [];

  // Adjust first day of month for Monday-start week (0=Sun becomes 6, 1=Mon becomes 0, etc.)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Add empty cells for days before the first day of month
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarDays.push(null);
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Fit - K4Tech</h1>
        <p>Click on any activity to see details and contact info</p>
      </header>

      <div className="calendar-controls">
        <button onClick={previousMonth} className="nav-button">← Previous</button>
        <div className="month-display">
          <h2>{getMonthName(currentMonth)} {currentYear}</h2>
          <button onClick={goToToday} className="today-button">Today</button>
        </div>
        <button onClick={nextMonth} className="nav-button">Next →</button>
      </div>

      <div className="calendar">
        <div className="calendar-header">
          {dayNames.map(day => (
            <div key={day} className="day-name">{day}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="calendar-day empty"></div>;
            }

            const dateStr = formatDate(currentYear, currentMonth, day);
            const dayActivities = getActivitiesForDate(dateStr);
            const isTodayCell = isToday(currentYear, currentMonth, day);

            const amTargetColor = dayActivities.am ? getActivityColor(dayActivities.am.target, dayActivities.am.type) : null;
            const amTypeColor = dayActivities.am ? getActivityColorByType(dayActivities.am.type) : null;
            const pmTargetColor = dayActivities.pm ? getActivityColor(dayActivities.pm.target, dayActivities.pm.type) : null;
            const pmTypeColor = dayActivities.pm ? getActivityColorByType(dayActivities.pm.type) : null;

            return (
              <div key={day} className={`calendar-day ${isTodayCell ? 'today' : ''}`}>
                <div className="day-number">{day}</div>
                <div className="day-activities">
                  <div
                    className={`activity-slot am ${dayActivities.am ? 'has-activity' : ''}`}
                    onClick={() => dayActivities.am && setSelectedActivity(dayActivities.am)}
                    style={amTargetColor && amTypeColor ? {
                      borderColor: amTargetColor.border,
                      background: `linear-gradient(135deg, ${amTargetColor.calendarBackground}, ${amTypeColor.calendarBackground})`
                    } : {}}
                  >
                    <span className="time-badge" style={amTargetColor ? { color: amTargetColor.text } : {}}>AM</span>
                    {dayActivities.am && <span className="activity-name">{dayActivities.am.name}</span>}
                  </div>
                  <div
                    className={`activity-slot pm ${dayActivities.pm ? 'has-activity' : ''}`}
                    onClick={() => dayActivities.pm && setSelectedActivity(dayActivities.pm)}
                    style={pmTargetColor && pmTypeColor ? {
                      borderColor: pmTargetColor.border,
                      background: `linear-gradient(135deg, ${pmTargetColor.calendarBackground}, ${pmTypeColor.calendarBackground})`
                    } : {}}
                  >
                    <span className="time-badge" style={pmTargetColor ? { color: pmTargetColor.text } : {}}>PM</span>
                    {dayActivities.pm && <span className="activity-name">{dayActivities.pm.name}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ActivityModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </div>
  );
};

export default App;
