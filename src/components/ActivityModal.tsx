import type { Activity } from '../types';
import './ActivityModal.css';
import { getActivityColor, getActivityColorByType } from '../utils/activityColors';

interface ActivityModalProps {
  activity: Activity | null;
  onClose: () => void;
}

const ActivityModal = ({ activity, onClose }: ActivityModalProps) => {
  if (!activity) return null;

  const emailSubject = `Join: ${activity.name} on ${activity.date} (${activity.time})`;
  const emailBody = `Hi,\n\nI'd like to join the ${activity.name} activity scheduled for ${activity.date} in the ${activity.time}.\n\n${activity.description ? `Details: ${activity.description}\n\n` : ''}Please let me know if there's anything I should bring or prepare.\n\nThanks!`;
  const mailtoLink = `mailto:fit@k4tech.net?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const targetColor = getActivityColor(activity.target, activity.type);
  const typeColor = getActivityColorByType(activity.type);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-accent-top"
          style={{
            background: `linear-gradient(90deg, ${targetColor.border}, ${typeColor.border})`
          }}
        />
        <div
          className="modal-accent-left"
          style={{
            background: `linear-gradient(180deg, ${targetColor.border}, transparent)`
          }}
        />
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 style={{ color: targetColor.text }}>{activity.name}</h2>
        <div className="modal-details">
          <p><strong style={{ color: targetColor.text }}>Date:</strong> {activity.date} - {activity.time}</p>
          <p><strong style={{ color: targetColor.text }}>Target:</strong> {activity.target}</p>
          <p><strong style={{ color: targetColor.text }}>Type:</strong> {activity.type}</p>
          {activity.description && (
            <p><strong style={{ color: targetColor.text }}>Details:</strong> {activity.description}</p>
          )}
        </div>
        <a
          href={mailtoLink}
          className="contact-button"
          style={{
            background: `linear-gradient(135deg, ${targetColor.border}, ${typeColor.border})`,
            borderColor: targetColor.border
          }}
        >
          Contact to Join
        </a>
      </div>
    </div>
  );
};

export default ActivityModal;
