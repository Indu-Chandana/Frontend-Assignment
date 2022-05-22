import { combineReducers } from 'redux';
import myAuthreducer from './reducers/myProfile';

export default combineReducers({
    myProfile: myAuthreducer
});