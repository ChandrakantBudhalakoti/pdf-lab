"use client";

import React from "react";

export default function GlobalError() {
  return React.createElement(
    "html",
    { lang: "en" },
    React.createElement(
      "body",
      null,
      React.createElement("h2", null, "Something went wrong.")
    )
  );
}
