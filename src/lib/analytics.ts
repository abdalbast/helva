const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string) || 'https://us.i.posthog.com';

let initialized = false;
let posthogInstance: typeof import('posthog-js').default | null = null;

/** Initialize analytics — only call after user has given cookie consent */
export async function initAnalytics() {
  if (initialized || !POSTHOG_KEY) {
    if (!POSTHOG_KEY) {
      console.warn('[Analytics] VITE_POSTHOG_KEY not set — analytics disabled.');
    }
    return;
  }

  const { default: posthog } = await import('posthog-js');
  posthogInstance = posthog;

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
  if (!initialized || !posthogInstance) return;
  posthogInstance.capture(name, properties);
}

/** Track a page view (call on route change) */
export function trackPageView(path: string) {
  if (!initialized || !posthogInstance) return;
  posthogInstance.capture('$pageview', { $current_url: window.location.href, path });
}
