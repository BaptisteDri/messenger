import React, { Component } from 'react'
import './UsersList.css'

import { User } from '../Messenger/Messenger'

interface UsersListProps {
    users: User[]
}
interface UsersListStates {}

export default class UsersList extends Component<UsersListProps, UsersListStates> {
    constructor (props: UsersListProps) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props.users)
    }

    render() {
        const {
            props,
        } = this

        const {
            users
        } = props

        return (
            <div className="users-list-container">
                {
                    users.map(user => <div key={user.uid}>{user.name}</div>)
                }
            </div>
        )
    }
}