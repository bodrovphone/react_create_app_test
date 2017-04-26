import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze-strict'
// import App from './App';
// import './index.css';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );


// const counter = (state = 0, action) => {
//     switch (action.type) {
//         case 'INCREMENT':
//             return state + 1;
//         case 'DECREMENT':
//             return state - 1;
//         default:
//             return state;
//     }
// }


// const store = createStore(counter);

// const Counter = ({ 
//     value,
//     onIncrement,
//     onDecrement
//      }) => (
//         <div>
//             <h1>{value}</h1>
//             <button onClick={onIncrement}>+</button>
//             <button onClick={onDecrement}>-</button>
//         </div>
//     );


// const render = () => {
//     ReactDOM.render(
//         <Counter 
//             value={store.getState()} 
//             onIncrement={() => 
//                 store.dispatch({
//                     type: 'INCREMENT'
//                 })
//             }
//             onDecrement={() => 
//                 store.dispatch({
//                     type: 'DECREMENT'
//                 })
//             }
//         />,
//         document.getElementById('root')
//         );
// };

// store.subscribe(render);
// render();
const todo = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
          return {
                    id: action.id,
                    text: action.text,
                    completed: false
                 };
        case 'TOGGLE_TODO':
            if(state.id !== action.id) {
                    return state;
                }
                return {
                    ...state,
                    completed: !state.completed
                };
        default: 
            return state;
}
};

const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(stateAfter);

    expect(
        todos(stateBefore, action)
        ).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter = [
        {
            id: 0,
            text: 'learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: true
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
}

const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todoApp = (state = {}, action) => {
    return {
        todos:  todos(
            state.todos,
            action
            ),
        visibilityFilter: visibilityFilter(
            state.visibilityFilter,
            action
            )
    };
}

const store = createStore(todoApp);
console.log('Initial state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Go shopping'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching TOGGLE_TODO.');
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching SET_VISIBILITY_FILTER.');
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');



// testAddTodo();
// testToggleTodo();
// console.log('All tests passed.');