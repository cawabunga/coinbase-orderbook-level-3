import React, { useEffect, useRef, useState, useCallback } from "react";
import { List } from "immutable";
import type { Subscribable } from "rxjs";
import type { Entry } from "./Entry";
import { useTimeout } from "./useTimer";

interface AppProps {
  entry$: Subscribable<Entry>;
}

export const App = ({ entry$ }: AppProps) => {
  const [entries, setEntries] = useState(List<Entry>());
  const entriesRef = useRef(List<Entry>());

  useEffect(() => {
    const subscriber = entry$.subscribe((entry) => {
      entriesRef.current = append(entry)(entriesRef.current);
    });

    return () => {
      subscriber.unsubscribe();
    };
  }, []);

  const refresh = useCallback(() => setEntries(entriesRef.current), []);

  useTimeout(refresh, 1000);

  return (
    <ul>
      {entries.map((entry, index) => (
        <li key={index}>
          {entry.side} | {entry.price}
          <pre>{JSON.stringify(entry, null, "  ")}</pre>
        </li>
      ))}
    </ul>
  );
};

const append = <T extends any>(item: T, size = 10) => (list: List<T>) => {
  return (list.size > size ? list.shift() : list).push(item);
};
