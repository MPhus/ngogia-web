import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_GetInfo } from '~/apis'
export const fetchWebInfo = createAsyncThunk(
	'web/fetchWebInfo',
	async (_, thunkAPI) => {
		try {
			const data = await API_GetInfo()
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response?.data || 'Error')
		}
	}
)

const initialState = {
	info: null,
	status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null
}
const infoSlice = createSlice({
	name: 'web',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWebInfo.pending, (state) => {
				state.status = 'loading'

			})
			.addCase(fetchWebInfo.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.info = action.payload
				localStorage.setItem('webInfo', JSON.stringify(action.payload))
			})
			.addCase(fetchWebInfo.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
	},
})

// export const { addInfo } = infoSlice.actions
export default infoSlice.reducer