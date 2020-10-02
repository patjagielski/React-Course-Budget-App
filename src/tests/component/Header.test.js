import { shallow } from'enzyme';
import React from 'react';
import Header from '../../components/Header';

test('render the Header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
    
    // expect(wrapper.find('h1').text()).toBe('Budget Application');
    
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
});