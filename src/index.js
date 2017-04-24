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
const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
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

testAddTodo();
console.log('All tests passed.');