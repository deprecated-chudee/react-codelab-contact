import React, { Component } from 'react';

import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

import update from 'react-addons-update';

export default class Contact extends Component {
    state = {
        selectedKey: -1,
        keyword: '',
        contactData: [
            { name: 'Apple', phone: '010-0000-0000' },
            { name: 'Betty', phone: '010-0000-1111' },
            { name: 'Chudee', phone: '010-0000-2222' },
            { name: 'David', phone: '010-0000-3333' },
        ]
    }

    componentWillMount() {
        const contactData = localStorage.contactData

        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData)
        }
    }

    handleChange = e => {
        this.setState({
            keyword: e.target.value
        })
    }

    handleClick = key => {
        this.setState({
            selectedKey: key
        })
        console.log(key, 'is selected')
    }

    handleCreate = contact => {
        this.setState({
            contactData: update(
                this.state.contactData, 
                { $push: [contact] } 
            )
        })
    }

    handleEdit = (name, phone) => {
        this.setState({
            contactData: update(
                this.state.contactData,
                {
                    [this.state.selectedKey]: {
                        name: { $set: name },
                        phone: { $set: phone }
                    }
                }
            )
        })
    }

    handleRemove = () => {
        this.setState({
            contactData: update(
                this.state.contactData, 
                { $splice: [[this.state.selectedKey, 1]] }
            ),
            selectedKey: -1
        })
    }

    render() {
        const mapToComponent = (data) => {
            data.sort()

            data = data.filter( (contact) => {
                return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1
            })

            return data.map( (contact, i) => {
                return (
                    <ContactInfo 
                        contact={contact} 
                        key={i}
                        onClick={() => this.handleClick(i) }
                    />
                )
            })
        };

        return (
            <div>
                <input 
                    type="text" 
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div> { mapToComponent(this.state.contactData) } </div>
                <ContactDetails
                    contact={this.state.contactData[this.state.selectedKey]}
                    isSelected={this.state.selectedKey !== -1}
                    onEdit={this.handleEdit}
                    onRemove={this.handleRemove}
                />
                <ContactCreate
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}