import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import httpRequest from '../../api';
import HeaderAuthed from '../../common/header-authed';

export default function League() {
  const router = useRouter();
  const [teams, setTeams] = useState(null);
  const [error, setError] = useState('');
  const [leagueSize, setLeagueSize] = useState(0);

  useEffect(() => {
    const getTeams = async () => {
      if (!router.isReady || !router.query) {
        return;
      }

      const { id } = router.query;

      if (!id) {
        setError('League does not exist');
        return;
      }

      const { ok, responseBody } = await httpRequest({
        method: 'GET',
        endpoint: `/grabteams?id=${id}`,
      });

      if (!ok || !responseBody.length) {
        setError('League does not exist');
        return;
      }

      setLeagueSize(responseBody[0].numteams);
      setTeams(responseBody);
    };

    getTeams();
  }, [router]);

  return (
    <HeaderAuthed>
      {teams && teams.map((team) => (
        <div>
          <div>
            {team.teamid}
          </div>
          <div>
            {team.ownerusername}
          </div>
        </div>
      ))}
      {error && error}
    </HeaderAuthed>
  );
}
