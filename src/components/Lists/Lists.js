import React from 'react';
import List from './List'; // Import List component

function Lists({ lists, dispatch }) {
  // Check if lists is defined and is an array
  if (!Array.isArray(lists)) {
    return <div>Loading...</div>; // Or any other fallback UI
  }

  return (
    <div>
      {lists.map(list => (
        // Make sure to pass all necessary props to the List component
        <List
          key={list.id}
          id={list.id}
          title={list.title}
          description={list.description}
          createdAt={list.createdAt}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}

export default Lists;
