import React, { useState } from 'react';
let exampleData = {
  a: { text: 'Mix ingridients',details:'x',draggable: true,timestamp: null },
  b: { text: 'world 2',draggable: true,time: 30,timestamp: '11:13' },
  c: { text: 'world 3',draggable: true,time: 30,timestamp: '13:13' },
  d: { text: 'world 4',draggable: true,time: 30,timestamp: '13:50' },
  e: { text: 'world 5',draggable: true,time: 30,timestamp: '14:13' },
}
const ListContext = React.createContext([{}, () => {}]);

const ListProvider = (props) => {
  const [state, setState] = useState(exampleData);

  remove = (item) => {
    
  }

  add = (item) => {

  }
  return (
    <ListContext.Provider value={[state, setState]}>
      {props.children}
    </ListContext.Provider>
  );
}

export { ListContext, ListProvider };
