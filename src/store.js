import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage' // defaults to localStorage for web
import signupReducer from '../src/Auth/Signup/SignupSlice'
import loginReducer from '../src/Auth/Login/LoginSlice'
import forgotPasswordReducer from '../src/Auth/ForgotPassword/ForgotPasswordSlice'

const reducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    forgotPassword: forgotPasswordReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['signupReducer', 'loginReducer', 'forgotPasswordReducer']
}

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }),
}
);

const persistor = persistStore(store);

export { persistor }
export default store;