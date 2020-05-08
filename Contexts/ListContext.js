import React, { useState } from 'react';

const exampleDataList = [
  { id: 0,type:'text',text: 'Mix Starter with Water',complete: false,draggable: true,time: 0},
  { id: 1,type:'text',text: 'Fold dought',complete: false,draggable: true,time: 0},
  { id: 2,type:'timer',text: '',complete: false,draggable: true,time: 5},
  { id: 3,type:'text',text: 'Fold dought',complete: false,draggable: true,time: 0},
  { id: 4,type:'timer',text: '',complete: false,draggable: true,time: 10},
  { id: 5,type:'text',text: 'Fold dought',complete: false,draggable: true,time: 0},
  { id: 6,type:'text',text: 'Heat oven to 250c',complete: false,draggable: true,time: 0},
  { id: 7,type:'text',text: 'Bake the bread for 45min',complete: false,draggable: true,time: 0},
  { id: 8,type:'text',text: 'Let bread cool',complete: false,draggable: true,time: 0},
  { id: 9,type:'text',text: 'Yay bread!',complete: false,draggable: true,time: 0},

  ]

  const theme = {
    primary: '#533A7B',
    contrast: 'white',
    secondary: '#4059AD'
  }

let exampleData = {
  lists: [{id: 0,name: "test",contents: exampleDataList, theme:theme,edit: false,lastAction: 'toggle',activeItemId: 0 }]
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
