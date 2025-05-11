// src/components/ChatAssistant.js
import React, { useState, useEffect, useRef } from 'react';
import { Layout, Input, Button, List, Typography, Spin, Flex, Splitter } from 'antd';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { createConversation, addMessage, setLoading, setError, setCurrentConversation } from '../redux/reducers/chatSlice';

const { Sider, Content } = Layout;
const { TextArea } = Input;
const { Text } = Typography;


const StyledSider = styled(Sider)`
  background: #fff;
  padding: 3px;
`;

const ChatContainer = styled(Content)`
  display: flex;
  flex-direction: column;
  padding: 200px;
  background: #f0f2f5;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 100px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
`;

const MessageItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const MessageContent = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${props => props.isUser ? '#1890ff' : '#fff'};
  color: ${props => props.isUser ? '#fff' : '#000'};
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const ConversationItem = styled(List.Item)`
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f0f2f5;
  }
`;

function ChatAssistant() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const messageListRef = useRef(null);

    const { conversations, currentConversationId, isLoading } = useSelector(state => state.aichat);
    const currentConversation = conversations.find(c => c.id === currentConversationId);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [currentConversation?.messages]);

    const handleNewConversation = () => {
        const newConversation = {
            id: uuidv4(),
            title: `新对话 ${conversations.length + 1}`,
            messages: [],
            createdAt: Date.now(),
        };
        dispatch(createConversation(newConversation));
    };

    const handleSendMessage = async () => {
        if (!input.trim() || !currentConversationId) return;

        const userMessage = {
            id: uuidv4(),
            role: 'user',
            content: input,
            timestamp: Date.now(),
        };

        dispatch(addMessage({ conversationId: currentConversationId, message: userMessage }));
        dispatch(setLoading(true));
        setInput('');

        try {
            // 替换为实际的API端点
            const eventSource = new EventSource(
                `http://your-api-endpoint/chat?prompt=${encodeURIComponent(input)}&conversationId=${currentConversationId}`
            );

            let assistantMessage = '';

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.content === '[DONE]') {
                    eventSource.close();
                    dispatch(setLoading(false));
                    return;
                }

                assistantMessage += data.content;

                dispatch(addMessage({
                    conversationId: currentConversationId,
                    message: {
                        id: uuidv4(),
                        role: 'assistant',
                        content: assistantMessage,
                        timestamp: Date.now(),
                    },
                }));
            };

            eventSource.onerror = (error) => {
                console.error('SSE Error:', error);
                eventSource.close();
                dispatch(setLoading(false));
                dispatch(setError('连接出错，请重试'));
            };

        } catch (error) {
            console.error('Error:', error);
            dispatch(setError(error.message));
            dispatch(setLoading(false));
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div onWheel={(e) => e.stopPropagation()}>
            <Splitter
                style={{
                    height: '50%',
                    // width: 600,
                    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Splitter.Panel collapsible resizable={false}>
                    <StyledSider >
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            block
                            onClick={handleNewConversation}
                            style={{ marginBottom: 20 }}
                        >
                            新建对话
                        </Button>
                        <List
                            dataSource={conversations}
                            renderItem={conversation => (
                                <ConversationItem
                                    onClick={() => dispatch(setCurrentConversation(conversation.id))}
                                    style={{
                                        background: currentConversationId === conversation.id ? '#e6f7ff' : 'transparent',
                                    }}
                                >
                                    <Text ellipsis>{conversation.title}</Text>
                                </ConversationItem>
                            )}
                        />
                    </StyledSider>
                </Splitter.Panel>

                <Splitter.Panel>
                    <Splitter layout="vertical">
                        <Splitter.Panel>
                            <MessageList ref={messageListRef}>
                                {currentConversation?.messages.map(message => (
                                    <MessageItem key={message.id} isUser={message.role === 'user'}>
                                        <MessageContent isUser={message.role === 'user'}>
                                            {message.content}
                                        </MessageContent>
                                    </MessageItem>
                                ))}
                                {isLoading && (
                                    <MessageItem isUser={false}>
                                        <Spin />
                                    </MessageItem>
                                )}
                            </MessageList>
                        </Splitter.Panel>
                        <Splitter.Panel>

                            <InputContainer>
                                <TextArea
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder="输入消息..."
                                    autoSize={{ minRows: 1, maxRows: 4 }}
                                    onKeyPress={handleKeyPress}
                                    style={{ flex: 1 }}
                                />
                                <Button
                                    type="primary"
                                    icon={<SendOutlined />}
                                    onClick={handleSendMessage}
                                    disabled={!input.trim() || isLoading}
                                />
                            </InputContainer>
                        </Splitter.Panel>
                    </Splitter>
                </Splitter.Panel>
            </Splitter>
        </div>
    );
}

export default ChatAssistant;