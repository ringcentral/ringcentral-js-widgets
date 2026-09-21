/**
 * Load and initialize Mixpanel
 *
 * This is a pure function that dynamically imports the mixpanel-browser library
 * and returns the Mixpanel instance. By keeping it as a separate module, it can
 * be easily mocked during testing.
 *
 * @returns The Mixpanel instance
 */
export async function loadMixpanel() {
  return (await import('mixpanel-browser')).default;
}
