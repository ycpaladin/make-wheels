/**
 * 
 * @param {(state: any, action: { type: string, [key: string]: any}) => any} reducer
 * @param {{[key: string]: any} | (createStore: () => any) => any} initStateOrEnhancer 
 * @returns 
 */
function createStore(reducer, initStateOrEnhancer, enhancer) {

    if (typeof initStateOrEnhancer === 'function') {
        return initStateOrEnhancer(createStore)(reducer);
    }

    if (typeof enhancer === 'function') {
        return enhancer(createStore)(reducer, initStateOrEnhancer);
    }

    const INIT_ACTION = '@redux\\init';

    let state = initStateOrEnhancer;

    const listenters = [];

    // const middlewares = middlewares || [];

    function getState() {
        return state;
    }

    function dispatch(action) {
        const nextState = reducer(state, action);
        state = nextState;
        listenters.forEach(listen => {
            listen(state, action);
        });
    }

    function subscribe(listenter) {
        const index = listenters.push(listenter);
        return () => {
            listenters.splice(index, 1);
        };
    }

    dispatch({ type: INIT_ACTION })

    return {
        getState,
        dispatch,
        subscribe
    }
}

module.exports = createStore