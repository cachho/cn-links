import type { Agent } from '../models/Agent';

/**
 * Detects the agent based on the provided URL.
 *
 * @param {string} href - The URL to detect the agent from.
 * @returns {Agent | undefined} The detected agent, or undefined if no agent is detected.
 */
export function detectAgent(href: string): Agent | undefined {
  const link = new URL(href);
  const url = link.hostname;

  if (
    url === 'www.wegobuy.com' ||
    url === 'wegobuy.com' ||
    url === 'login.wegobuy.com'
  )
    return 'wegobuy';
  if (url === 'www.pandabuy.com' || url === 'pandabuy.com') return 'pandabuy';
  if (
    url === 'www.superbuy.com' ||
    url === 'superbuy.com' ||
    url === 'login.superbuy.com'
  )
    return 'superbuy';
  if (url === 'www.sugargoo.com' || url === 'sugargoo.com') return 'sugargoo';
  if (url === 'www.cssbuy.com' || url === 'cssbuy.com') return 'cssbuy';
  if (url === 'www.hagobuy.com' || url === 'hagobuy.com') return 'hagobuy';
  return undefined;
}
