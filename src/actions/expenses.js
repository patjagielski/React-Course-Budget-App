import uuid from 'uuid';
import database from '../firebase/firebase';
import expenses from '../tests/fixtures/expenses';

//ADD EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense    
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, createdAt};

        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

//REMOVE EXPENSE
export const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//START REMOVE EXPENSES
export const startRemoveExpense = ({id}) => {
    return(dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }));
        });
    };
};

//START EDIT EXPENSE
export const startEditExpense = (id, toUpdate) => {
    return (dispatch, getState)=> {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(toUpdate).then(() => {
            dispatch(editExpense(id, toUpdate));
        });
    };
};

//EDIT EXPENSE
export const editExpense = (id, toUpdate) => ({
    type: 'EDIT_EXPENSE',
    id, 
    toUpdate
});

//SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return(dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`)
        .once('value')
        .then((snapshot) => {
            const expenses = [];

            snapshot.forEach((childSnap) => {
                expenses.push({
                    id: childSnap.key,
                    ...childSnap.val()
                });
            });
        dispatch(setExpenses(expenses));
        });
    };
};