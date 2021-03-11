import { from, of, ReplaySubject } from "rxjs";
import { delay, filter, switchMap } from "rxjs/operators";
import axios from "axios";
import { LEVEL3_URL } from "./urls";
import type { Entry } from "./Entry";

const snapshotTask = (): Promise<Record<"sequence", number>> => {
  return axios.get(LEVEL3_URL).then(({ data }) => data);
};

export const getEntries = (queue$: ReplaySubject<Entry>) => {
  return of(null).pipe(
    delay(2000),
    switchMap(() => {
      return from(snapshotTask());
    }),
    switchMap((snapshot) => {
      return queue$.pipe(filter((entry) => snapshot.sequence < entry.sequence));
    })
  );
};
