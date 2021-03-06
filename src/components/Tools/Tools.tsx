import React, { Component } from 'react'
import './Login.css'

interface LoginProps {
    handleOnLogin: (username: string) => void
}
interface LoginStates {
    username: string
}

export default class Login extends Component<LoginProps, LoginStates> {
    constructor (props: LoginProps) {
        super(props)

        this.state = {
            username: ''
        }
    }

    handleUsernameChange = (e: any) => {
        this.setState({ username: e.currentTarget.value })
    }

    render() {
        const {
            state,
            props,
            handleUsernameChange
        } = this

        const {
            handleOnLogin
        } = props

        const {
            username
        } = state

        return (
            <div className="login-container">
                <form>
                    <fieldset>
                        <label htmlFor="nameField">Username</label>
                        <input 
                            type="text"
                            id="nameField"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <button 
                            className="button button-outline"
                            onClick={() => handleOnLogin(username)}
                        >
                        Login
                        </button>
                    </fieldset>
                </form>
            </div>
        )
    }
}