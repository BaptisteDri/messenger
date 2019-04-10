import React, { Component } from 'react'
import './MessengerView.css'

import { User, Message } from '../Messenger/Messenger'
import UsersList from '../UsersList/UsersList';
import MessagesList from '../MessagesList/MessagesList'
import NewMessageForm from '../NewMessageForm/NewMessageForm'

interface MessengerViewProps {
    url: string
    user: User
    users: User[]
    messages: Message[]
    handleSendMessage: (messageContent: string) => void
}
interface MessengerViewStates {}

export default class MessengerView extends Component<MessengerViewProps, MessengerViewStates>{
    render() {
        const {
            props
        } = this

        const {
            handleSendMessage,
            url,
            messages,
            users
        } = props

        return (
            <div className="messenger-view-container row">
                <div className="column column-75">
                    <MessagesList messages={messages} />
                    <NewMessageForm url={url} handleSendMessage={handleSendMessage} />
                </div>
                <div className="column column-25">
                    {/* Tools */}
                    <UsersList users={users} />
                </div>
            </div>
        )
    }
}