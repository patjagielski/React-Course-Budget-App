import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

test('should setup remove expense action object', ()=>{
    const action = removeExpense({id:'123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expense action object', ()=>{
    const result = editExpense('123abc', {note: 'testing testing'});
    expect(result).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        toUpdate:{
            note: 'testing testing'
        }
    });
});

test('checking addExpense action object with values', ()=>{
    const testObject = {
        description: 'something',
        amount: 12345,
        createdAt: 1000,
        note: 'testing'
    }
    const result = addExpense(testObject);
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense:{
            ...testObject,
            id: expect.any(String)
        }
    });
});

test('checking addExpense action object with default values', ()=>{
    const testObject = addExpense();
    const result = addExpense(testObject);
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense:{
            id: expect.any(String),
            description: '',
            amount: 0,
            createdAt: 0,
            note: ''
        }
    });
});