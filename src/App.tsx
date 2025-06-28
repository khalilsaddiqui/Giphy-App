import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GifList from './components/GifList';
import GifFeedback from './components/GifFeedback';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<GifList />} />
        <Route path="/feedback/:gifId" element={<GifFeedback />} />
      </Routes>
    </div>
  );
};

export default App;