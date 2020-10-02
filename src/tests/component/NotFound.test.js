import { shallow } from'enzyme';
import React from 'react';
import NotFoundPage from '../../components/NotFound';

test('render the NotFoundPage correctly', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
});