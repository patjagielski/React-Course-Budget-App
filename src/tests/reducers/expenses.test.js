import expenseReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () =>{
    const state = expenseReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('remove expense by id', () =>{
    const result = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expenseReducer(expenses, result);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('remove expense by id that does not exist', () =>{
    const result = {
        type: 'REMOVE_EXPENSE',
        id: 100
    };
    const state = expenseReducer(expenses, result);
    expect(state).toEqual(expenses);
});

test('add an expense', () => {
    const expense = {
        id: 100,
        description: 'testing',
        note: 't',
        amount: 10005,
        createdAt: -20419
    };
    const result = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expenseReducer(expenses, result);
    expect(state).toEqual([...expenses, expense]);
});

test('edit an expense', () => {
    const description = 'something new';
    const result = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        toUpdate :{
            description
        }
    };
    const state = expenseReducer(expenses, result);
    expect(state[0].description).toEqual(description);
});

test('not edit expense if expense not found', () => {
    const description = 'something new';
    const result = {
        type: 'EDIT_EXPENSE',
        id: '100',
        toUpdate :{
            description
        }
    };
    const state = expenseReducer(expenses, result);
    expect(state).toEqual(expenses);
});

test('set expenses', () => {
    const result = {
        type: 'SET_EXPENSES',
        expenses: [expenses[0]]
    };
    const state = expenseReducer(expenses, result);
    expect(state).toEqual([expenses[0]]);
});

