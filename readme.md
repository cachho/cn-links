# User Guide
This package implements functions to deal with links for 
- taobao.com
- weidian.com
- tmall.com
- 1688.com
- wegobuy.com
- superbuy.com
- pandabuy.com
- cssbuy.com
- hagobuy.com
- sugargoo.com


Features include:
- conversion
- sanitization
- checking

This is aimed at developers.

## Keywords
The verbs in the function names indicate what kind of function you are dealing with.
- `detect`: returns typed string
- `extract`: returns a part of an input
- `filter`: returns multiple parts of an input
- `generate`: generates a new URL
- `is`: returns a boolean
- `to`: ultimate function that combines all different method to get from the start, no matter what it looks like, to the end result

## Choices
I made a few controversial choices.

- Instead of returning strings, all generate functions return a URL object, which of course can be converted back to a string with the `.href` property
- Inputs are either strings or URL objects.

## Terminology
- Agent Link: Link to a shopping agent
- Marketplace: A shopping platfrom (taobao, weidian, 1688, tmall)
- Raw Link: We call the link to a marketplace a raw link.
- Marketplace Link, Proper Link, Sanizited links: aliases for raw links
- Non-Link Marketplace: These are related marketplaces (such as Yupoo). I try to include them in typing, checks and filters, but the actual link transformation that this package promises does not work for them due to the nature of the link.

## Usage / Examples
Version 1.0 has the ambition to implement strong typing. The is-functions do the heavy lifting and can be used to typeguard `AgentURL`s and `RawURL`s. So a common design pattern you will see is.

```
const link = 'https://weidian.com/item.html?itemId=3053526244&vc_cps_track=1459920903_0_0';


if (isRawLink(link)) {
    const rawLink: RawURL = new URL(link);
    // Now you have a strongly typed URL object

    // This would be fine, and you can do everything with this object. Just when you use rawLink.href it will not be sanitized. To avoid this, it's recommended to instead use
    const rawLink = toRaw(link)

    // Possible continuation
    const agent: Agent = 'wegobuy';
    const agentLink = toAgent(rawLink, agent);
}

```


## Roadmap
This is a very early release, that's just an export of functions used in the [RepArchive browser addon](https://github.com/cachho/reparchive-browser-extension).

- `v0.1` functional approach
- `v1.0` strong typing
- `v1.0` object oriented approach

Repository name is also subject to change.

## Disclaimer:
Links in the test are just used as examples. This is random. It is not a recommendation or promotion of these links.