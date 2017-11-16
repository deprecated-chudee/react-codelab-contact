import React, { Component } from 'react';

export default class ContactDetails extends Component {
    state = {
        isEdit: false,
        name: '',
        phone: ''
    }

    handleToggle = () => {
        if(!this.state.isEdit) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            })
        } else {
            this.props.onEdit(this.state.name, this.state.phone)
        }
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    handleChange = e => {
        let nextState = {}
        nextState[e.target.name] = e.target.value
        this.setState(nextState)
    }

    handleKeyPress = e => {
        if(e.charCode === 13) {
            this.handleToggle()
        }
    }

    render() {
        const read = (
            <div> 
                <p>
                    {this.props.contact.name}
                </p>
                <p>
                    {this.props.contact.phone}
                </p>
            </div>
        )

        const edit = (
            <div>
                <p>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="name" 
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <input 
                        type="text" 
                        name="phone"
                        placeholder="phone" 
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
            </div>
        )
        
        const details = (
            <div>
                { this.state.isEdit ? edit : read }
                <p>
                    <button onClick={this.handleToggle}>{this.state.isEdit ? 'Ok' : 'Edit'}</button>
                    <button onClick={this.props.onRemove}>Remove</button>
                </p>
            </div>
        )

        const blank = (<div> Nothing is Selected </div>)

        return (
            <div>
                <h2> Details </h2>
                { this.props.isSelected ? details : blank }
            </div>
        )
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    }
}