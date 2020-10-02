import {createStore } from 'redux';


const incrementCount =({ incrementBy = 1 }) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1 }) =>({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({setBy = 0}) => ({
    type: 'SET',
    setBy
});

const resetCount = ({count = 0}) =>({
    type: 'RESET'
});

//Reducers
//1. Reducers are pure functions aka works with stuff in the input
//2. Never change state or action

const countReducer =(state = {count: 0}, action) => {
    switch (action.type){
        case 'INCREMENT':
            return{
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'RESET':
            return{
                count: 0
            };
        case 'SET':
            return{
                count: action.setBy
            }
        default:
            return state;
    }
};

const store = createStore(countReducer);

const unsub = store.subscribe(()=>{
    console.log(store.getState());
});


// Action - an object that gets sent to the store

//increment count
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 10
// });
store.dispatch(incrementCount({ incrementBy: 5 }));

// store.dispatch({
//     type: 'DECREMENT'
// });
store.dispatch(decrementCount({ }));
// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 1000
// });
store.dispatch(decrementCount({decrementBy: 1000}));
//reset count
// store.dispatch({
//     type: 'RESET'
// });
store.dispatch(resetCount({}));

// store.dispatch({
//     type: 'SET',
//     count: 2004
// });
store.dispatch(setCount({ setBy: 2004 }));