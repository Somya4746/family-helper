import React from 'react';
import List from './List'; // Import List component

function Lists({ lists }) {
  return (
    <div>
      {lists.map(list => (
        <List key={list.id} title={list.title} description={list.description} /> // Use List component
      ))}
    </div>
  );
}

export default Lists;
