import { getQueue } from "./getQueue";
import { getEntries } from "./getEntries";

export const getRelevantEntries = () => {
  const [ws, queue$] = getQueue();
  return [ws, getEntries(queue$)] as const;
};
