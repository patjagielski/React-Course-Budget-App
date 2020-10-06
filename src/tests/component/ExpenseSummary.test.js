import {ExpenseSummary} from '../../components/ExpenseSummary';
import React from 'react';
import { shallow } from'enzyme';

test('should correctly render ExpensesSummary with 1 expense', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount = {1} expenseTotal={240}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with multiple expense', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount = {12} expenseTotal={24012312}/>);
    expect(wrapper).toMatchSnapshot();
});