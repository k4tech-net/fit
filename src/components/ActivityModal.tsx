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

  const handleGmailClick = () => {
    const emailAddress = 'fit@k4tech.net';
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(gmailUrl, '_blank');
  };

  const handleOutlookClick = () => {
    const emailAddress = 'fit@k4tech.net';
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(emailAddress)}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(outlookUrl, '_blank');
  };

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
        <div className="email-buttons">
          <a
            href={mailtoLink}
            className="contact-button primary-contact"
            style={{
              background: `linear-gradient(135deg, ${targetColor.border}, ${typeColor.border})`,
              borderColor: targetColor.border
            }}
          >
            Contact to Join
          </a>
          <div className="email-alternatives">
            <span className="email-label">Or use:</span>
            <button
              className="email-link"
              onClick={handleGmailClick}
            >
              Gmail
            </button>
            <span className="email-separator">|</span>
            <button
              className="email-link"
              onClick={handleOutlookClick}
            >
              Outlook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
