import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientsService from "../services/clientsService";

const initialState = {
    OSClients: [],
    client: {},
    clients: [],
    error: false,
    success: false,
    loading: false,
    message: null
}


// Slice for Create client

export const createClient = createAsyncThunk(
    "clients/create",
    async (client, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token

        const data = await clientsService.createClient(client, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }


        return data



    }
)

// Slice for read all clients

export const getAllClients = createAsyncThunk(
    "clients/getAll",
    async (_, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token

        const data = await clientsService.getClients(token)

        return data


    }
)

// Slice for get client by id

export const getClientById = createAsyncThunk(
    "client/getById",
    async(id, thunkAPI) => {
        console.log("chegou no Slice");
        const token = thunkAPI.getState().auth.user.token

        const data = await clientsService.getClientById(id, token) 

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data

    }
)

// Slice For delet client

export const deleteClient = createAsyncThunk(
    "clients/deleteClient",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        

        const data = await clientsService.deleteClient(id, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)


// Slice 
const clientSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {
        reset: (state) => {
            state.error = false
            state.success = false
            state.loading = false
            state.message = null
        },
        resetMessages: (state) => {
            state.error = null
            state.message = null
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(createClient.pending, (state) => {
                state.loading = true;
                state.error = false
            })
            .addCase(createClient.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false;
                state.error = false;
                state.success = true;
                state.message = action.payload.message
                state.clients.unshift(action.payload.newClient)

            })
            .addCase(createClient.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload

            })
            .addCase(getAllClients.pending, (state) => {
                state.loading = true;
                state.error = false;

            })
            .addCase(getAllClients.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.clients = action.payload
            })
            .addCase(deleteClient.pending, (state) => {
                state.error = false
                state.loading = true

            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.payload
            })
            .addCase(deleteClient.fulfilled, (state, action) =>{
                state.loading = false
                state.success = true
                state.error = false
                state.message = action.payload.message

                state.clients = state.clients.filter((client) => {
                    return client._id !== action.payload.client._id
                })
            })
            .addCase(getClientById.pending, (state)=>{
                state.loading = true
                state.error = false
            })
            .addCase(getClientById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.success = false
                
            })
            .addCase(getClientById.fulfilled, (state, action) => {
                state.error = false
                state.loading = false
                state.success = true
                state.client = action.payload.client
                state.OSClients = action.payload.ServicesOrderClient
            })
    }
})


export const { reset, resetMessages } = clientSlice.actions

export default clientSlice.reducer