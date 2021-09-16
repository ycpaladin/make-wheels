const { createStore, applyMiddleware } = require('../../redux');
// const { createStore, applyMiddleware } = require('redux');
const { rootReducers } = require('./reducers');
const thunk = require('../middlewares/redux-thunk');
const enhancer = applyMiddleware(thunk);
const { getState, dispatch, subscribe } = createStore(rootReducers, enhancer)

subscribe(() => {
    const state = getState();
    console.log('listen1', state);
})


// dispatch({ type: 'UPDATE_USER_NAME', payload: { name: 'ckckck' } })

const action = dispatch => {
    dispatch({ type: 'LOADING' });
    setTimeout(() => {
        dispatch({ type: 'UPDATE_USER_NAME', payload: { name: 'ckckck' } })
    }, 2000);
}

dispatch(action);