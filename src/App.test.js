import { render } from '@testing-library/react';
import {expect, mount} from "jest-canvas-mock";
import App from './App';

it('renders learn react link', () => {
  const div = document.createElement('div');
  render(<App />, div);
});

it('testing homepage loading', () => {
  const app = mount(<App />);
  const heading = <h1 className="dashboardhead">Build your Audience</h1>
  render(app.contains(heading)).toEqual(true);
});
