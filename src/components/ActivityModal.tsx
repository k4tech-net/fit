import { Activity } from '../types';
import './ActivityModal.css';

interface ActivityModalProps {
  activity: Activity | null;
  onClose: () => void;
}

const ActivityModal = ({ activity, onClose }: ActivityModalProps) => {
  if (!activity) return null;

  const emailSubject = `Join: ${activity.name} on ${activity.date} (${activity.time})`;
  const emailBody = `Hi,\n\nI'd like to join the ${activity.name} activity scheduled for ${activity.date} in the ${activity.time}.\n\n${activity.description ? `Details: ${activity.description}\n\n` : ''}Please let me know if there's anything I should bring or prepare.\n\nThanks!`;
  const mailtoLink = `mailto:fit@k4tech.net?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{activity.name}</h2>
        <div className="modal-details">
          <p><strong>Date:</strong> {activity.date} - {activity.time}</p>
          {activity.description && (
            <p><strong>Details:</strong> {activity.description}</p>
          )}
        </div>
        <a href={mailtoLink} className="contact-button">
          Contact to Join
        </a>
      </div>
    </div>
  );
};

export default ActivityModal;
