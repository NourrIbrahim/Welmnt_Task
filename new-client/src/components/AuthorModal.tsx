import React from 'react';
import './AuthorModal.css';

interface Author {
  name: string;
  bio: string;
  profilePicture: string;
}

interface AuthorModalProps {
  isOpen: boolean;
  author: Author | null;
  onClose: () => void;
}

const AuthorModal: React.FC<AuthorModalProps> = ({ isOpen, author, onClose }) => {
  if (!isOpen || !author) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{author.name}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="author-profile">
            <img
              src={author.profilePicture}
              alt={author.name}
              className="author-profile-picture2"
            />
            <p className="author-bio">{author.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorModal;
