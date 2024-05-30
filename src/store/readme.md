# Details

## Taobao
`shop` prefixes are not included as part of an id and automatically added.

## 1688
It seems like 1688 is using different IDs for mobile and desktop links that are not identical or convertable, for instance `https://shop1434560114962.1688.com/page/index.html?spm=0.0.wp_pc_common_header_companyName_undefined.0` translates to `https://m.1688.com/winport/b2b-2546450021uezz8.html?_end_point_=unknown`. For now we are including `b2b-` as a prefix to denote mobile ids.

`shop` prefixes are not included as part of an id and automatically added.
