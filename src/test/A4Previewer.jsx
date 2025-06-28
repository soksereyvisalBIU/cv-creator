import React from 'react';
import './A4Previewer.css'; // custom styling

const A4Page = ({ children }) => {
  return (
    <div className="a4-page">
      {children}
    </div>
  );
};

const A4Previewer = ({ pages }) => {
  return (
    <div className="a4-previewer">
      {pages.map((content, index) => (
        <A4Page key={index}>
          {content}
        </A4Page>
      ))}
    </div>
  );
};

export default A4Previewer;
