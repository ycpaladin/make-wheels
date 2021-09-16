/**
 * 组合reudcers为一个reducer
 * @param {{[key: string]: (state: any, action: { type: string}) => any}} reducers 
 */
function combineReducers(reducers) {
    const keys = Object.keys(reducers);
    return (state = {}, action) => {
        return keys.reduce((prev, key) => {
            const reducer = reducers[key];
            const _state = prev[key];
            prev[key] = reducer(_state, action);
            return prev;
        }, state);
    }
}

module.exports = combineReducers