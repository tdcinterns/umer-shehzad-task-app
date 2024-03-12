import { createSlice, nanoid, createAsyncThunk, } from '@reduxjs/toolkit';
import axios from 'axios';

import CONSTANT from '../constants/constant';

const initialState = {
    tasks: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

const getUserID = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    return userData ? userData.id : null;
}

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        try {
            const userID = getUserID();
            if (!userID) {
                throw new Error("User ID not available");
            }

            const response = await axios.get(`${CONSTANT.baseURL}/${userID}/task`);
            return [...response.data]; //return a data in new array 
        } catch (err) {
            // Handle specific error cases
            if (err.response && err.response.status === 404) {
                // Task not found error
                return [];
            } else {
                // Other errors
                throw err;
            }
        }
    }
)

export const addNewTask = createAsyncThunk(
    'tasks/addNewTask',
    async (newTaskPayload) => {
        try {
            const userID = getUserID();
            if (!userID) {
                throw new Error("User ID not available");
            }
            const response = await axios.post(`${CONSTANT.baseURL}/${userID}/task`, newTaskPayload);
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
)

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (getTask) => {
        const { id } = getTask;
        try {
            const userID = getUserID();
            if (!userID) {
                throw new Error("User ID not available");
            }
            const response = await axios.put(`${CONSTANT.baseURL}/${userID}/task/${id}`, getTask);
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
)

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (getTaskId) => {
        const { id } = getTaskId;
        try {
            const userID = getUserID();
            if (!userID) {
                throw new Error("User ID not available");
            }
            const response = await axios.delete(`${CONSTANT.baseURL}/${userID}/task/${id}`);
            if (response?.status === 200) return getTaskId;
            return `${response?.status}: ${response?.statusText}`
        } catch (err) {
            return err.message;
        }
    }
)

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // addTask: {
        //     reducer(state, action) {
        //         state.posts.push(action.payload)
        //     },
        //     prepare(title, content, userId) {
        //         return {
        //             payload: {
        //                 id: nanoid(),   
        //                 title,
        //                 content,
        //                 date: new Date().toISOString(),
        //                 userId,
        //                 reactions: {
        //                     thumbsUp: 0,
        //                     wow: 0,
        //                     heart: 0,
        //                 }
        //             }
        //         }
        //     }
        // },
        // addReaction(state, action) {
        //     const { postId, reaction } = action.payload;
        //     const existingPost = state.posts.find(post => post.id === postId);
        //     if (existingPost) {
        //         existingPost.reactions[reaction]++;
        //     }
        // },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete');
                    return;
                }
                const updatedTask = action.payload;
                const index = state.tasks.findIndex(task => task.id === updatedTask.id);
                if (index !== -1) {
                    state.tasks[index] = updatedTask;
                } else {
                    console.log('Task not found');
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete');
                    return;
                }
                const { id } = action.payload;
                const tasks = state.tasks.filter(task => task.id !== id);
                state.tasks = tasks;
            })
    }
});

export const selectAllTasks = (state) => state.tasks.tasks;
export const getTasksStatus = (state) => state.tasks.status;
export const getTaskError = (state) => state.tasks.error;

export const selectTaskById = (state, taskId) => state.tasks.tasks.find(task => task.id === taskId);

// export const { addPost, addReaction } = postsSlice.actions;

export default tasksSlice.reducer;