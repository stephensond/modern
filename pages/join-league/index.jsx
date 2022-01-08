import React, { useContext, useEffect, useState } from 'react';
import httpRequest from '../../api';
import HeaderAuthed from '../../common/header-authed';
import { UserContext } from '../../context/useUserContext';
import OpenLeague from '../../components/open-league';
import styles from './joinleague.module.css';
import PopupWindow from '../../components/popup-window';
import LinkTo from '../../common/linkto';

export default function JoinLeague() {
  const { user } = useContext(UserContext);
  const [apiResponse, setapiResponse] = useState([]);
  const [popupMessage, setPopupMessage] = useState({ message: '', subMessage: '', link: '/' });
  const [popupVisible, setPopupVisible] = useState(false);

  const handleMessage = (mess) => {
    setPopupMessage(mess);
    setPopupVisible(true);
  };

  const handleClose = (e) => {
    setPopupVisible(e);
  };

  useEffect(() => {
      
    const grabLeagues = async () => {
      console.log('hi');
      const { ok, responseBody } = await httpRequest({
        method: 'GET',
        endpoint: '/grableagues',
      });
    
      if (!ok) {
        const message = {
          message: 'Unable to connect with leagues right now',
          subMessage: 'Go Back',
          link: '/',
        };
        handleMessage(message);
        return;
      }
    
      setapiResponse(responseBody);
      };

    grabLeagues();
  }, []);

  return (
    <HeaderAuthed>
        <div className={styles.container}>
            <PopupWindow
                title=''
                show={popupVisible}
                onClose={handleClose}
            >
                <h2>{popupMessage.message}</h2>
                <h3>
                    <LinkTo href={popupMessage.link}>
                        {popupMessage.subMessage}
                    </LinkTo>
                </h3>
            </PopupWindow>
            <table className={styles.leaguesTable}>
                <tbody>
                    <tr>
                        <th>League Name</th>
                        <th>Capacity</th>
                        <th>Owner</th>
                        <th>Join</th>
                    </tr>
                    {apiResponse.map((value) => (
                        <OpenLeague
                            key={value.leagueid}
                            info={value}
                            user={user}
                            handleMessage={handleMessage}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    </HeaderAuthed>
  );
}
