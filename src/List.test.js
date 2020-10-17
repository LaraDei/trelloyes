// make React available
import React from 'react';

// make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import List from './List';
import store from './STORE'

describe('List component', () => {

  const cards = [store.allCards['a'], store.allCards['b'], store.allCards['c']]
  //smoke test
  it('renders without crashing', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');
    // render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(<List header="Header" cards={cards}/>, div);
    // clean up code
    ReactDOM.unmountComponentAtNode(div);
  });




  //snapshot test
  it('renders the UI as expected', () => {

    const tree = renderer
    .create(<List header="Header" cards={cards} />)
    .toJSON();
    expect(tree).toMatchSnapshot();  
  });
})