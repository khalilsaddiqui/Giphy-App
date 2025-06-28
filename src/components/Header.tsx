import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 shadow-md ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">GIF Explorer</Link>
        </h1>
        <p className="text-sm"></p>
      </div>
    </header>
  );
};

export default Header;