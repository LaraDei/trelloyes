// make React available
import React from 'react';

// make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Card from './Card';



describe('Card component', () => {
    //smoke test
    it('renders without crashing', () => {
        // first create a DOM element to render the component into
      const div = document.createElement('div');
      // render the component, this is the actual test, if something is wrong it will fail here
      ReactDOM.render(<Card />, div);
      // clean up code
      ReactDOM.unmountComponentAtNode(div);
    });
// this is the test case



//snapshot test
it('renders the UI as expected', () => {
  const tree = renderer
    .create(<Card />)
    .toJSON();
  expect(tree).toMatchSnapshot();  
  });
})
