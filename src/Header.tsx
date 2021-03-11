import React from 'react'

class Header extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render () {
        return (
            <div className="Header">
                <h1 className="title">Modern Fantasy</h1>
                <ul className="headerList">
                    <li className="headerItem"><a className="headerContent">Home</a></li>
                    <li className="headerItem"><a className="headerContent">Leagues</a></li>
                    <li className="headerItem"><a className="headerContent">Draft</a></li>
                    <li className="headerItem"><a className="headerContent">About</a></li>
                    <li className="headerItem"><a className="headerContent" onClick={this.props.onClick}>New Draft</a></li>
                </ul>
            </div>
        )
    }
}
export default Header