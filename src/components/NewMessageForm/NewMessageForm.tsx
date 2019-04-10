import React, { Component } from 'react'
import './NewMessageForm.css'

import openSocket from 'socket.io-client'

interface NewMessageFormProps {
    url: string
    handleSendMessage: (messageContent: string) => void
}
interface NewMessageFormStates {
    messageContent: string
}

export default class NewMessageForm extends Component<NewMessageFormProps, NewMessageFormStates> {
    constructor (props: NewMessageFormProps) {
        super(props)
    
        this.state = {
            messageContent: ''
        }
    }

    handleMessageContentChange = (e: any) => {
        this.setState({ messageContent: e.currentTarget.value })
    }

    handleSendMessageValidation = (e: any) => {
        if (e.key === 'Enter') {
            this.props.handleSendMessage(this.state.messageContent)
            this.setState({
                messageContent: ''
            })
        }
    }

    render() {
        const {
            state,
            handleMessageContentChange,
            handleSendMessageValidation
        } = this

        const {
            messageContent
        } = state

        return (
            <div className="new-message-form-container">
                <fieldset>
                    <input 
                        type="text"
                        id="messageContentField"
                        value={messageContent}
                        onChange={handleMessageContentChange}
                        onKeyDown={handleSendMessageValidation}
                    />
                </fieldset>
            </div>
        )
    }
}