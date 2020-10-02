import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';


//ADD EXPENSE
const addExpense = (
    { 
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0
    } = {}) => ({
        type: 'ADD_EXPENSE',
        expense: {
        id: uuid(),
        description,
        createdAt, 
        amount, 
        note
    }
});

//REMOVE EXPENSE
const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT EXPENSE
const editExpense = (id, toUpdate) => ({
    type: 'EDIT_EXPENSE',
    id, 
    toUpdate
});

//SET TEXT FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

//SORT BY DATE
const sortByDate = () =>({
    type: 'SORT_BY_DATE'
});

//SORT BY AMOUNT 
const sortByAmount = () =>({
    type: 'SORT_BY_AMOUNT'
});
//SET START DATE
const setStartDate = (setStartDate) => ({
    type: 'SET_START_DATE',
    setStartDate
});

//SET END DATE
const setEndDate = (setEndDate) => ({
    type: 'SET_END_DATE',
    setEndDate
});



//Expense Reducer
const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
           return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.toUpdate
                    };
                }else{
                    return expense;
                };
            });
        default:
            return state;
    }
};

//Filter Reducer
const filterReducerDefault = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filterReducer = (state = filterReducerDefault, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.setStartDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.setEndDate
            };
        default:
            return state;
    }
};

//Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch =  typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        }else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1: -1
        };
    });
};


//store creation
const store = createStore(combineReducers({ expenses: expensesReducer, filters: filterReducer }));

store.subscribe(() => {
    const state = store.getState();
    const visiblExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visiblExpenses);
});

const expenseOne = store.dispatch(addExpense({description:'rent is due', amount:100, createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({description:'coffee', amount:300, createdAt:-1000}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());


// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(125));

// store.dispatch(setTextFilter('rent'));


const demoState = {
    expenses: [{
        id: 'poiasdfn',
        description: 'Some info here',
        note: 'lalala',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
};
