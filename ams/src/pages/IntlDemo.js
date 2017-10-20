import React, { Component } from 'react'
import {IntlProvider, FormattedMessage} from 'react-intl'
class Index extends Component{
	render(){
		return (
			<div> 
                IntlDemo 
                <IntlProvider locale="en">
                    <App />
                </IntlProvider>
            </div>
		)
	}
}
export default Index 

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Eric',
            unreadCount: 1,
        };
    }
    render() {
        const {name, unreadCount} = this.state;
        return (
            <p>
                <FormattedMessage
                    id="welcome"
                    defaultMessage={`Hello {name}, you have {unreadCount, number} {unreadCount, plural,
                      one {message}
                      other {messages}
                    }`}
                    values={{name: <b>{name}</b>, unreadCount}}
                />
            </p>
        );
    }
}