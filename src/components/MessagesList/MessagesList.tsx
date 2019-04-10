import React, { Component } from 'react'
import './MessagesList.css'

import { Message } from '../Messenger/Messenger'

interface MessagesListProps {
    messages: Message[]
}
interface MessagesListStates {}

export default class MessagesList extends Component<MessagesListProps, MessagesListStates> {
    constructor (props: MessagesListProps) {
        super(props)
    }

    render() {
        const {
            props
        } = this

        const {
            messages
        } = props

        return (
            <div className="messages-list-container">
                {
                    messages.map(message => 
                        <div key={message.data.timestamp}>
                            {
                                message.senderUser &&
                                <div>
                                    <div className={message.messageType}>
                                        <span>{message.senderUser.name} : </span>{message.data.payload}
                                    </div>
                                </div>
                            }
                        </div>
                    )
                }
                    {/* <div>
                        <div>
                            <div className="logout">
                                test left the room
                            </div>
                            <div className="login">
                                test joined the room
                            </div>
                        </div>
                    </div> */}
            </div>
        )
    }
}