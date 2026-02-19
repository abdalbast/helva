import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string) || 'https://us.i.posthog.com';

let initialized = false;

/** Initialize analytics — only call after user has given cookie consent */
export function initAnalytics() {
  if (initialized || !POSTHOG_KEY) {
    if (!POSTHOG_KEY) {
      console.warn('[Analytics] VITE_POSTHOG_KEY not set — analytics disabled.');
    }
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: true,
    persistence: 'localStorage',
    autocapture: false,
  });

  initialized = true;
}

/** Track a custom event */
export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (!initialized) return;
  posthog.capture(name, properties);
}

/** Track a page view (call on route change) */
export function trackPageView(path: string) {
  if (!initialized) return;
  posthog.capture('$pageview', { $current_url: window.location.href, path });
}

/** Identify a user (for future auth integration) */
export function identifyUser(id: string, traits?: Record<string, unknown>) {
  if (!initialized) return;
  posthog.identify(id, traits);
}

/** Reset identity on logout */
export function resetAnalytics() {
  if (!initialized) return;
  posthog.reset();
}
