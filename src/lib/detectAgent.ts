import { type Agent } from '../models/Agent';

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
  if (
    link.hostname === 'www.pandabuy.com' ||
    link.hostname === 'pandabuy.com' ||
    link.hostname === 'm.pandabuy.com'
  )
    return 'pandabuy';
  if (
    link.hostname === 'www.superbuy.com' ||
    link.hostname === 'superbuy.com' ||
    link.hostname === 'login.superbuy.com' ||
    link.hostname === 'm.superbuy.com'
  )
    return 'superbuy';
  if (
    link.hostname === 'www.sugargoo.com' ||
    link.hostname === 'sugargoo.com' ||
    link.hostname === 'esugargoo.com' ||
    link.hostname === 'www.esugargoo.com'
  )
    return 'sugargoo';
  if (link.hostname === 'www.cssbuy.com' || link.hostname === 'cssbuy.com')
    return 'cssbuy';
  if (link.hostname === 'www.hagobuy.com' || link.hostname === 'hagobuy.com')
    return 'hagobuy';
  if (link.hostname === 'www.hegobuy.com' || link.hostname === 'hegobuy.com')
    return 'hegobuy';
  if (
    link.hostname === 'www.kameymall.com' ||
    link.hostname === 'kameymall.com'
  )
    return 'kameymall';
  if (link.hostname === 'www.cnfans.com' || link.hostname === 'cnfans.com') {
    return 'cnfans';
  }
  if (link.hostname === 'www.mulebuy.com' || link.hostname === 'mulebuy.com') {
    return 'mulebuy';
  }
  if (link.hostname === 'www.ezbuycn.com' || link.hostname === 'ezbuycn.com') {
    return 'ezbuycn';
  }
  if (link.hostname === 'www.hoobuy.com' || link.hostname === 'hoobuy.com') {
    return 'hoobuy';
  }
  if (
    link.hostname === 'www.allchinabuy.com' ||
    link.hostname === 'allchinabuy.com' ||
    link.hostname === 'www.acbuy.com' ||
    link.hostname === 'acbuy.com'
  ) {
    return 'allchinabuy';
  }
  if (
    link.hostname === 'basetao.com' ||
    link.hostname === 'www.basetao.com' ||
    link.hostname === 'basetao.net' ||
    link.hostname === 'www.basetao.net'
  ) {
    return 'basetao';
  }
  if (
    link.hostname === 'www.eastmallbuy.com' ||
    link.hostname === 'eastmallbuy.com'
  ) {
    return 'eastmallbuy';
  }
  if (
    link.hostname === 'www.hubbuycn.com' ||
    link.hostname === 'hubbuycn.com'
  ) {
    return 'hubbuycn';
  }
  if (link.hostname === 'www.joyabuy.com' || link.hostname === 'joyabuy.com') {
    return 'joyabuy';
  }
  if (
    link.hostname === 'www.orientdig.com' ||
    link.hostname === 'orientdig.com'
  ) {
    return 'orientdig';
  }
  if (link.hostname === 'www.oopbuy.com' || link.hostname === 'oopbuy.com') {
    return 'oopbuy';
  }
  if (
    link.hostname === 'www.lovegobuy.com' ||
    link.hostname === 'lovegobuy.com'
  ) {
    return 'lovegobuy';
  }
  if (link.hostname === 'www.blikbuy.com' || link.hostname === 'blikbuy.com') {
    return 'blikbuy';
  }
  if (link.hostname === 'www.ponybuy.com' || link.hostname === 'ponybuy.com') {
    return 'ponybuy';
  }
  return undefined;
}
