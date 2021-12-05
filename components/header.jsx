export default function Header(props) {
  return (
    <div className="Header">
      <h1 className="title">Modern Fantasy</h1>
      <ul className="headerList">
        <li className="headerItem">
          <button className="headerContent">Home</button>
        </li>
        <li className="headerItem">
          <button className="headerContent">Leagues</button>
        </li>
        <li className="headerItem">
          <button className="headerContent">Draft</button>
        </li>
        <li className="headerItem">
          <button className="headerContent">About</button>
        </li>
        <li className="headerItem">
          <button className="headerContent" onClick={props.onClick}>
            New Draft
          </button>
        </li>
      </ul>
    </div>
  );
}
