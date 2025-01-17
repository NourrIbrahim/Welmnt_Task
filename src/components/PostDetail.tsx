import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "./PostDetail.css";

const PostDetail = () => {
  const { postId } = useParams(); 
  const [post, setPost] = useState<any>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    if (postId) {
      fetchPostDetail();
    }
  }, [postId]);

  if (!post) {
    return <div className="post-detail-loading">Loading...</div>;
  }

  return (
    <div className="post-detail-container">

      <button
        className="back-button"
        onClick={() => navigate("/")}
        aria-label="Go back"
      >
        &#8592;
      </button>

      <div className="post-detail-header">
        <h1 className="post-detail-title">{post.title}</h1>
        <p className="post-detail-subtitle">Published on {new Date(post.publishDate).toDateString()}</p>
      </div>

      <div className="post-detail-content">
        <div className="post-detail-image-wrapper">
          <img
            src={`http://localhost:3000${post.coverImage.url}`}
            alt={post.coverImage.alt}
            className="post-detail-image"
          />
        </div>

        <div className="post-detail-text">
          <div className="post-detail-body">
            {post.body.root.children.map((paragraph: any, index: number) => (
              <p key={index} className="post-detail-paragraph">
                {paragraph.children[0].text}
              </p>
            ))}
          </div>

          <div className="post-detail-author">
            <div className="post-detail-author-image-wrapper">
              <img
                src={`http://localhost:3000${post.author.profilePicture.url}`}
                alt={post.author.profilePicture.alt}
                className="post-detail-author-image"
              />
            </div>
            <div className="post-detail-author-info">
              <h2 className="post-detail-author-name">{post.author.name}</h2>
              <p className="post-detail-author-bio">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
