import WebSocket from "isomorphic-ws";
import { ReplaySubject } from "rxjs";
import { FEED_URL } from "./urls";
import type { Entry } from "./Entry";

export const getQueue = () => {
  const ws = new WebSocket(FEED_URL);
  const queue$ = new ReplaySubject<Entry>(Number.POSITIVE_INFINITY, 30000);

  ws.addEventListener("open", function open() {
    ws.send(
      JSON.stringify({
        type: "subscribe",
        product_ids: ["BTC-USD"],
        channels: ["full"],
      })
    );
  });

  ws.addEventListener("message", ({ data }) => {
    const json = JSON.parse(data);
    if (json.type === "open" || json.type === "match") {
      queue$.next(json);
    }
  });

  return [ws, queue$] as const;
};
