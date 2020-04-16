import React, { useState } from 'react';
let exampleData = [
  { text: 'world 1',draggable: true,timestamp: '10:13' },
  { text: 'world 2',draggable: true,timestamp: '11:13' },
  { text: 'world 3',draggable: true,timestamp: '13:13' },
  { text: 'world 4',draggable: true,timestamp: '13:50' },
  { text: 'world 5',draggable: true,timestamp: '14:13' },
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
