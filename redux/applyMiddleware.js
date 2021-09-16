const compose = require('./compose');

function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, preloadState) => {
        const store = createStore(reducer, preloadState)
        const { getState, dispatch: _dispatch } = store;
        const middlewareApi = {
            getState,
            dispatch: _dispatch
        }
        const chain = middlewares.map(middleware => middleware(middlewareApi))
        const dispatch = compose(...chain)(store.dispatch)
        return {
            ...store,
            dispatch
        };
    }
}

module.exports = applyMiddleware;