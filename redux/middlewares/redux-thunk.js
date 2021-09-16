module.exports = function thunk(middlewareApi) {
    const { dispatch, getState } = middlewareApi;
    return next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }
        return next(action);
    }
}