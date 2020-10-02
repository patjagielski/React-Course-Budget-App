import {setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter} from '../../actions/filters';
import moment from 'moment';

test('generate set start date action object', ()=>{
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        setStartDate: moment(0)
    });
});

test('generate set end date action object', ()=>{
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        setEndDate: moment(0)
    });
});

test('checking sorting by Amount', ()=>{
    const result = sortByAmount();
    expect(result).toEqual({
        type:'SORT_BY_AMOUNT'
    });
});

test('checking sorting by Date', ()=>{
    const result = sortByDate();
    expect(result).toEqual({
        type:'SORT_BY_DATE'
    });
});

test('checking set filter action object with with values', ()=>{
    const result = setTextFilter('123abc');
    expect(result).toEqual({
        type: 'SET_TEXT_FILTER',
        text: '123abc'
    });
});

test('checking set filter action object with without values', ()=>{
    const result = setTextFilter();
    expect(result).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});