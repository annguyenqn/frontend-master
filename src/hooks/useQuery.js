// A custom hook that builds on useLocation to parse
// the query string for you.
import { useLocation } from 'react-router-dom';
import React from 'react';

export default function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
