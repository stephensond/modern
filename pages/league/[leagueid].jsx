import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Leagues() {
  const router = useRouter();
  const [id, setId] = useState(null);

  useEffect(() => {
    const { query: { leagueid = null } = {} } = router;

    if (leagueid) {
      setId(leagueid);
    }
  }, [router]);

  return (
    <div>
      {id}
    </div>
  );
}
