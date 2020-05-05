import React, { useState } from 'react';

const exampleDataList = [
  { id: 0,text: 'Mix 200g flour with 100g water',complete: false,draggable: true,time: 30,timestamp: '11:13' },
  { id: 1,text: 'world 2',complete: false,draggable: true,time: 30,timestamp: '11:13' },
  { id: 2,text: 'world 3',complete: false,draggable: true,time: 30,timestamp: '13:13' },
  { id: 3,text: 'world 4',complete: false,draggable: true,time: 30,timestamp: '13:50' },
  { id: 4,text: 'world 5',complete: false,draggable: true,time: 30,timestamp: '14:13' },
  { id: 5,text: 'world 5',complete: false,draggable: true,time: 30,timestamp: '14:13' },
  { id: 6,text: 'world 5',complete: false,draggable: true,time: 30,timestamp: '14:13' },
  { id: 7,text: 'world 5',complete: false,draggable: true,time: 30,timestamp: '14:13' },

  ]

  const theme = {
    primary: '#533A7B',
    contrast: 'white',
    secondary: '#4059AD'
  }

let exampleData = {
  lists: [{id: 0,name: "test",contents: exampleDataList, theme:theme,edit: true,lastAction: 'toggle',activeItemId: 0 }]
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
