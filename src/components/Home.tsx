import React, { FC } from 'react';
import Diaries from './Diaries';
import Editor from './Editor';

const Home: FC = () => {
  return (
    <div className="two-cols">
      <div className="left">
        <Diaries />
      </div>
      <div className="right">
        <Editor />
      </div>
    </div>
  );
};

export default Home;
