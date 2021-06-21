import React from 'react'

class Header extends React.Component<any, any> {

    render () {
        return (
            <div className="Header">
                <h1 className="title">Modern Fantasy</h1>
                <ul className="headerList">
                    <li className="headerItem"><button className="headerContent">Home</button></li>
                    <li className="headerItem"><button className="headerContent">Leagues</button></li>
                    <li className="headerItem"><button className="headerContent">Draft</button></li>
                    <li className="headerItem"><button className="headerContent">About</button></li>
                    <li className="headerItem"><button className="headerContent" onClick={this.props.onClick}>New Draft</button></li>
                </ul>
            </div>
        )
    }
}
export default Header
