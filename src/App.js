import React, { Component } from 'react';
import List from './List';
import './App.css';



/* ES6 class syntax is used to define a REact component
it has access to react features like local stats and lifecycle hooks

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
*/



/*To render a component as a child in a React component, you include the component name written as a custom HTML tag in the JSX
this is done below with <List/>.
When React encounters a custom HTML tag that references another component (a component name wrapped in < /> like in this example), 
it renders the markup for that component in the location of the tag.
*/



class App extends Component {
  static defaultProps  = {
    store: {
      lists: [],
      allCards: {},
    }
  };



  render() { 
      const { store } = this.props
      return (
      <main className='App'>
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
             key={list.id}
             header={list.header}
             cards={list.cardIds.map(id => store.allCards[id])}
            />
          ))}
        </div>
     </main>
     );
  }
}

export default App;