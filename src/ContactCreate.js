import React, { Component } from 'react';

export default class ContactCreate extends Component {
    state = {
        name: '',
        phone: ''
    }

    handleChange = e => {
        let nextState = {}
        nextState[e.target.name] = e.target.value
        this.setState(nextState)
    }

    handleClick = () => {
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        }

        this.props.onCreate(contact)

        this.setState({
            name: '',
            phone: ''
        })

        this.nameInput.focus()
    }

    handleKeyPress = e => {
        if(e.charCode === 13) {
            this.handleClick()
        }
    }

    render() {
        return (
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="name" 
                        value={this.state.name}
                        onChange={this.handleChange}
                        ref={ (ref) => { this.nameInput = ref }}
                    />
                    <input 
                        type="number"
                        name="phone"
                        placeholder="phone" 
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>

                <button onClick={this.handleClick}> Create </button>
            </div>
        )
    }
}

