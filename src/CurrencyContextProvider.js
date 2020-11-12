import React, { Component } from "react";

const { Provider, Consumer } = React.createContext();

class CurrencyContextProvider extends Component {
    state = {
        currency: "USD"
    }
    render() {
        return (
            <Provider value={
                {
                    state: this.state,
                    setCurrency: (value) => this.setState({
                        currency: value
                    }),
                }}>
                {this.props.children}
            </Provider>
        )
    }
}
export { CurrencyContextProvider, Consumer as CurrencyContextConsumer }