import React from "react";
import ReactDOM from "react-dom";
import { getRelevantEntries } from "./getRelevantEntries";
import { App } from "./App.react";

const [ws, entry$] = getRelevantEntries();

ReactDOM.render(<App entry$={entry$} />, document.querySelector("#root"));
