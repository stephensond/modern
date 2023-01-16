import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import httpRequest from '../../api';
import HeaderAuthed from '../../common/header-authed';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:9000')


export default function liveDraft() {
    const router = useRouter;
    const [presentUsers, setPresentUsers] = useState([]);

    // const { leagueID } = router.query;

    useEffect(() => {

        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            console.log(message);
        };
    }, [])

    return (
        <HeaderAuthed>
            Hi!
        </HeaderAuthed>
    )

}

