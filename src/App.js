import React, { Component } from 'react';
import Contact from './Contact';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1> Contacts </h1>
                <Contact/>
            </div>
        )
    }
}