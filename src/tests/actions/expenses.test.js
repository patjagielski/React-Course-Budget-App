import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startSetExpenses,setExpenses, startAddExpense, addExpense, editExpense, removeExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt})=>{
        expensesData[id] = {description, note, amount, createdAt};
    });
    database.ref('expenses').set(expensesData).then(()=>done());
});

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

test('should setup expense action object with data', ()=>{
    const result = setExpenses(expenses);
    expect(result).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('fetch expenses from firebase', (done) =>{
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const result = store.getActions();
        expect(result[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });

});