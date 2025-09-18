import React from 'react';
import { Member } from '../../types';
import './MemberCard.css';

interface MemberCardProps {
  member: Member;
  searchQuery?: string;
}

/**
 * 組合員情報を表示するカードコンポーネント
 * 要件 3.1, 3.2, 3.3 に対応
 */
const MemberCard: React.FC<MemberCardProps> = ({ member, searchQuery = '' }) => {
  /**
   * 検索キーワードをハイライト表示する関数
   */
  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) {
      return text;
    }

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="member-card">
      {/* 組合員名 */}
      <div className="member-header">
        <h3 className="member-name">
          {highlightText(member.name, searchQuery)}
        </h3>
      </div>

      {/* 連絡先URL */}
      {member.contactUrl && (
        <div className="member-contact">
          <a 
            href={member.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            aria-label={`${member.name}の連絡先を開く`}
          >
            <span className="contact-icon">🔗</span>
            連絡先を見る
          </a>
        </div>
      )}

      {/* 得意分野 */}
      <div className="member-expertise">
        <h4 className="expertise-title">得意分野</h4>
        <div className="expertise-tags">
          {member.expertiseAreas.map((area, index) => (
            <span key={index} className="expertise-tag">
              {highlightText(area, searchQuery)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;