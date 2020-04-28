import React, { useState } from 'react';

const exampleDataList = [
  { text: 'Mix ingridients',details:'x',draggable: true,timestamp: null },
  { text: 'world 2',draggable: true,time: 30,timestamp: '11:13' },
  { text: 'world 3',draggable: true,time: 30,timestamp: '13:13' },
  { text: 'world 4',draggable: true,time: 30,timestamp: '13:50' },
  { text: 'world 5',draggable: true,time: 30,timestamp: '14:13' },
  ]

  const theme = {
    primary: 'green',
    contrast: 'white',
    secondary: 'green'
  }

let exampleData = {
  lists: [{id: 0,name: "test",contents: exampleDataList, theme:theme,edit: true}]
}
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
