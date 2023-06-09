import type { Agent } from '../models/Agent';

/**
 * Detects the agent based on the provided URL.
 *
 * @param {URL | string} href - The URL to detect the agent from.
 * @returns {Agent | undefined} The detected agent, or undefined if no agent is detected.
 */
export function detectAgent(href: URL | string): Agent | undefined {
  const link = typeof href === 'string' ? new URL(href) : href;

  if (
    link.hostname === 'www.wegobuy.com' ||
    link.hostname === 'wegobuy.com' ||
    link.hostname === 'login.wegobuy.com'
  )
    return 'wegobuy';
  if (link.hostname === 'www.pandabuy.com' || link.hostname === 'pandabuy.com')
    return 'pandabuy';
  if (
    link.hostname === 'www.superbuy.com' ||
    link.hostname === 'superbuy.com' ||
    link.hostname === 'login.superbuy.com' ||
    link.hostname === 'm.superbuy.com'
  )
    return 'superbuy';
  if (link.hostname === 'www.sugargoo.com' || link.hostname === 'sugargoo.com')
    return 'sugargoo';
  if (link.hostname === 'www.cssbuy.com' || link.hostname === 'cssbuy.com')
    return 'cssbuy';
  if (link.hostname === 'www.hagobuy.com' || link.hostname === 'hagobuy.com')
    return 'hagobuy';
  return undefined;
}
