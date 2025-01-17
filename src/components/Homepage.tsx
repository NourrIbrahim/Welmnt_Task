import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './Homepage.css';
import AuthorModal from './AuthorModal.tsx';

type Author = {
  name: string;
  bio: string; 
  profilePicture: string;
};

type Post = {
  id: string;
  title: string;
  coverImage: {
    url: string;
    alt: string;
  };
  author: Author;
};

const Homepage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Record<string, Author>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/authors');
        const data = await response.json();
        const authorsById: Record<string, Author> = {};

        data.docs.forEach((author: any) => {
          authorsById[author.id] = {
            name: author.name,
            bio: author.bio || 'No bio available', 
            profilePicture: `http://localhost:3000${author.profilePicture.url}`,
          };
        });

        setAuthors(authorsById);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();

        const transformedPosts = data.docs.map((post: any) => {
          return {
            id: post.id,
            title: post.title,
            coverImage: {
              url: `http://localhost:3000${post.coverImage.url}`,
              alt: post.coverImage.alt || 'Default Alt Text',
            },
            author: authors[post.author.id] || {
              name: 'Unknown Author',
              bio: 'No bio available',
              profilePicture: 'http://localhost:3000/default-profile.png',
            },
          };
        });

        setPosts(transformedPosts);
        setFilteredPosts(transformedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [authors]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const openModal = (author: Author) => {
    setSelectedAuthor(author);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAuthor(null);
  };

  const handleReadMore = (postId: string) => {
    navigate(`/post/${postId}`);  // Navigate to the post detail page
  };

  return (
    <div className="homepage">
      <div className="search-container">
        <div className="search-icon-container">
          <i className="fas fa-search search-icon"></i>
        </div>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="posts-list">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="image-container">
              <img
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                className="cover-image"
              />
              <div
                className="author-container"
                onClick={() => openModal(post.author)} 
              >
                <img
                  src={post.author.profilePicture}
                  alt={post.author.name}
                  className="author-profile-picture"
                />
                <p className="author-name">{post.author.name}</p>
              </div>
            </div>
            <div className="text-container">
              <h2>{post.title}</h2>
              <button className="read-more-button" onClick={() => handleReadMore(post.id)}>
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Author Details */}
      <AuthorModal
        isOpen={isModalOpen}
        author={selectedAuthor}
        onClose={closeModal}
      />
    </div>
  );
};

export default Homepage;
