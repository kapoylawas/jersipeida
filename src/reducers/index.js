import {combineReducers} from 'redux'
import userReducer from './user'
import RajaOngkirReducer from './rajaongkir'
import AuthReducer from './auth'
import ProfileReducer from './profile'

const rootReducer = combineReducers({
    userReducer,
    RajaOngkirReducer,
    AuthReducer,
    ProfileReducer
})

export default rootReducer