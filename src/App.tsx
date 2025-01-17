import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage.tsx';
import PostDetail from './components/PostDetail.tsx';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<div>Page Not Found</div>} />
        <Route path="/post/:postId" element={<PostDetail />} />

      </Routes>
    </Router>
  );
};

export default App;
