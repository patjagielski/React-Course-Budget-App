import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'date'
    };
    const action = {type: 'SORT_BY_DATE'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('set text filter', ()=>{
    const currentState = {
        text: 'TEST',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'date'
    };
    const action = {type: 'SET_TEXT_FILTER'};
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe(undefined);
});

test('set startDate filter', ()=>{
    const action = {type: 'SET_TEXT_FILTER'};
    const currentState = {
        text: '',
        startDate: moment(100),
        endDate: undefined,
        sortBy: 'date'
    };
    const state = filtersReducer(currentState, action);
    expect(state.startDate).toEqual(moment(100));
});

test('set endDate filter', () => {
    const action = {type: 'SET_TEXT_FILTER'};
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: moment(100),
        sortBy: 'date'
    };
    const state = filtersReducer(currentState, action);
    expect(state.endDate).toEqual(moment(100));
});