import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
// import expect from 'expect';
// import deepFreeze from 'deep-freeze-strict'

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

// const combineReducers = (reducers) => {
//     return (state = {}, action) => {
//         return Object.keys(reducers).reduce(
//             (nextState, key) => {
//                 nextState[key] = reducers[key](
//                     state[key],
//                     action
//                 );
//                 return nextState;
//             },
//             {}
//         );
//     };
// };
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

// const todoApp = (state = {}, action) => {
//     return {
//         todos:  todos(
//             state.todos,
//             action
//             ),
//         visibilityFilter: visibilityFilter(
//             state.visibilityFilter,
//             action
//             )
//     };
// }


// console.log('Initial state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispatching ADD_TODO.');
// store.dispatch({
//     type: 'ADD_TODO',
//     id: 1,
//     text: 'Learn Redux'
// });
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispatching ADD_TODO.');
// store.dispatch({
//     type: 'ADD_TODO',
//     id: 2,
//     text: 'Go shopping'
// });
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispatching TOGGLE_TODO.');
// store.dispatch({
//     type: 'TOGGLE_TODO',
//     id: 3
// });
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispatching SET_VISIBILITY_FILTER.');
// store.dispatch({
//     type: 'SET_VISIBILITY_FILTER',
//     filter: 'SHOW_COMPLETED'
// });
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

const Link = ({
    active,
    currentFilter,
    children,
    onClick
}) => {
    if( active ) {
        return <span>{children}</span>;
    }
    return (
        <a href="#"
           onClick={ e => {
            e.preventDefault();
            onClick()
           }}
        >
            {children}
        </a>
        );
};

const mapStateToLinkProps = (
    state,
    ownProps
    ) => {
    return {
        active: 
        ownProps.filter === 
        state.visibilityFilter
    };
};

const mapDispatchToLinkProps = (
    dispatch,
    ownProps
    ) => {
    return {
        onClick: () => {
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: ownProps.filter
            });
        }
    };
}

const FliterLink = connect(
        mapStateToLinkProps,
        mapDispatchToLinkProps
    )(Link);


const Footer = () => (
    <p>
        Show:
        {' '}
        <FliterLink
            filter='SHOW_ALL'
        >
            ALL
        </FliterLink>
        {' '}
        <FliterLink
            filter='SHOW_ACTIVE'
        >
            ACTIVE
        </FliterLink>
        {' '}
        <FliterLink
            filter='SHOW_COMPLETED'
        >
            COMPLETED
        </FliterLink>
    </p>
    )

const Todo = ({
    onClick,
    completed,
    text
}) => (
    <li onClick={onClick}
    style={{
        textDecoration:
            completed ?
                'line-through' : 
                'none'
    }}
    >
        {text}
    </li>

);

const TodoList = ({
    todos,
    onTodoClick
}) => (
    <ul>
        {todos.map(todo =>  
            <Todo key={todo.id}
                  {...todo}
                  onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);
let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {
    let input;
    return (
        <div>
                <input ref={node => {
                    input = node;
                }}/>
                <button onClick={() => {
                      dispatch({
                        type: 'ADD_TODO',
                        id: nextTodoId++,
                        text: input.value
                    })
                    input.value = '';
                }}>
                    Add Todo
                </button>
        </div>
        );
};

AddTodo = connect()(AddTodo);


const getVisibleTodos = (
    todos,
    filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
                );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
                );
        default:
            return todos;
    }
}

const mapStateToTodoListProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
            )
    };
};

const mapDispatchToTodoListProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch({
                 type: 'TOGGLE_TODO',
                id
            })
        }
    }
};

const VisibleTodoList = connect(
        mapStateToTodoListProps,
        mapDispatchToTodoListProps
    )(TodoList);

const TodoApp = () =>
    (
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    );

Provider.propTypes = {
    store: PropTypes.object
};

    ReactDOM.render(
        <Provider store={createStore(todoApp)}>
            <TodoApp />
        </Provider>,
            document.getElementById('root')
        );
