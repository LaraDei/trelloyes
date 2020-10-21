import React, { Component } from 'react';
import STORE from './STORE'
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
const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}
function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

class App extends Component {
  state = {
    store: STORE,
  };

  handleDeleteCard = (cardId) => {
    const { lists, allCards } = this.state.store;

    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
  };

  handleAddCard = (listId) => {
    const newCard = newRandomCard()

    const newLists = this.state.store.lists.map(list => {
      if (list.id === listId) {
	return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      return list;
    })

    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })
  };	  



  render() { 
      const { store } = this.state
      return (
      <main className='App'>
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
             key={list.id}
             id={list.id}
             header={list.header}
             cards={list.cardIds.map(id => store.allCards[id])}
             onClickDelete={this.handleDeleteCard}
             onClickAdd={this.handleAddCard}
            />
          ))}
        </div>
     </main>
     );
  }
}

export default App;