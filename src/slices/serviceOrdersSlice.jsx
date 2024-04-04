import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceOrdersService from '../services/serviceOrders'

const initialState = {
    order: {},
    serviceOrders: [],
    error: false,
    success: false,
    loading: false,
    message: null
}


export const getOSInProgress = createAsyncThunk("serviceOrders/getOSInProgress",
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await serviceOrdersService.getOSInProgress(token);

        return data
    });

export const getAllServiceOrders = createAsyncThunk("serviceOrders/getall",
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await serviceOrdersService.getAllServiceOrders(token);

        return data
    });


// Update a OS

export const updateServiceOrderWithoutData = createAsyncThunk(
    "serviceOrders/updateWithoutData",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await serviceOrdersService.updateServiceOrderWithouData(id, token)


        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }


)

export const finalizeOS = createAsyncThunk(
    "serviceOrders/finalize",
    async (order, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await serviceOrdersService.finalizeOS(order, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

// Delete serviceOrders
export const deleteServiceOrder = createAsyncThunk(
    "serviceOrders/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = serviceOrdersService.deleteServiceOrder(id, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }
        return data

    }
)

// Create service Orders
export const createServiceOrder = createAsyncThunk(
    "serviceOrders/create",
    async (OS, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = serviceOrdersService.createServiceOrder(OS, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])

        }

        return data;
    }
)
export const serviceOrdersSlice = createSlice({
    name: "serviceOrders",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOSInProgress.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getOSInProgress.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
                state.serviceOrders = action.payload
            })
            .addCase(getOSInProgress.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.payload
            })
            .addCase(getAllServiceOrders.pending, (state) => {
                state.loading = true;
                state.error = false;

            })
            .addCase(getAllServiceOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.serviceOrders = action.payload
            })
            .addCase(updateServiceOrderWithoutData.pending, (state) => {
                state.loading = true;
                state.error = false
            })
            .addCase(updateServiceOrderWithoutData.fulfilled, (state, action) => {

                state.loading = false;
                state.success = true;
                state.error = null

                state.serviceOrders.map((OS) => {
                    if (OS._id === action.payload.Os._id) {
                        return OS.finished = action.payload.Os.finished
                    }

                    return OS
                })

                state.message = action.payload.message


            })
            .addCase(updateServiceOrderWithoutData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteServiceOrder.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(deleteServiceOrder.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.payload

            })
            .addCase(deleteServiceOrder.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.message = action.payload.message
                state.serviceOrders = state.serviceOrders.filter((OS) => {
                    return OS._id !== action.payload.OS._id
                })
            })
            .addCase(createServiceOrder.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(createServiceOrder.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.payload
            })
            .addCase(createServiceOrder.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
                state.message = action.payload.message
                state.order = action.payload.createdOrder
                state.serviceOrders.unshift(state.order)
            })
            .addCase(finalizeOS.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(finalizeOS.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(finalizeOS.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
                state.message = action.payload.message
                state.serviceOrders = state.serviceOrders.filter((OS) => {
                    return OS._id !== action.payload.order._id
                })

            })

    }
})

export const { resetMessage } = serviceOrdersSlice.actions

export default serviceOrdersSlice.reducer
