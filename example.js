import SortableListView from 'react-native-sortable-listview'
let React = require('react')
let { View, Text, TouchableHighlight } = require('react-native')
import styles from './style.scss';
let data = {
  hello: { text: 'world' },
  how: { text: 'are you' },
  test: { text: 123 },
  this: { text: 'is' },
  a: { text: 'a' },
  real: { text: 'real' },
  drag: { text: 'drag and drop' },
  bb: { text: 'bb' },
  cc: { text: 'cc' },
  dd: { text: 'dd' },
  ee: { text: 'ee' },
  ff: { text: 'ff' },
  gg: { text: 'gg' },
  hh: { text: 'hh' },
  ii: { text: 'ii' },
  jj: { text: 'jj' },
  kk: { text: 'kk' },
}

let order = Object.keys(data) //Array of keys

class RowComponent extends React.Component {
  render() {
    return (
      <View         style={styles.box}>
      <Text>{this.props.data.text}</Text>

      <TouchableHighlight
        underlayColor={'#eee'}
        style={styles.dragHandler}
        {...this.props.sortHandlers}
      >
      <Text>DRAG</Text>
      </TouchableHighlight>
      </View>
    )
  }
}

class Example extends React.Component {
  render() {
    return (
      <SortableListView
        style={styles.maxWidth}
        data={data}
        order={order}
        onRowMoved={e => {
          order.splice(e.to, 0, order.splice(e.from, 1)[0])
          this.forceUpdate()
        }}
        renderRow={row => <RowComponent data={row} />}
      />
    )
  }
}

export default Example
