const { combineReducers } = require('../../../redux');
const user = require('./user');
const role = require('./role');

const rootReducers = combineReducers({
    user,
    role
});

module.exports = {
    rootReducers
}