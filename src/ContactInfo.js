import React from 'react';

export default function ContactInfo({ onClick, contact }) {
    return <div onClick={onClick}> {contact.name} </div>
}