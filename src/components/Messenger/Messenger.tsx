import React, { Component, useImperativeHandle } from 'react'
import './Messenger.css'

import openSocket from 'socket.io-client'

import Login from '../Login/Login'
import MessengerView from '../MessengerView/MessengerView'
import { send } from 'q';

interface MessengerProps {
    url: string
}
interface MessengerStates {
    isLogged: boolean
    user?: User
    users: User[]
    messages: Message[]
}

export interface User {
    uid: string
    name: string
}

export interface Message {
    data: {
            sender: string
            type: string
            payload: string
            timestamp: number
            uid: string
            reason: string
        }
    messageType: string
    senderUser: User | undefined
}

export default class Messenger extends Component<MessengerProps, MessengerStates> {
    socket: SocketIOClient.Socket

    constructor (props: MessengerProps){
        super(props)

        this.socket = openSocket(props.url)

        this.state = {
            isLogged: false,
            user: undefined,
            users: [],
            messages: []
        }
    }

    componentWillUnmount() {
        this.setState({
            isLogged: false
        })
    }
    
    onLogin = (username: string) => {
        this.setState({
            isLogged: true
        })
        console.log('Logged in server side')

        this.socket.emit('login', username)
        this.socket.on('loggedin', (data: any) => {
            this.setState({
                users: data.users,
                user: data.user
            })
        })


        this.socket.on('user.loggedin', (data: any) => {
            this.setState(prevState => ({
                users: [...prevState.users, data.user]
            }))
            
            const messageType = 'login'
            data.payload = 'joined the channel'
            
            const newMessage = {
                data: data,
                messageType: messageType,
                senderUser: data.user
            }

            this.setState(prevState => ({
                messages: [...prevState.messages, newMessage]
            }))
        })

        this.socket.on('user.loggedout', (data: any) => {
            console.log(data)
            const senderUser = this.state.users.find(x => x.uid === data.uid)
            const messageType = 'logout'

            data.payload = 'left the channel (' + data.reason + ')'

            const newMessage = {
                data: data,
                messageType: messageType,
                senderUser: senderUser
            }

            console.log(newMessage)

            this.setState(prevState => ({
                messages: [...prevState.messages, newMessage]
            }))

            if (senderUser){
                this.setState(prevState => ({
                    users: prevState.users.filter(user => user.uid != senderUser.uid)
                }))
            }
        })

        this.socket.on('user.sent.message', (data: any) => {
            const senderUser = this.state.users.find(x => x.uid === data.sender)
            let messageType = 'extern'
            if(this.state.user && data.sender === this.state.user.uid) messageType = 'intern'

            const newMessage = {
                data: data,
                messageType: messageType,
                senderUser: senderUser
            }

            console.log(newMessage)

            this.setState(prevState => ({
                messages: [...prevState.messages, newMessage]
            }))
        })
    }

    handleSendMessage = (messageContent: string) => {
        if(this.state.user) {
            this.socket.emit('send.message', {
                type: 'text',
                payload: messageContent,
                timestamp: Date.now() 
            })
        }
    }

    render() {
        const {
            state,
            props,
            onLogin,
            handleSendMessage
        } = this

        const {
            url
        } = props

        const {
            isLogged,
            user,
            messages,
            users
        } = state

        return (
            <div className="messenger-container">
                {
                    (isLogged && user && users)
                    ?
                        <MessengerView messages={messages} user={user} users={users} url={url} handleSendMessage={handleSendMessage} />
                    :
                        <Login handleOnLogin={onLogin} />
                }
            </div>
        )
    }
}