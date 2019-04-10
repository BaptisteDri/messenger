import React, { Component } from 'react'
import './App.css'

import Messenger from './components/Messenger/Messenger'

interface AppProps {}
interface AppStates {}

export default class App extends Component<AppProps, AppStates> {
    constructor(props:AppProps){
        super(props)

        this.state = {
            isLogged: false
        }
    }

    render() {
        return (
            <main>
                <Messenger url="https://chat-supdeweb.herokuapp.com" />
            </main>
        )
    }
}
