import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducer from './reducer';

class Store {
    makeStore() {
        return createStore(Reducer, applyMiddleware(ReduxThunk));
    }
}

export default new Store();
