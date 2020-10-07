import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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
    const result = addExpense(expenses[1]);
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[1]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'keyboard',
        amount: '10000',
        note: 'Motorspeed',
        createdAt: 1000000
    };

    store.dispatch(startAddExpense(expenseData)).then(() =>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();;        
    });
});

test('should add expense to database with defaults and store', (done) => {
    const store = createMockStore({});
    const expenseDefault = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(() =>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault);
        done();        
    });
});
// test('checking addExpense action object with default values', ()=>{
//     const testObject = addExpense();
//     const result = addExpense(testObject);
//     expect(result).toEqual({
//         type: 'ADD_EXPENSE',
//         expense:{
//             id: expect.any(String),
//             description: '',
//             amount: 0,
//             createdAt: 0,
//             note: ''
//         }
//     });
// });