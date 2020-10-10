import { shallow } from'enzyme';
import React from 'react';
import LoadingPage from '../../components/LoadingPage';

test('render the LoadingPage correctly', () => {
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper).toMatchSnapshot();
});