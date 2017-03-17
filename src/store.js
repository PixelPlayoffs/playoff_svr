import {createStore} from 'redux';
import Reducer from './reducer';

class Store {
    makeStore() {
        return createStore(Reducer);
    }
}

export default new Store();
