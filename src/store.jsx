import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import serviceOrdersReducer from './slices/serviceOrdersSlice'
import clientsReducer from './slices/clientsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        OS: serviceOrdersReducer,
        clients: clientsReducer,
    }
})