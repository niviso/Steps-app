import React, { useState } from 'react';
let exampleData = [
  { text: 'world 1',draggable: true },
  { text: 'world 2',draggable: true },
  { text: 'world 3',draggable: true },
  { text: 'world 4',draggable: true,time: 30 },
  { text: 'world 5',draggable: true },
]
const ListContext = React.createContext([{}, () => {}]);

const ListProvider = (props) => {
  const [state, setState] = useState(exampleData);
  return (
    <ListContext.Provider value={[state, setState]}>
      {props.children}
    </ListContext.Provider>
  );
}

export { ListContext, ListProvider };
