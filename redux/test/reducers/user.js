const defaultState = {
    name: null


}


module.exports = function render(state = defaultState, action) {
    switch (action.type) {
        case 'UPDATE_USER_NAME':
            return {
                ...state,
                name: action.payload.name
            }
        default:
            return state;
    }
}