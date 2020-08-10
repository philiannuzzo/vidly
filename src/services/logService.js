import * as Sentry from "@sentry/react";

function init() {
  Sentry.init({
    dsn:
      "https://901ee9e181204d8eaea95a93eba7a77d@o423025.ingest.sentry.io/5353974",
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  log,
  init,
};
