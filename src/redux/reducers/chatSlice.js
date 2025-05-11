// src/store/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    conversations: [],
    currentConversationId: null,
    isLoading: false,
    error: null,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // 这里的导出函数就包括了action 
        createConversation: (state, action) => {
            state.conversations.push(action.payload);
            state.currentConversationId = action.payload.id;
        },
        setCurrentConversation: (state, action) => {
            state.currentConversationId = action.payload;
        },
        addMessage: (state, action) => {
            const conversation = state.conversations.find(c => c.id === action.payload.conversationId);
            if (conversation) {
                conversation.messages.push(action.payload.message);
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { createConversation, setCurrentConversation, addMessage, setLoading, setError } = chatSlice.actions;
export default chatSlice.reducer;