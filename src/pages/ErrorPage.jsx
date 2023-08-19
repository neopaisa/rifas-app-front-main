import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>ERROR</h1>
      <h1>Algo salió mal</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
