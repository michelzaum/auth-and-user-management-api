import * as Sentry from "@sentry/node";
import { env } from "./application/config/env";

Sentry.init({
  dsn: env.sentryDns,
  enableLogs: true,
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
});
