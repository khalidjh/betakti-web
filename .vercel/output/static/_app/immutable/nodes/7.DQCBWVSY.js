var ar=o=>{throw TypeError(o)};var Pr=(o,r,e)=>r.has(o)||ar("Cannot "+e);var qt=(o,r,e)=>(Pr(o,r,"read from private field"),e?e.call(o):r.get(o)),or=(o,r,e)=>r.has(o)?ar("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(o):r.set(o,e);import"../chunks/B1dqJmlB.js";import{o as Kt,a as Lr}from"../chunks/cVfnAomb.js";import{a0 as Fr,bj as jr,bu as Nr,x as H,y as P,a as p,g as i,c as f,r as u,u as me,f as _,aG as Le,as as Lt,at as W,s as v,t as te,p as St,b as Mt,$ as Rr,am as Br,al as Dr,bv as Wr,L as _t,A as rt,bw as Hr,aH as Yt,aS as Ur,aT as Or}from"../chunks/DuP7XSig.js";import{d as At,e as Ut,a as S,s as he}from"../chunks/Du6HMqar.js";import{i as xe}from"../chunks/C3rJnQoa.js";import{e as ot}from"../chunks/2I1o6VuG.js";import{c as Dt}from"../chunks/BZC1MZC4.js";import{h as Vr}from"../chunks/D9yz1Lo5.js";import{c as qr,b as lt,a as Xe,r as ft,s as at,e as ut}from"../chunks/C-jXTg9C.js";import{b as jt}from"../chunks/DkS41-q4.js";import{r as Yr}from"../chunks/BV_8cY4p.js";import"../chunks/DQgWptUM.js";import{n as Xr}from"../chunks/BMrqd3VL.js";import{L as Kr}from"../chunks/D7toWR_o.js";import{s as er}from"../chunks/DLvwYEOE.js";import{l as V,s as q,p as $t,r as Zr}from"../chunks/CdMiqFP7.js";import{M as pr,L as Gr,S as Jr}from"../chunks/pgHRzMdK.js";import{D as Qr}from"../chunks/bPyScJdI.js";import{S as ea}from"../chunks/AO0HrEz4.js";import"../chunks/0rFHPuVs.js";import{i as ta}from"../chunks/BaYBCdbo.js";import{_ as ra}from"../chunks/Dp1pzeXC.js";import{I as Y,s as X}from"../chunks/D9k1RTlf.js";import{T as aa}from"../chunks/C1BDVId2.js";import{b as oa}from"../chunks/CQu1fbY5.js";import{S as Zt}from"../chunks/DJDk4xpi.js";import{C as na,T as nr,P as ia}from"../chunks/C517Q9CT.js";import{d as Gt,e as sa,f as la,g as ca,h as da,i as ua,u as fa,j as va,T as ir,k as ha,o as pa}from"../chunks/DQPsgc9n.js";const ma=[];function ga(o,r=!1,e=!1){return Wt(o,new Map,"",ma,null,e)}function Wt(o,r,e,n,s=null,h=!1){if(typeof o=="object"&&o!==null){var t=r.get(o);if(t!==void 0)return t;if(o instanceof Map)return new Map(o);if(o instanceof Set)return new Set(o);if(Fr(o)){var l=Array(o.length);r.set(o,l),s!==null&&r.set(s,l);for(var C=0;C<o.length;C+=1){var pe=o[C];C in o&&(l[C]=Wt(pe,r,e,n,null,h))}return l}if(jr(o)===Nr){l={},r.set(o,l),s!==null&&r.set(s,l);for(var de of Object.keys(o))l[de]=Wt(o[de],r,e,n,null,h);return l}if(o instanceof Date)return structuredClone(o);if(typeof o.toJSON=="function"&&!h)return Wt(o.toJSON(),r,e,n,o)}if(o instanceof EventTarget)return o;try{return structuredClone(o)}catch{return o}}function ba(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M2 12h20"}],["path",{d:"M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"}],["path",{d:"M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"}],["path",{d:"M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1"}],["path",{d:"M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1"}]];Y(o,q({name:"align-center-horizontal"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function xa(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M12 2v20"}],["path",{d:"M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4"}],["path",{d:"M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4"}],["path",{d:"M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1"}],["path",{d:"M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"}]];Y(o,q({name:"align-center-vertical"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function ya(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["rect",{width:"6",height:"16",x:"4",y:"2",rx:"2"}],["rect",{width:"6",height:"9",x:"14",y:"9",rx:"2"}],["path",{d:"M22 22H2"}]];Y(o,q({name:"align-end-horizontal"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function $a(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["rect",{width:"16",height:"6",x:"2",y:"4",rx:"2"}],["rect",{width:"9",height:"6",x:"9",y:"14",rx:"2"}],["path",{d:"M22 22V2"}]];Y(o,q({name:"align-end-vertical"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function ka(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2"}],["path",{d:"M17 22v-5"}],["path",{d:"M17 7V2"}],["path",{d:"M7 22v-3"}],["path",{d:"M7 5V2"}]];Y(o,q({name:"align-horizontal-distribute-center"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function wa(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["rect",{width:"6",height:"16",x:"4",y:"6",rx:"2"}],["rect",{width:"6",height:"9",x:"14",y:"6",rx:"2"}],["path",{d:"M22 2H2"}]];Y(o,q({name:"align-start-horizontal"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function _a(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M22 17h-3"}],["path",{d:"M22 7h-5"}],["path",{d:"M5 17H2"}],["path",{d:"M7 7H2"}],["rect",{x:"5",y:"14",width:"14",height:"6",rx:"2"}],["rect",{x:"7",y:"4",width:"10",height:"6",rx:"2"}]];Y(o,q({name:"align-vertical-distribute-center"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function za(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["rect",{width:"9",height:"6",x:"6",y:"14",rx:"2"}],["rect",{width:"16",height:"6",x:"6",y:"4",rx:"2"}],["path",{d:"M2 2v20"}]];Y(o,q({name:"align-start-vertical"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Sa(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M12 17V3"}],["path",{d:"m6 11 6 6 6-6"}],["path",{d:"M19 21H5"}]];Y(o,q({name:"arrow-down-to-line"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ma(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M12 5v14"}],["path",{d:"m19 12-7 7-7-7"}]];Y(o,q({name:"arrow-down"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Aa(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M5 3h14"}],["path",{d:"m18 13-6-6-6 6"}],["path",{d:"M12 7v14"}]];Y(o,q({name:"arrow-up-to-line"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ca(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"m5 12 7-7 7 7"}],["path",{d:"M12 19V5"}]];Y(o,q({name:"arrow-up"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function mr(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"}]];Y(o,q({name:"bold"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ta(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M10 12h4"}],["path",{d:"M10 8h4"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"}]];Y(o,q({name:"building-2"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ea(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"m6 9 6 6 6-6"}]];Y(o,q({name:"chevron-down"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ia(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"m15 18-6-6 6-6"}]];Y(o,q({name:"chevron-left"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Pa(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"m18 15-6-6-6 6"}]];Y(o,q({name:"chevron-up"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Jt(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"m9 18 6-6-6-6"}]];Y(o,q({name:"chevron-right"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function La(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["circle",{cx:"12",cy:"12",r:"10"}]];Y(o,q({name:"circle"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Fa(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"m17 15-5.5 5.5L9 18"}],["path",{d:"M5.516 16.07A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 3.501 7.327"}]];Y(o,q({name:"cloud-check"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function ja(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 18a6 6 0 0 0 0-12v12z"}]];Y(o,q({name:"contrast"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Na(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];Y(o,q({name:"copy"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function gr(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"}],["path",{d:"M16 8 2 22"}],["path",{d:"M17.5 15H9"}]];Y(o,q({name:"feather"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function sr(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]];Y(o,q({name:"image"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function br(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["line",{x1:"19",x2:"10",y1:"4",y2:"4"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20"}]];Y(o,q({name:"italic"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function xr(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];Y(o,q({name:"layers"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function lr(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56"}]];Y(o,q({name:"loader-circle"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ra(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M15 3h6v6"}],["path",{d:"m21 3-7 7"}],["path",{d:"m3 21 7-7"}],["path",{d:"M9 21H3v-6"}]];Y(o,q({name:"maximize-2"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function cr(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"m8 3 4 8 5-5 5 15H2L8 3z"}]];Y(o,q({name:"mountain"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ba(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"}]];Y(o,q({name:"mouse-pointer-2"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Da(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"m15 14 5-5-5-5"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"}]];Y(o,q({name:"redo-2"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Wa(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["circle",{cx:"18",cy:"5",r:"3"}],["circle",{cx:"6",cy:"12",r:"3"}],["circle",{cx:"18",cy:"19",r:"3"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49"}]];Y(o,q({name:"share-2"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ha(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M10 8h4"}],["path",{d:"M12 21v-9"}],["path",{d:"M12 8V3"}],["path",{d:"M17 16h4"}],["path",{d:"M19 12V3"}],["path",{d:"M19 21v-5"}],["path",{d:"M3 14h4"}],["path",{d:"M5 10V3"}],["path",{d:"M5 21v-7"}]];Y(o,q({name:"sliders-vertical"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ua(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"m10 20-1.25-2.5L6 18"}],["path",{d:"M10 4 8.75 6.5 6 6"}],["path",{d:"m14 20 1.25-2.5L18 18"}],["path",{d:"m14 4 1.25 2.5L18 6"}],["path",{d:"m17 21-3-6h-4"}],["path",{d:"m17 3-3 6 1.5 3"}],["path",{d:"M2 12h6.5L10 9"}],["path",{d:"m20 10-1.5 2 1.5 2"}],["path",{d:"M22 12h-6.5L14 15"}],["path",{d:"m4 10 1.5 2L4 14"}],["path",{d:"m7 21 3-6-1.5-3"}],["path",{d:"m7 3 3 6h4"}]];Y(o,q({name:"snowflake"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Oa(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"}],["path",{d:"M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"}],["path",{d:"M12 20v2"}],["path",{d:"M12 14v2"}],["path",{d:"M12 8v2"}],["path",{d:"M12 2v2"}]];Y(o,q({name:"square-centerline-dashed-horizontal"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Va(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"}],["path",{d:"M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"}],["path",{d:"M4 12H2"}],["path",{d:"M10 12H8"}],["path",{d:"M16 12h-2"}],["path",{d:"M22 12h-2"}]];Y(o,q({name:"square-centerline-dashed-vertical"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Qt(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}]];Y(o,q({name:"square"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function qa(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M12 10V2"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m16 6-4 4-4-4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];Y(o,q({name:"sunset"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ya(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M21 5H3"}],["path",{d:"M21 12H9"}],["path",{d:"M21 19H7"}]];Y(o,q({name:"text-align-end"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Xa(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M21 5H3"}],["path",{d:"M17 12H7"}],["path",{d:"M19 19H5"}]];Y(o,q({name:"text-align-center"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ka(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M21 5H3"}],["path",{d:"M15 12H3"}],["path",{d:"M17 19H3"}]];Y(o,q({name:"text-align-start"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Za(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"}],["path",{d:"M7 16v6"}],["path",{d:"M13 19v3"}],["path",{d:"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"}]];Y(o,q({name:"trees"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ga(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M6 4v6a6 6 0 0 0 12 0V4"}],["line",{x1:"4",x2:"20",y1:"20",y2:"20"}]];Y(o,q({name:"underline"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Ja(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"}]];Y(o,q({name:"undo-2"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function Qa(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];Y(o,q({name:"upload"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function eo(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}]];Y(o,q({name:"waves"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}function to(o,r){const e=V(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v1.0.1 - ISC
 *
 * ISC License
 *
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The following Lucide icons are derived from the Feather project:
 *
 * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
 *
 * The MIT License (MIT) (for the icons listed above)
 *
 * Copyright (c) 2013-present Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];Y(o,q({name:"zap"},()=>e,{get iconNode(){return n},children:(s,h)=>{var t=H(),l=P(t);X(l,r,"default",{}),p(s,t)},$$slots:{default:!0}}))}var ro=_("<button><!></button>");function Bt(o,r){const e=$t(r,"active",3,!1),n=$t(r,"size",3,"md"),s=Zr(r,["$$slots","$$events","$$legacy","label","active","size","children"]),h=me(()=>n()==="sm"?"h-8 w-8":"h-10 w-10");var t=ro();qr(t,()=>({class:`icon-btn relative inline-flex items-center justify-center rounded-[10px] transition-colors duration-[var(--duration-micro)] ${i(h)??""}
    ${e()?"bg-[var(--color-surface-2)] text-[var(--color-accent)] border-l-2 border-[var(--color-accent)]":"text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"}`,"aria-label":r.label,"aria-pressed":e(),title:r.label,...s}),void 0,void 0,void 0,"svelte-w00ekw");var l=f(t);er(l,()=>r.children),u(t),p(o,t)}var ao=_('<span class="font-mono text-[10px] opacity-70"> </span>'),oo=_('<span class="fixed z-[100] whitespace-nowrap bg-[var(--color-ink)] text-[var(--color-paper)] px-2 py-1 rounded-[6px] text-xs shadow-[var(--shadow-2)] inline-flex items-center gap-1.5 pointer-events-none"> <!></span>'),no=_('<span class="relative inline-flex" role="group"><!></span> <!>',1);function Pe(o,r){const e=$t(r,"placement",3,"bottom");let n=Le(!1),s=Le(Lt({left:0,top:0})),h=null,t=Le(null),l=Le(null);function C(){var Me,ye;if(!i(t))return;const j=i(t).getBoundingClientRect(),K=((Me=i(l))==null?void 0:Me.offsetWidth)??0,je=((ye=i(l))==null?void 0:ye.offsetHeight)??0,$e=8,Q=document.documentElement.clientWidth,oe=document.documentElement.clientHeight;let ae=j.left+j.width/2-K/2,fe=e()==="bottom"?j.bottom+$e:j.top-je-$e;ae=Math.max($e,Math.min(ae,Q-K-$e)),fe=Math.max($e,Math.min(fe,oe-je-$e)),W(s,{left:ae,top:fe},!0)}function pe(){h=setTimeout(()=>{W(n,!0),queueMicrotask(C),requestAnimationFrame(C)},400)}function de(){h&&clearTimeout(h),W(n,!1)}var ge=no(),T=P(ge),ue=f(T);er(ue,()=>r.children),u(T),jt(T,j=>W(t,j),()=>i(t));var N=v(T,2);{var E=j=>{var K=oo(),je=f(K),$e=v(je);{var Q=oe=>{var ae=ao(),fe=f(ae,!0);u(ae),te(()=>he(fe,r.shortcut)),p(oe,ae)};xe($e,oe=>{r.shortcut&&oe(Q)})}u(K),jt(K,oe=>W(l,oe),()=>i(l)),te(()=>{lt(K,`left: ${i(s).left??""}px; top: ${i(s).top??""}px;`),he(je,`${r.label??""} `)}),p(j,K)};xe(N,j=>{i(n)&&j(E)})}Ut("mouseenter",T,pe),Ut("mouseleave",T,de),S("focusin",T,pe),S("focusout",T,de),p(o,ge)}At(["focusin","focusout"]);var io=_('<header class="h-14 border-b border-[var(--color-border)] flex items-center px-4 flex-none"><h2 class="text-base font-semibold"> </h2> <button class="ms-auto w-9 h-9 inline-flex items-center justify-center rounded-[8px] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]" aria-label="Close">×</button></header>'),so=_('<div class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" role="button" tabindex="-1" aria-label="Close"></div> <div role="dialog" aria-modal="true" style="padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom);"><!> <div><!></div></div>',1);function Ht(o,r){St(r,!0);const e=$t(r,"side",3,"end"),n=$t(r,"bare",3,!1);function s(C){C.key==="Escape"&&r.onClose()}var h=H();Ut("keydown",Rr,s);var t=P(h);{var l=C=>{var pe=so(),de=P(pe),ge=v(de,2),T=f(ge);{var ue=j=>{var K=io(),je=f(K),$e=f(je,!0);u(je);var Q=v(je,2);u(K),te(()=>he($e,r.title)),S("click",Q,function(...oe){var ae;(ae=r.onClose)==null||ae.apply(this,oe)}),p(j,K)};xe(T,j=>{r.title&&j(ue)})}var N=v(T,2),E=f(N);er(E,()=>r.children),u(N),u(ge),te(()=>{Xe(ge,1,`fixed top-0 bottom-0 ${e()==="end"?"end-0":"start-0"} z-50 w-[min(360px,calc(100vw-2rem))] bg-[var(--color-surface)] border-s border-[var(--color-border)] shadow-[var(--shadow-3)] flex flex-col`),Xe(N,1,`flex-1 overflow-y-auto min-h-0 ${n()?"":"p-4"}`)}),S("click",de,function(...j){var K;(K=r.onClose)==null||K.apply(this,j)}),S("keydown",de,j=>j.key==="Enter"&&r.onClose()),p(C,pe)};xe(t,C=>{r.open&&C(l)})}p(o,h),Mt()}At(["click","keydown"]);var Nt;class lo{constructor(){or(this,Nt,Le(Lt([])))}get items(){return i(qt(this,Nt))}set items(r){W(qt(this,Nt),r,!0)}push(r,e="info",n=3e3){const s=crypto.randomUUID();this.items.push({id:s,message:r,variant:e,timeout:n}),setTimeout(()=>this.remove(s),n)}remove(r){const e=this.items.findIndex(n=>n.id===r);e>=0&&this.items.splice(e,1)}}Nt=new WeakMap;const Pt=new lo;var co=_("<div> </div>"),uo=_('<div class="fixed bottom-6 end-6 z-[60] flex flex-col gap-2 pointer-events-none"></div>');function fo(o,r){St(r,!1),ta();var e=uo();ot(e,5,()=>Pt.items,n=>n.id,(n,s)=>{var h=co();lt(h,"",{},{transition:"transform var(--duration-standard) var(--ease-spring)"});var t=f(h,!0);u(h),te(()=>{Xe(h,1,`pointer-events-auto px-4 py-2 rounded-[10px] text-sm shadow-[var(--shadow-2)] border
        transition-transform
        ${i(s).variant==="success"?"bg-[var(--color-success)] text-white border-transparent":i(s).variant==="error"?"bg-[var(--color-danger)] text-white border-transparent":"bg-[var(--color-surface)] text-[var(--color-ink)] border-[var(--color-border)]"}`),he(t,i(s).message)}),p(n,h)}),u(e),p(o,e),Mt()}const yr=Symbol("betakti-editor"),vo=50;function yt(o){return ga(o)}function dr(o){return{elements:yt(o.elements),background:yt(o.background),name:o.name,canvasSize:yt(o.canvasSize)}}function ur(o,r){o.elements=yt(r.elements),o.background=yt(r.background),o.name=r.name,o.canvasSize=yt(r.canvasSize)}function ho(o){const r=Lt(yt(o)),e=Lt([]),n=Lt({stack:[dr(o)],index:0}),s=Lt({zoom:1,pan:{x:0,y:0},tool:"select",isDirty:!1,isSaving:!1,inspectorVisible:!0,gridVisible:!0,containerSize:{w:0,h:0}});function h(){const x=dr(r);n.stack=n.stack.slice(0,n.index+1),n.stack.push(x),n.stack.length>vo?n.stack.shift():n.index+=1,s.isDirty=!0,r.updatedAt=Date.now()}function t(){n.index!==0&&(n.index-=1,ur(r,n.stack[n.index]),s.isDirty=!0)}function l(){n.index>=n.stack.length-1||(n.index+=1,ur(r,n.stack[n.index]),s.isDirty=!0)}function C(){return r.elements.length===0?1:Math.max(...r.elements.map(x=>x.zIndex))+1}function pe(x){const g={...x,zIndex:x.zIndex??C()};return r.elements.push(g),h(),g}function de(x){const g={...x,zIndex:x.zIndex??C()};return g.x=r.canvasSize.width/2-g.width/2,g.y=r.canvasSize.height/2-g.height/2,r.elements.push(g),h(),g}function ge(x){return r.elements.find(g=>g.id===x)}function T(x,g,I=!0){const O=r.elements.find(G=>G.id===x);O&&(Object.assign(O,g),I?h():(s.isDirty=!0,r.updatedAt=Date.now()))}function ue(x,g,I=!0){for(const O of x)T(O,g,!1);I&&h()}function N(x){const g=e.map(z=>r.elements.find(ne=>ne.id===z)).filter(z=>!!z);if(g.length<2)return;const I=Math.min(...g.map(z=>z.x)),O=Math.max(...g.map(z=>z.x+z.width)),G=Math.min(...g.map(z=>z.y)),L=Math.max(...g.map(z=>z.y+z.height)),A=(I+O)/2,F=(G+L)/2;for(const z of g){const ne={};x==="left"?ne.x=I:x==="right"?ne.x=O-z.width:x==="centerX"?ne.x=A-z.width/2:x==="top"?ne.y=G:x==="bottom"?ne.y=L-z.height:x==="centerY"&&(ne.y=F-z.height/2),T(z.id,ne,!1)}h()}function E(x){const g=e.map(I=>r.elements.find(O=>O.id===I)).filter(I=>!!I);if(!(g.length<3)){if(x==="h"){g.sort((F,z)=>F.x+F.width/2-(z.x+z.width/2));const I=g[0],O=g[g.length-1],G=I.x+I.width/2,A=(O.x+O.width/2-G)/(g.length-1);for(let F=1;F<g.length-1;F++){const z=g[F],ne=G+A*F;T(z.id,{x:ne-z.width/2},!1)}}else{g.sort((F,z)=>F.y+F.height/2-(z.y+z.height/2));const I=g[0],O=g[g.length-1],G=I.y+I.height/2,A=(O.y+O.height/2-G)/(g.length-1);for(let F=1;F<g.length-1;F++){const z=g[F],ne=G+A*F;T(z.id,{y:ne-z.height/2},!1)}}h()}}function j(x){r.elements=r.elements.filter(g=>!x.includes(g.id));for(let g=e.length-1;g>=0;g--)x.includes(e[g])&&e.splice(g,1);h()}function K(x){const g=[];for(const I of x){const O=r.elements.find(L=>L.id===I);if(!O)continue;const G=yt(O);G.id=crypto.randomUUID(),G.x+=30,G.y+=30,G.zIndex=C(),r.elements.push(G),g.push(G)}return g.length&&(e.splice(0,e.length,...g.map(I=>I.id)),h()),g}function je(x){e.splice(0,e.length),x&&e.push(x)}function $e(x){const g=e.indexOf(x);g>=0?e.splice(g,1):e.push(x)}function Q(){e.splice(0,e.length)}function oe(){e.splice(0,e.length,...r.elements.filter(x=>x.isVisible&&!x.isLocked).map(x=>x.id))}function ae(x,g,I=!0){for(const O of e){const G=r.elements.find(L=>L.id===O);!G||G.isLocked||(G.x+=x,G.y+=g)}I?h():s.isDirty=!0}function fe(x,g,I,O=!0){T(x,{x:g,y:I},O)}function Me(x,g,I,O=!0){T(x,{width:g,height:I},O)}function ye(x,g,I=!0){T(x,{rotation:g},I)}function He(x,g){const I=[...r.elements].sort((L,A)=>L.zIndex-A.zIndex),O=I.findIndex(L=>L.id===x);if(O<0)return;const[G]=I.splice(O,1);I.splice(g,0,G),I.forEach((L,A)=>{L.zIndex=A+1}),h()}function Ke(x){const g=[...r.elements].sort((O,G)=>O.zIndex-G.zIndex),I=g.findIndex(O=>O.id===x);I<0||I===g.length-1||He(x,I+1)}function Re(x){const I=[...r.elements].sort((O,G)=>O.zIndex-G.zIndex).findIndex(O=>O.id===x);I<=0||He(x,I-1)}function Ve(x){He(x,r.elements.length-1)}function Je(x){He(x,0)}function et(x){r.background=x,h()}function Qe(x){s.zoom=Math.max(.1,Math.min(8,x))}function ze(x,g){s.pan={x,y:g}}function Be(x){s.tool=x}function Z(x){r.name=x,h()}function Ee(x){const g=x??s.containerSize;if(!g.w||!g.h)return;const I=80,O=(g.w-I)/r.canvasSize.width,G=(g.h-I)/r.canvasSize.height,L=Math.min(O,G,1);s.zoom=L,s.pan={x:0,y:0}}function ce(){s.inspectorVisible=!s.inspectorVisible}return{get project(){return r},get selectedIds(){return e},get ui(){return s},get history(){return n},canUndo:()=>n.index>0,canRedo:()=>n.index<n.stack.length-1,markSaved:()=>{s.isDirty=!1},setSaving:x=>{s.isSaving=x},addElement:pe,addCentered:de,updateElement:T,updateMany:ue,alignSelected:N,distributeSelected:E,getElement:ge,deleteElements:j,duplicateElements:K,selectOnly:je,toggleSelect:$e,clearSelection:Q,selectAll:oe,moveBy:ae,setPosition:fe,setSize:Me,setRotation:ye,reorderTo:He,bringForward:Ke,sendBackward:Re,bringToFront:Ve,sendToBack:Je,setBackground:et,setZoom:Qe,setPan:ze,setTool:Be,setName:Z,fitToScreen:Ee,toggleInspector:ce,undo:t,redo:l,commit:h}}function po(o){return Br(yr,o)}function $r(){const o=Dr(yr);if(!o)throw new Error("Editor context not found");return o}function mo(o={}){return{id:crypto.randomUUID(),type:"text",x:100,y:100,width:400,height:80,rotation:0,isLocked:!1,isVisible:!0,zIndex:1,text:"اكتب هنا",fontFamily:"IBM Plex Sans Arabic",fontSize:48,color:"#111111",isBold:!1,isItalic:!1,isUnderline:!1,textAlignment:"center",letterSpacing:0,lineHeight:1.3,opacity:1,...o}}function go(o={}){return{id:crypto.randomUUID(),type:"shape",x:200,y:200,width:200,height:200,rotation:0,isLocked:!1,isVisible:!0,zIndex:1,shapeType:"rectangle",fillColor:"#5b46f6",strokeWidth:0,cornerRadius:0,opacity:1,...o}}function bo(o){return{id:crypto.randomUUID(),type:"image",x:100,y:100,width:400,height:400,rotation:0,isLocked:!1,isVisible:!0,zIndex:1,fit:"cover",opacity:1,cornerRadius:0,flipHorizontal:!1,flipVertical:!1,cropTop:0,cropBottom:0,cropLeft:0,cropRight:0,cropShape:"none",brightness:0,contrast:0,saturation:0,...o}}function fr(o={}){return{id:crypto.randomUUID(),type:"sticker",x:200,y:200,width:160,height:160,rotation:0,isLocked:!1,isVisible:!0,zIndex:1,stickerType:"emoji",content:"✨",opacity:1,flipHorizontal:!1,flipVertical:!1,...o}}function xo(o){switch(o){case"diamond":return"M 50 0 L 100 50 L 50 100 L 0 50 Z";case"heart":return"M 50 90 C 10 60, 0 30, 25 15 C 40 6, 50 20, 50 20 C 50 20, 60 6, 75 15 C 100 30, 90 60, 50 90 Z";case"hexagon":return"M 25 7 L 75 7 L 100 50 L 75 93 L 25 93 L 0 50 Z";case"crescent":return"M 80 50 A 30 30 0 1 1 30 26 A 22 22 0 1 0 80 50 Z";case"triangle":return"M 50 0 L 100 100 L 0 100 Z";default:return""}}function vr(o){return["diamond","heart","hexagon","crescent"].includes(o)}var yo=_('<div class="absolute z-30 pointer-events-none px-2 py-1 rounded-[8px] text-xs font-semibold tabular-nums shadow-[var(--shadow-2)]"> </div>'),$o=_('<button title="Bold (Ctrl+B)" aria-label="Bold"><!></button> <button title="Italic (Ctrl+I)" aria-label="Italic"><!></button> <span class="w-px h-4 bg-[var(--color-border)] mx-0.5"></span>',1),ko=_('<div class="absolute z-20 pointer-events-auto"><div class="flex items-center gap-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[10px] shadow-[var(--shadow-2)] p-1"><!> <button class="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface-2)] text-[var(--color-ink-2)]" title="Bring forward" aria-label="Bring forward"><!></button> <button class="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface-2)] text-[var(--color-ink-2)]" title="Send backward" aria-label="Send backward"><!></button> <span class="w-px h-4 bg-[var(--color-border)] mx-0.5"></span> <button class="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface-2)] text-[var(--color-ink-2)]" title="Duplicate (Ctrl+D)" aria-label="Duplicate"><!></button> <button class="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface-2)] text-[var(--color-danger)]" title="Delete" aria-label="Delete"><!></button></div></div>'),wo=_('<div class="relative w-full h-full overflow-hidden"></div> <!> <!>',1);function _o(o,r){St(r,!0);const e=$r();let n=Le(null),s=null,h=null,t=null,l=null;const C=new Map;let pe=!1,de=!1,ge=Le(!1),T=Le(!1),ue=Le(null),N=Le(!1),E=Le(!1),j={x:0,y:0};const K=me(()=>{if(e.selectedIds.length!==1||i(ge)||i(E)||i(T)||!t)return null;const a=e.selectedIds[0],c=e.getElement(a);if(!c)return null;e.ui.zoom;const m=je(c.x+c.width/2,c.y);return{left:m.x,top:m.y-12,el:c}});function je(a,c){if(!t)return{x:0,y:0};const m=t.viewportTransform;return{x:a*m[0]+m[4],y:c*m[3]+m[5]}}Kt(()=>{let a=()=>{};return(async()=>(h=await ra(()=>import("../chunks/CJGn5kkc.js"),[],import.meta.url),i(n)&&(He(),a=()=>{const c=i(n)??s;c&&(c.removeEventListener("touchstart",fe),c.removeEventListener("touchmove",Me),c.removeEventListener("touchend",ye),c.removeEventListener("touchcancel",ye)),t==null||t.dispose(),window.removeEventListener("keydown",A),window.removeEventListener("keyup",F),window.removeEventListener("pointerup",L),window.removeEventListener("blur",L),typeof document<"u"&&document.fonts&&document.fonts.removeEventListener("loadingdone",Ke),$e==null||$e.disconnect()})))(),()=>a()});let $e=null,Q=null;function oe(a){return{x:(a[0].clientX+a[1].clientX)/2,y:(a[0].clientY+a[1].clientY)/2}}function ae(a){return Math.hypot(a[0].clientX-a[1].clientX,a[0].clientY-a[1].clientY)}function fe(a){if(!t||!s||a.touches.length!==2)return;a.preventDefault();const c=s.getBoundingClientRect(),m=oe(a.touches),b=m.x-c.left,w=m.y-c.top,M=e.ui.zoom,y=t.viewportTransform;Q={d0:ae(a.touches),z0:M,wx0:(b-y[4])/M,wy0:(w-y[5])/M},t.discardActiveObject(),t.selection=!1,t.requestRenderAll()}function Me(a){if(!Q||!t||!s||a.touches.length!==2)return;a.preventDefault();const c=s.getBoundingClientRect(),m=oe(a.touches),b=m.x-c.left,w=m.y-c.top,y=ae(a.touches)/Q.d0,k=Math.max(.1,Math.min(8,Q.z0*y)),d=e.project.canvasSize.width,$=e.project.canvasSize.height,J=t.getWidth(),re=t.getHeight(),ee=b-Q.wx0*k,Te=w-Q.wy0*k,Se=(J-d*k)/2,ve=(re-$*k)/2;e.setZoom(k),e.setPan(ee-Se,Te-ve)}function ye(a){a.touches.length<2&&Q&&(Q=null,t&&(t.selection=!0))}function He(){var k;if(!h||!i(n))return;s=document.createElement("canvas"),s.style.display="block",s.style.touchAction="none",i(n).appendChild(s),t=new h.Canvas(s,{width:i(n).clientWidth,height:i(n).clientHeight,backgroundColor:"transparent",preserveObjectStacking:!0,selection:!0,stopContextMenu:!0,fireRightClick:!0}),l=new h.Rect({left:0,top:0,width:e.project.canvasSize.width,height:e.project.canvasSize.height,fill:"#ffffff",selectable:!1,evented:!1,hoverCursor:"default",excludeFromExport:!1}),t.add(l),h.FabricObject.prototype.set({borderColor:"#5b46f6",borderScaleFactor:1.25,cornerColor:"#ffffff",cornerStrokeColor:"#5b46f6",transparentCorners:!1,cornerSize:12,touchCornerSize:28,padding:2,snapAngle:15,snapThreshold:7});const a="#5b46f6",c=(d,$,J,re,ee,Te,Se)=>{d.save(),d.translate($,J),d.rotate(Se*Math.PI/180),d.shadowColor="rgba(15, 23, 42, 0.18)",d.shadowBlur=6,d.shadowOffsetY=1,d.beginPath();const ve=-re/2,R=-ee/2,ke=Math.min(Te,re/2,ee/2);d.moveTo(ve+ke,R),d.lineTo(ve+re-ke,R),d.quadraticCurveTo(ve+re,R,ve+re,R+ke),d.lineTo(ve+re,R+ee-ke),d.quadraticCurveTo(ve+re,R+ee,ve+re-ke,R+ee),d.lineTo(ve+ke,R+ee),d.quadraticCurveTo(ve,R+ee,ve,R+ee-ke),d.lineTo(ve,R+ke),d.quadraticCurveTo(ve,R,ve+ke,R),d.closePath(),d.fillStyle="#ffffff",d.fill(),d.shadowColor="transparent",d.lineWidth=1.5,d.strokeStyle=a,d.stroke(),d.restore()},m=function(d,$,J,re,ee){var Se;const Te=((Se=ee.getTotalAngle)==null?void 0:Se.call(ee))??0;c(d,$,J,12,12,3,Te)},b=d=>function($,J,re,ee,Te){var ke;const Se=((ke=Te.getTotalAngle)==null?void 0:ke.call(Te))??0;c($,J,re,d==="h"?18:6,d==="h"?6:18,3,Se)},w=function(d,$,J,re,ee){d.save(),d.shadowColor="rgba(15, 23, 42, 0.2)",d.shadowBlur=6,d.shadowOffsetY=1,d.beginPath(),d.arc($,J,6,0,Math.PI*2),d.fillStyle="#ffffff",d.fill(),d.shadowColor="transparent",d.lineWidth=1.5,d.strokeStyle=a,d.stroke(),d.restore()},M=d=>{if(!d||!d.controls)return;const $=d.controls;$.tl&&($.tl.render=m),$.tr&&($.tr.render=m),$.bl&&($.bl.render=m),$.br&&($.br.render=m),$.mt&&($.mt.render=b("h")),$.mb&&($.mb.render=b("h")),$.ml&&($.ml.render=b("v")),$.mr&&($.mr.render=b("v")),h&&d instanceof h.Textbox&&($.mt&&($.mt.visible=!1),$.mb&&($.mb.visible=!1)),$.mtr&&($.mtr.y=.5,$.mtr.offsetY=28,$.mtr.render=w)};t.on("object:added",d=>M(d.target)),t.on("selection:created",ce),t.on("selection:updated",ce),t.on("selection:cleared",()=>{de||e.clearSelection()}),t.on("object:moving",Z),t.on("object:rotating",d=>{const $=d.target;if(!$)return;const J=(($.angle??0)%360+360)%360,re=$.getCenterPoint(),ee=je(re.x,re.y);W(ue,{angle:J,left:ee.x,top:ee.y},!0)}),t.on("object:modified",()=>{W(ue,null),Ee()}),t.on("mouse:wheel",g),t.on("mouse:down:before",I),t.on("mouse:up",G),t.on("mouse:move",O);const y=i(n)??s;y&&(y.addEventListener("touchstart",fe,{passive:!1}),y.addEventListener("touchmove",Me,{passive:!1}),y.addEventListener("touchend",ye,{passive:!1}),y.addEventListener("touchcancel",ye,{passive:!1})),t.on("before:transform",()=>{W(T,!0)}),t.on("mouse:down",d=>{d.target&&W(T,!0)}),window.addEventListener("pointerup",L),window.addEventListener("blur",L),t.on("text:editing:entered",()=>{W(ge,!0)}),t.on("text:editing:exited",()=>{W(ge,!1),Ee()}),window.addEventListener("keydown",A),window.addEventListener("keyup",F),typeof document<"u"&&document.fonts&&(document.fonts.ready.then(Ke),document.fonts.addEventListener("loadingdone",Ke)),$e=new ResizeObserver(()=>{!t||!i(n)||(t.setDimensions({width:i(n).clientWidth,height:i(n).clientHeight}),e.ui.containerSize={w:i(n).clientWidth,h:i(n).clientHeight},Re())}),$e.observe(i(n)),e.ui.containerSize={w:i(n).clientWidth,h:i(n).clientHeight},e.fitToScreen({w:i(n).clientWidth,h:i(n).clientHeight}),(k=r.registerExport)==null||k.call(r,ne),Wr(()=>{_t(()=>{e.project.background,e.project.canvasSize.width,e.project.canvasSize.height,Ve()}),_t(()=>{e.project.elements.length,e.project.elements.map(d=>d.id+"|"+d.zIndex).join(","),Je()}),_t(()=>{for(const d of e.project.elements){d.x,d.y,d.width,d.height,d.rotation,d.isVisible,d.isLocked,d.type==="text"?(d.text,d.fontFamily,d.fontSize,d.color,d.isBold,d.isItalic,d.isUnderline,d.textAlignment,d.lineHeight,d.letterSpacing,d.opacity):d.type==="shape"?(d.fillColor,d.strokeColor,d.strokeWidth,d.cornerRadius,d.opacity):d.type==="image"?(d.imageSrc,d.cornerRadius,d.flipHorizontal,d.flipVertical,d.opacity):d.type==="sticker"&&(d.content,d.color,d.fontFamily,d.opacity);const $=C.get(d.id);$&&!pe&&ze($,d)}t==null||t.requestRenderAll()}),_t(()=>{e.selectedIds.join(","),x()}),_t(()=>{e.ui.zoom,e.ui.pan.x,e.ui.pan.y,e.project.canvasSize.width,e.project.canvasSize.height,Re()}),_t(()=>{i(n)&&(e.ui.tool,i(E)?i(n).style.cursor="grabbing":i(N)?i(n).style.cursor="grab":e.ui.tool==="select"?i(n).style.cursor="default":i(n).style.cursor="crosshair")})})}function Ke(){t==null||t.requestRenderAll()}function Re(){if(!t)return;const a=e.ui.zoom,c=e.project.canvasSize.width,m=e.project.canvasSize.height,b=t.getWidth(),w=t.getHeight(),M=(b-c*a)/2+e.ui.pan.x,y=(w-m*a)/2+e.ui.pan.y;t.setViewportTransform([a,0,0,a,M,y]),t.requestRenderAll()}function Ve(){if(!t||!h||!l)return;const a=e.project.canvasSize.width,c=e.project.canvasSize.height;l.set({width:a,height:c});const m=e.project.background;if(m.type==="color")l.set({fill:m.color});else if(m.type==="gradient"){const b=m.angle*Math.PI/180,w=Math.sqrt(a*a+c*c)/2,M=a/2,y=c/2,k=M-Math.cos(b)*w,d=y-Math.sin(b)*w,$=M+Math.cos(b)*w,J=y+Math.sin(b)*w,re=new h.Gradient({type:"linear",coords:{x1:k,y1:d,x2:$,y2:J},colorStops:m.stops.map(ee=>({color:ee.color,offset:ee.offset}))});l.set({fill:re})}else if(m.type==="image"){const b=m.fit;h.FabricImage.fromURL(m.src,{crossOrigin:"anonymous"}).then(w=>{var k;if(!t||!l||!h)return;l.set({fill:"#ffffff"});const M=w.width||a,y=w.height||c;if(b==="fill")w.set({left:0,top:0,scaleX:a/M,scaleY:c/y,cropX:0,cropY:0,width:M,height:y});else{let d;b==="contain"?d=Math.min(a/M,c/y):b==="fitWidth"?d=a/M:b==="fitHeight"?d=c/y:d=Math.max(a/M,c/y);const $=Math.min(M,a/d),J=Math.min(y,c/d),re=Math.max(0,(M-$)/2),ee=Math.max(0,(y-J)/2),Te=$*d,Se=J*d;w.set({cropX:re,cropY:ee,width:$,height:J,scaleX:d,scaleY:d,left:(a-Te)/2,top:(c-Se)/2})}w.set({originX:"left",originY:"top",selectable:!1,evented:!1,excludeFromExport:!1}),w.set("data",{kind:"background-image"});for(const d of t.getObjects())((k=d.data)==null?void 0:k.kind)==="background-image"&&t.remove(d);t.add(w),t.sendObjectToBack(w),t.sendObjectToBack(l),t.requestRenderAll()}).catch(()=>{})}t.requestRenderAll()}function Je(){var m;if(!t||!h)return;const a=new Map;for(const b of e.project.elements)a.set(b.id,b);for(const[b,w]of[...C.entries()])a.has(b)||(t.remove(w),C.delete(b));for(const b of e.project.elements)if(!C.has(b.id)){const w=et(b);if(!w)continue;C.set(b.id,w),t.add(w)}const c=[...e.project.elements].sort((b,w)=>b.zIndex-w.zIndex);l&&t.sendObjectToBack(l);for(const b of t.getObjects())((m=b.data)==null?void 0:m.kind)==="background-image"&&(t.sendObjectToBack(b),l&&t.sendObjectToBack(l));for(const b of c){const w=C.get(b.id);w&&t.bringObjectToFront(w)}t.requestRenderAll()}function et(a){if(!h)return null;let c=null;if(a.type==="text")c=new h.Textbox(a.text,{left:a.x,top:a.y,width:a.width,fontFamily:a.fontFamily,fontSize:a.fontSize,fill:a.color,textAlign:a.textAlignment,fontWeight:a.isBold?"bold":"normal",fontStyle:a.isItalic?"italic":"normal",underline:a.isUnderline,lineHeight:a.lineHeight,charSpacing:a.letterSpacing/Math.max(1,a.fontSize)*1e3,opacity:a.opacity,editable:!0,splitByGrapheme:!1});else if(a.type==="shape")c=Qe(a);else if(a.type==="image"){const m=new h.Rect({left:a.x,top:a.y,width:a.width,height:a.height,fill:"rgba(0,0,0,0.04)",stroke:"#d1d5db",strokeDashArray:[4,4],strokeUniform:!0});m.set("data",{elementId:a.id,type:"image-loading"}),h.FabricImage.fromURL(a.imageSrc,{crossOrigin:"anonymous"}).then(b=>{if(!t||C.get(a.id)!==m)return;b.set({left:a.x,top:a.y,scaleX:a.width/(b.width||a.width),scaleY:a.height/(b.height||a.height),opacity:a.opacity,flipX:a.flipHorizontal,flipY:a.flipVertical}),b.set("data",{elementId:a.id}),a.cornerRadius>0&&h&&(b.clipPath=new h.Rect({width:b.width,height:b.height,rx:a.cornerRadius*(b.width||1)/a.width,ry:a.cornerRadius*(b.height||1)/a.height,originX:"center",originY:"center"})),t.remove(m),C.set(a.id,b),t.add(b);const M=[...e.project.elements].sort((y,k)=>y.zIndex-k.zIndex);for(const y of M){const k=C.get(y.id);k&&t.bringObjectToFront(k)}t.requestRenderAll()}).catch(()=>{}),c=m}else a.type==="sticker"&&(c=new h.Textbox(a.content,{left:a.x,top:a.y,width:a.width,fontSize:a.height*.8,fontFamily:a.fontFamily??"system-ui",fill:a.color??"#111111",textAlign:"center",opacity:a.opacity,flipX:a.flipHorizontal,flipY:a.flipVertical,editable:!1}));return c?(c.set({angle:a.rotation*180/Math.PI,visible:a.isVisible,selectable:!a.isLocked,evented:!a.isLocked,lockMovementX:a.isLocked,lockMovementY:a.isLocked,lockRotation:a.isLocked,lockScalingX:a.isLocked,lockScalingY:a.isLocked,originX:"left",originY:"top"}),c.set("data",{...c.get("data")??{},elementId:a.id}),c):null}function Qe(a){if(!h)return null;const c={left:a.x,top:a.y,width:a.width,height:a.height,fill:a.fillColor,stroke:a.strokeColor??"",strokeWidth:a.strokeWidth,strokeUniform:!0,opacity:a.opacity};switch(a.shapeType){case"rectangle":return new h.Rect({...c,rx:a.cornerRadius,ry:a.cornerRadius});case"circle":return new h.Ellipse({...c,rx:a.width/2,ry:a.height/2});case"triangle":return new h.Triangle(c);case"line":return new h.Line([0,a.height/2,a.width,a.height/2],{left:a.x,top:a.y,stroke:a.fillColor,strokeWidth:Math.max(a.strokeWidth,4),strokeUniform:!0,opacity:a.opacity});case"arrow":{const m=`M 0 ${a.height/2} L ${a.width-16} ${a.height/2} M ${a.width-16} ${a.height/2-8} L ${a.width} ${a.height/2} L ${a.width-16} ${a.height/2+8} Z`;return new h.Path(m,{left:a.x,top:a.y,fill:a.fillColor,stroke:a.fillColor,strokeWidth:Math.max(a.strokeWidth,4),strokeUniform:!0,opacity:a.opacity})}case"star":{const m=[],b=a.sides??5,w=a.width/2,M=a.innerRadius??w/2,y=a.width/2,k=a.height/2;for(let d=0;d<b*2;d++){const $=d%2===0?w:M,J=d/(b*2)*Math.PI*2-Math.PI/2;m.push({x:y+Math.cos(J)*$,y:k+Math.sin(J)*$})}return new h.Polygon(m,c)}case"polygon":{const m=[],b=a.sides??6,w=a.width/2,M=a.width/2,y=a.height/2;for(let k=0;k<b;k++){const d=k/b*Math.PI*2-Math.PI/2;m.push({x:M+Math.cos(d)*w,y:y+Math.sin(d)*w})}return new h.Polygon(m,c)}case"diamond":case"heart":case"hexagon":case"crescent":{if(!vr(a.shapeType))return null;const m=new h.Path(xo(a.shapeType),{left:a.x,top:a.y,fill:a.fillColor,stroke:a.strokeColor??"",strokeWidth:a.strokeWidth,strokeUniform:!0,opacity:a.opacity});return m.set({scaleX:a.width/100,scaleY:a.height/100}),m}default:return new h.Rect(c)}}function ze(a,c){var b,w,M;const m=t==null?void 0:t._currentTransform;if((m==null?void 0:m.target)!==a&&!a.isMoving){if(a.set({left:c.x,top:c.y,angle:c.rotation*180/Math.PI,visible:c.isVisible,selectable:!c.isLocked,evented:!c.isLocked,opacity:"opacity"in c?c.opacity:1}),c.type==="text"){const y=a;y.text!==c.text&&!y.isEditing&&y.set({text:c.text}),y.set({width:c.width,fontFamily:c.fontFamily,fontSize:c.fontSize,fill:c.color,textAlign:c.textAlignment,fontWeight:c.isBold?"bold":"normal",fontStyle:c.isItalic?"italic":"normal",underline:c.isUnderline,lineHeight:c.lineHeight,charSpacing:c.letterSpacing/Math.max(1,c.fontSize)*1e3,scaleX:1,scaleY:1})}else if(c.type==="shape"){const y=c;y.shapeType==="rectangle"||y.shapeType==="triangle"||y.shapeType==="star"||y.shapeType==="polygon"?a.set({width:y.width,height:y.height,scaleX:1,scaleY:1}):y.shapeType==="circle"?a.set({rx:y.width/2,ry:y.height/2,width:y.width,height:y.height,scaleX:1,scaleY:1}):y.shapeType==="line"?a.set({x1:0,y1:y.height/2,x2:y.width,y2:y.height/2}):vr(y.shapeType)&&a.set({scaleX:y.width/100,scaleY:y.height/100}),(b=a.set)==null||b.call(a,{fill:y.fillColor}),(w=a.set)==null||w.call(a,{stroke:y.strokeColor??""}),(M=a.set)==null||M.call(a,{strokeWidth:y.strokeWidth}),y.shapeType==="rectangle"&&a.set({rx:y.cornerRadius,ry:y.cornerRadius})}else if(c.type==="image"){const y=a,k=y.width||c.width,d=y.height||c.height;y.set({scaleX:(c.flipHorizontal?-1:1)*(c.width/k),scaleY:(c.flipVertical?-1:1)*(c.height/d),flipX:!1,flipY:!1})}else c.type==="sticker"&&a.set({text:c.content,width:c.width,fontSize:c.height*.8,fontFamily:c.fontFamily??"system-ui",fill:c.color??"#111111",flipX:c.flipHorizontal,flipY:c.flipVertical});a.setCoords()}}function Be(a){var y;const c=(y=a.get("data"))==null?void 0:y.elementId;if(!c)return;const m=e.getElement(c);if(!m)return;const b={x:a.left??m.x,y:a.top??m.y,rotation:(a.angle??0)*Math.PI/180},w=a.scaleX??1,M=a.scaleY??1;if(m.type==="text"||m.type==="sticker"){const k=(a.width??m.width)*Math.abs(w),d=(a.height??m.height)*Math.abs(M);if(b.width=k,b.height=d,a.set({scaleX:1,scaleY:1,width:k,height:d}),m.type==="text"){const $=a;typeof $.text=="string"&&(b.text=$.text)}}else if(m.type==="shape"){const k=(a.width??m.width)*Math.abs(w),d=(a.height??m.height)*Math.abs(M);b.width=k,b.height=d,m.shapeType!=="diamond"&&m.shapeType!=="heart"&&m.shapeType!=="hexagon"&&m.shapeType!=="crescent"&&a.set({scaleX:1,scaleY:1,width:k,height:d})}else if(m.type==="image"){const k=a,d=k.width||m.width,$=k.height||m.height,J=d*Math.abs(w),re=$*Math.abs(M);b.width=J,b.height=re,b.flipHorizontal=w<0,b.flipVertical=M<0}pe=!0,e.updateElement(c,b,!1),pe=!1}function Z(){const a=t==null?void 0:t.getActiveObject();if(a)if(a.type==="activeselection"){const c=a;for(const m of c.getObjects())Be(m)}else Be(a)}function Ee(){Z(),e.commit(),W(T,!1)}function ce(){var m;if(de||!t)return;const a=t.getActiveObject();if(!a)return;let c=[];if(a.type==="activeselection")c=a.getObjects().map(w=>{var M;return(M=w.get("data"))==null?void 0:M.elementId}).filter(w=>!!w);else{const b=(m=a.get("data"))==null?void 0:m.elementId;b&&(c=[b])}e.selectedIds.splice(0,e.selectedIds.length,...c)}function x(){if(!(!t||!h)){de=!0;try{const a=e.selectedIds;if(a.length===0)t.discardActiveObject();else if(a.length===1){const c=C.get(a[0]);c&&t.getActiveObject()!==c&&t.setActiveObject(c)}else{const c=a.map(m=>C.get(m)).filter(m=>!!m);if(c.length>1){t.discardActiveObject();const m=new h.ActiveSelection(c,{canvas:t});t.setActiveObject(m)}}t.requestRenderAll()}finally{de=!1}}}function g(a){if(!t)return;const c=a.e;if(c.preventDefault(),c.stopPropagation(),!(c.ctrlKey||c.metaKey)){e.setPan(e.ui.pan.x-c.deltaX,e.ui.pan.y-c.deltaY);return}const b=e.ui.zoom,w=Math.exp(-c.deltaY*.0015),M=Math.max(.1,Math.min(8,b*w)),y=s==null?void 0:s.getBoundingClientRect();if(!y)return;const k=c.clientX-y.left,d=c.clientY-y.top,$=t.viewportTransform,J=(k-$[4])/b,re=(d-$[5])/b,ee=e.project.canvasSize.width,Te=e.project.canvasSize.height,Se=t.getWidth(),ve=t.getHeight(),R=k-J*M,ke=d-re*M,U=(Se-ee*M)/2,qe=(ve-Te*M)/2;e.setZoom(M),e.setPan(R-U,ke-qe)}function I(a){if(i(N)&&t){W(E,!0),t.selection=!1;const c=a.e;j={x:c.clientX,y:c.clientY}}}function O(a){if(!i(E)||!t)return;const c=a.e,m=c.clientX-j.x,b=c.clientY-j.y;j={x:c.clientX,y:c.clientY},e.setPan(e.ui.pan.x+m,e.ui.pan.y+b)}function G(){i(E)&&t&&(W(E,!1),t.selection=!0),W(T,!1),W(ue,null)}function L(){var c;if(!t)return;const a=t;if(a._currentTransform)try{(c=a.__onMouseUp)==null||c.call(a,new PointerEvent("pointerup"))}catch{a._currentTransform=void 0}W(T,!1),i(E)&&(W(E,!1),t.selection=!0)}function A(a){a.code==="Space"&&!z(a.target)&&(W(N,!0),a.preventDefault())}function F(a){a.code==="Space"&&W(N,!1)}function z(a){return!a||!(a instanceof HTMLElement)?!1:a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.isContentEditable}async function ne(a,c){if(!t||!h)throw new Error("Canvas not ready");const m=e.project.canvasSize.width,b=e.project.canvasSize.height,w=[...t.viewportTransform],M=t.getWidth(),y=t.getHeight();t.setViewportTransform([1,0,0,1,0,0]),t.setDimensions({width:m,height:b});let k=null;if(c){const $=Math.round(m*.03);k=new h.Textbox("صُمم بـ Betakti",{left:m-$*8,top:b-$*1.6,width:$*8,fontSize:$,fontFamily:"IBM Plex Sans Arabic, Readex Pro, system-ui",fill:"#000000",opacity:.5,selectable:!1,evented:!1,textAlign:"right"}),t.add(k),t.requestRenderAll()}const d=t.toDataURL({format:"png",multiplier:a,left:0,top:0,width:m,height:b});return k&&t.remove(k),t.setDimensions({width:M,height:y}),t.setViewportTransform(w),t.requestRenderAll(),d}var Ae=wo(),se=P(Ae);let Ie;jt(se,a=>W(n,a),()=>i(n));var Ce=v(se,2);{var Ne=a=>{const c=me(()=>Math.round(i(ue).angle)),m=me(()=>i(c)%15===0);var b=yo();let w;var M=f(b);u(b),te(()=>{w=lt(b,"",w,{left:`${i(ue).left??""}px`,top:`${i(ue).top??""}px`,transform:"translate(-50%, -50%)",background:i(m)?"#5b46f6":"var(--color-surface)",color:i(m)?"#ffffff":"var(--color-ink)",border:`1px solid ${i(m)?"#5b46f6":"var(--color-border)"}`}),he(M,`${i(c)??""}°`)}),p(a,b)};xe(Ce,a=>{i(ue)&&a(Ne)})}var Ze=v(Ce,2);{var _e=a=>{var c=ko();let m;var b=f(c),w=f(b);{var M=Se=>{var ve=$o(),R=P(ve),ke=f(R);mr(ke,{size:13,strokeWidth:2.2}),u(R);var U=v(R,2),qe=f(U);br(qe,{size:13,strokeWidth:2.2}),u(U),rt(2),te(()=>{Xe(R,1,`w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface-2)] ${i(K).el.isBold?"text-[var(--color-accent)] bg-[var(--color-surface-2)]":"text-[var(--color-ink-2)]"}`),Xe(U,1,`w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface-2)] ${i(K).el.isItalic?"text-[var(--color-accent)] bg-[var(--color-surface-2)]":"text-[var(--color-ink-2)]"}`)}),S("click",R,()=>{const vt=i(K).el;e.updateElement(vt.id,{isBold:!vt.isBold})}),S("click",U,()=>{const vt=i(K).el;e.updateElement(vt.id,{isItalic:!vt.isItalic})}),p(Se,ve)};xe(w,Se=>{i(K).el.type==="text"&&Se(M)})}var y=v(w,2),k=f(y);Ca(k,{size:13,strokeWidth:2}),u(y);var d=v(y,2),$=f(d);Ma($,{size:13,strokeWidth:2}),u(d);var J=v(d,4),re=f(J);Na(re,{size:13,strokeWidth:2}),u(J);var ee=v(J,2),Te=f(ee);aa(Te,{size:13,strokeWidth:2}),u(ee),u(b),u(c),te(()=>m=lt(c,"",m,{left:`${i(K).left??""}px`,top:`${i(K).top??""}px`,transform:"translate(-50%, -100%)"})),S("click",y,()=>e.bringForward(i(K).el.id)),S("click",d,()=>e.sendBackward(i(K).el.id)),S("click",J,()=>{const[Se]=e.duplicateElements([i(K).el.id]);Se&&e.selectOnly(Se.id)}),S("click",ee,()=>e.deleteElements([i(K).el.id])),p(a,c)};xe(Ze,a=>{i(K)&&a(_e)})}te(()=>Ie=lt(se,"",Ie,{background:e.ui.gridVisible?"radial-gradient(color-mix(in srgb, var(--color-ink) 8%, transparent) 1px, transparent 1px) 0 0 / 24px 24px, var(--color-surface-2)":"var(--color-surface-2)"})),p(o,Ae),Mt()}At(["click"]);var zo=_('<span class="font-mono w-5"> </span>'),So=_('<span class="ms-1 text-[10px] font-mono text-[var(--color-muted)]"> </span>'),Mo=_('<label class="flex items-center gap-1.5 text-xs text-[var(--color-muted)]"><!> <span class="relative flex items-center"><input class="font-mono text-right bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-[6px] px-2 py-1 w-20 text-[var(--color-ink)] focus:border-[var(--color-accent)] outline-none" inputmode="decimal"/> <!></span></label>');function st(o,r){St(r,!0);const e=$t(r,"suffix",3,""),n=$t(r,"step",3,1);let s=Le("");_t(()=>{W(s,h(r.value),!0)});function h(E){return Number.isInteger(E)?String(E):E.toFixed(2).replace(/\.?0+$/,"")}function t(){const E=parseFloat(i(s));if(Number.isFinite(E)){let j=E;r.min!==void 0&&(j=Math.max(r.min,j)),r.max!==void 0&&(j=Math.min(r.max,j)),r.onChange(j),W(s,h(j),!0)}else W(s,h(r.value),!0)}function l(E){E.key==="Enter"&&E.currentTarget.blur(),E.key==="ArrowUp"&&(E.preventDefault(),r.onChange(r.value+n())),E.key==="ArrowDown"&&(E.preventDefault(),r.onChange(r.value-n()))}var C=Mo(),pe=f(C);{var de=E=>{var j=zo(),K=f(j,!0);u(j),te(()=>he(K,r.label)),p(E,j)};xe(pe,E=>{r.label&&E(de)})}var ge=v(pe,2),T=f(ge);ft(T);var ue=v(T,2);{var N=E=>{var j=So(),K=f(j,!0);u(j),te(()=>he(K,e())),p(E,j)};xe(ue,E=>{e()&&E(N)})}u(ge),u(C),Ut("blur",T,t),S("keydown",T,l),oa(T,()=>i(s),E=>W(s,E)),p(o,C),Mt()}At(["keydown"]);const kr=["Amiri-Regular","Amiri-Bold","Amiri-Italic","Amiri-BoldItalic","amiri-quran","amiri-slanted","ArefRuqaa-Regular","ArefRuqaa-Bold","ArefRuqaaInk-Regular","ArefRuqaaInk-Bold","BalooBhaijaan-Regular","Blaka-Regular","Cairo-Regular","Cairo-SemiBold","Cairo-Black","cairo-light","cairo-extra-light","cairo-bold","Changa-Regular","Changa-Light","Changa-ExtraLight","Changa-Medium","Changa-SemiBold","Changa-Bold","Changa-ExtraBold","DroidKufi-Regular","ElMessiri-Medium","ElMessiri-SemiBold","ElMessiri-Bold","elmessiri-light","Gulzar-Regular","Harmattan-Regular","Ibtisam","Jomhuria-Regular","Katibeh-Regular","Lalezar-Regular","LateefRegOT","Lemonada-Light","Lemonada-Regular","Lemonada-SemiBold","lemonada-bold","Mada-ExtraLight","mada-light","Mada-Regular","Mada-Medium","Mada-SemiBold","mada-bold","Marhey-Regular","Marhey-SemiBold","Marhey-Bold","MarkaziText-Regular","Mirza-Regular","Mirza-SemiBold","Mirza-Bold","mirza-medium","noor","Noto-Urdu","NotoKufiArabic-Bold","Old-Antic-Bold","old-antic-decorative","Rakkas-Regular","ReadexPro-Regular","ReadexPro-Bold","ReemKufi-Regular","ReemKufiInk-Regular","Scheherazade-Regular","Scheherazade-Bold","Tajawal-ExtraLight","Tajawal-Light","Tajawal-Regular","Tajawal-Medium","Tajawal-Bold","Tajawal-ExtraBold","Tajawal-Black","Thabit","ah-moharram-bold","al-gemah-alhoda","al-majd","albayan","algeria","alhorr","alhurra","almawadah","almushaf","alnaqaa","alqusair","alsarout","alsarout-bold","alshohadaa","althawra-fikra","althawra-fikra-bold","aqeeq","arabswell-1","arwa","assaf","aures","b-compset","b-hamid","b-sepideh","baghdad","bahij","barabics","baran","basim-marah","bdavat","bein","bokra","bon","boutros-ads","btehran","cocon-next-arabic","diana-light","diana-regular","din","diwani","diwani-bent","droid-naskh","droid-sans","dubai","dubai-light","dubai-medium","dubai-bold","esfahan","fanni","fantezy","farisi","farsi-simple-bold","fixed-kufi","frutiger","geeza-pro","geeza-pro-bold","ghala","ghala-bold","hala","hama","hamada","hanimation","hayah","helal","homa","insan","ishraq","israr-syria","jannat","jazeera","jazeera-light","jooza","jordan","kacst-farsi","kamran","kawkab","kawkab-bold","kufi","lamar","maidan","mehrajan","milano","motairah","motairah-light","motken","muslimah","neckar","neckar-bold","noorehuda","omar","osama","rabar","rabat","rawi","rsail","rsail-bold","sabgha","sara","saudi","setareh","shahd","shahd-bold","shams","sheba","shiraz","shorooq","sky","smartman","spirit-of-doha","stc","stoor","sukar","sukar-bold","sukar-black","taha-naskh","tanseek","taqniya","tasmeem-med","thameen","themixarab","thuluth","thuluth-decorated","toyor-aljanah","vip-hakm","vip-hakm-thin","vip-hakm-bold","vip-tim","vip-tim-light","vip-tim-bold","vip-tim-black","yaraa","yaraa-regular","yassin","zahra","zahra-bold"],wr=["Alexandria-Bold","Raleway-Light","Raleway-Regular","Raleway-Bold","Raleway-Black","Rubik-Bold"],Ao=[{label:"Arabic",fonts:kr},{label:"English",fonts:wr}];[...kr,...wr];function be(o,...r){const e=r.map((n,s)=>({color:n,offset:r.length===1?0:s/(r.length-1)}));return{type:"gradient",angle:o,stops:e}}function xt(o){return{type:"color",color:o}}const Co=[{id:"solid-paper",category:"Solid",background:xt("#f8f6f1")},{id:"solid-bone",category:"Solid",background:xt("#ece6d9")},{id:"solid-mist",category:"Solid",background:xt("#eef2f6")},{id:"solid-sand",category:"Solid",background:xt("#e7dcc7")},{id:"solid-sage",category:"Solid",background:xt("#cfd9c8")},{id:"solid-sky",category:"Solid",background:xt("#bfd3e6")},{id:"solid-blush",category:"Solid",background:xt("#f3d7d2")},{id:"solid-ink",category:"Solid",background:xt("#0e1320")},{id:"soft-peach",category:"Soft",background:be(160,"#fde6d3","#f7c8b3")},{id:"soft-lavender",category:"Soft",background:be(160,"#e8e4ff","#cdc4f2")},{id:"soft-mint",category:"Soft",background:be(160,"#dff5ec","#b7e4cf")},{id:"soft-butter",category:"Soft",background:be(160,"#fff3c8","#f5dba1")},{id:"soft-rose",category:"Soft",background:be(140,"#ffe2e2","#f0b8c5")},{id:"soft-sky",category:"Soft",background:be(180,"#e6f1ff","#bcd6f7")},{id:"vivid-electric",category:"Vivid",background:be(135,"#6b4eff","#1ad0c8")},{id:"vivid-magenta",category:"Vivid",background:be(135,"#ff4f9d","#7a2cff")},{id:"vivid-citrus",category:"Vivid",background:be(135,"#ffd166","#ef476f")},{id:"vivid-tropic",category:"Vivid",background:be(135,"#06d6a0","#118ab2")},{id:"vivid-grape",category:"Vivid",background:be(135,"#5e60ce","#48bfe3")},{id:"vivid-flame",category:"Vivid",background:be(135,"#f72585","#ff7b00")},{id:"sunset-dawn",category:"Sunset",background:be(180,"#fbc2eb","#a18cd1")},{id:"sunset-amber",category:"Sunset",background:be(180,"#fceabb","#f8b500")},{id:"sunset-coral",category:"Sunset",background:be(180,"#ff9a9e","#fad0c4")},{id:"sunset-tropic",category:"Sunset",background:be(180,"#fa709a","#fee140")},{id:"sunset-dusk",category:"Sunset",background:be(180,"#3a1c71","#d76d77","#ffaf7b")},{id:"sunset-fire",category:"Sunset",background:be(160,"#f12711","#f5af19")},{id:"cool-arctic",category:"Cool",background:be(160,"#a1c4fd","#c2e9fb")},{id:"cool-ocean",category:"Cool",background:be(160,"#4facfe","#00f2fe")},{id:"cool-mint",category:"Cool",background:be(160,"#84fab0","#8fd3f4")},{id:"cool-deep",category:"Cool",background:be(160,"#0f2027","#203a43","#2c5364")},{id:"cool-iris",category:"Cool",background:be(160,"#5ee7df","#b490ca")},{id:"dark-velvet",category:"Dark",background:be(160,"#0f0c29","#302b63","#24243e")},{id:"dark-onyx",category:"Dark",background:be(160,"#000000","#434343")},{id:"dark-midnight",category:"Dark",background:be(160,"#020024","#090979","#00d4ff")},{id:"dark-coal",category:"Dark",background:be(160,"#232526","#414345")},{id:"dark-plum",category:"Dark",background:be(160,"#240b36","#c31432")},{id:"mono-pearl",category:"Mono",background:be(180,"#ffffff","#e6e9ec")},{id:"mono-graphite",category:"Mono",background:be(180,"#bdc3c7","#2c3e50")},{id:"mono-cream",category:"Mono",background:be(180,"#fff7e8","#f3e0c1")},{id:"mono-silver",category:"Mono",background:be(180,"#e0eafc","#cfdef3")}];function le(o,r,e){return Array.from({length:r},(n,s)=>({seed:`${o}-${String(s+1).padStart(2,"0")}`,category:e}))}const To=[...le("mountain",4,"Landscape"),...le("valley",3,"Landscape"),...le("desert",3,"Landscape"),...le("horizon",3,"Landscape"),...le("canyon",3,"Landscape"),...le("sky",4,"Sky"),...le("clouds",3,"Sky"),...le("sunset",3,"Sky"),...le("aurora",3,"Sky"),...le("stars",3,"Sky"),...le("ocean",4,"Sea"),...le("wave",3,"Sea"),...le("shore",3,"Sea"),...le("lake",3,"Sea"),...le("reef",3,"Sea"),...le("forest",4,"Forest"),...le("pine",3,"Forest"),...le("leaf",3,"Forest"),...le("jungle",3,"Forest"),...le("meadow",3,"Forest"),...le("city",4,"Urban"),...le("street",3,"Urban"),...le("arch",3,"Urban"),...le("facade",3,"Urban"),...le("neon",3,"Urban"),...le("paper",3,"Texture"),...le("marble",3,"Texture"),...le("wood",3,"Texture"),...le("linen",3,"Texture"),...le("concrete",3,"Texture"),...le("sand",3,"Texture"),...le("ink",3,"Abstract"),...le("bokeh",3,"Abstract"),...le("smoke",3,"Abstract"),...le("glow",3,"Abstract"),...le("flow",3,"Abstract"),...le("light",3,"Abstract")];function Eo(o){return`https://picsum.photos/seed/${o}/200/200`}function Io(o){return`https://picsum.photos/seed/${o}/1600/1200`}function Po(o){if(o.type==="color")return o.color;if(o.type==="gradient"){const r=o.stops.map(e=>`${e.color} ${Math.round(e.offset*100)}%`).join(", ");return`linear-gradient(${o.angle}deg, ${r})`}return o.type==="image"?`url(${o.src}) center/cover no-repeat`:"transparent"}var Lo=_('<button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button"><!></button>'),Fo=_('<button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button"><!></button>'),jo=_('<button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button"><!></button>'),No=_('<button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button"><!></button>'),Ro=_('<button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button"><!></button>'),Bo=_('<button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button"><!></button>'),Do=_('<button class="w-full h-8 flex items-center justify-center gap-1.5 text-xs rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button"><!> Horizontal</button>'),Wo=_('<button class="w-full h-8 flex items-center justify-center gap-1.5 text-xs rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button"><!> Vertical</button>'),Ho=_('<div class="grid grid-cols-2 gap-1 p-1 rounded-[10px] bg-[var(--color-surface-2)]"><!> <!></div>'),Uo=_('<div class="flex flex-col gap-2"><span class="text-[10px] tracking-[0.14em] uppercase text-[var(--color-muted)]" style="font-family: var(--font-mono);"> </span> <div class="grid grid-cols-6 gap-1 p-1 rounded-[10px] bg-[var(--color-surface-2)]"><!> <!> <!> <!> <!> <!></div> <!></div>'),Oo=_('<span class="absolute inset-0 flex items-center justify-center bg-black/40 text-white"><!></span>'),Vo=_('<button type="button" class="relative aspect-square w-full rounded-[8px] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:scale-[1.04] transition-all shadow-[var(--shadow-1)] overflow-hidden bg-[var(--color-surface-2)] disabled:opacity-100 disabled:cursor-wait"><img alt="" loading="lazy" class="w-full h-full object-cover block"/> <!></button>'),qo=_('<div><div class="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1.5" style="font-family: var(--font-mono);"><!> <span> </span></div> <div class="grid grid-cols-3 gap-1.5"></div></div>'),Yo=_('<span class="absolute inset-0 flex items-center justify-center bg-black/40 text-white"><!></span>'),Xo=_('<button type="button" class="relative aspect-square w-full rounded-[8px] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:scale-[1.04] transition-all shadow-[var(--shadow-1)] overflow-hidden bg-[var(--color-surface-2)] disabled:opacity-100 disabled:cursor-wait"><img alt="" loading="lazy" class="w-full h-full object-cover block"/> <!></button>'),Ko=_('<div><div class="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1.5" style="font-family: var(--font-mono);"><!> <span> </span></div> <div class="grid grid-cols-3 gap-1.5"></div></div>'),Zo=_('<div class="flex flex-col gap-3"><div><input type="file" accept="image/*" class="hidden"/> <button type="button" class="w-full h-9 flex items-center justify-center gap-2 text-xs font-medium rounded-[8px] border border-dashed border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-ink-2)] transition-colors"><!> Upload from device</button></div> <!></div>'),Go=_('<button type="button" class="aspect-square w-full rounded-[8px] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:scale-[1.04] transition-all shadow-[var(--shadow-1)]"></button>'),Jo=_('<div><div class="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1.5" style="font-family: var(--font-mono);"><!> <span> </span></div> <div class="grid grid-cols-4 gap-1.5"></div></div>'),Qo=_('<div class="flex flex-col gap-3"><div><div class="text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1.5" style="font-family: var(--font-mono);">Custom</div> <input type="color" class="w-full h-9 rounded-[8px] border border-[var(--color-border)] cursor-pointer"/></div> <!></div>'),en=_('<div class="text-sm text-[var(--color-muted)] py-2">Select an element to edit it.</div> <div><h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Canvas</h3> <div class="grid grid-cols-2 gap-2"><!> <!></div></div>   <div><h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Stock backgrounds</h3> <div class="grid grid-cols-2 gap-1 p-1 rounded-[10px] bg-[var(--color-surface-2)] mb-3"><button type="button">Images</button> <button type="button">Colors</button></div> <!></div>',1),tn=_('<button type="button"><span class="truncate text-base"> </span> <span class="shrink-0 text-[10px] font-light text-[var(--color-muted)]"> </span></button>'),rn=_('<div class="sticky top-0 bg-[var(--color-surface-2)] px-2 py-1 text-[10px] uppercase tracking-wide text-[var(--color-muted)]"> </div> <!>',1),an=_('<div class="absolute z-30 right-0 left-0 mt-1 max-h-72 overflow-y-auto rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg"></div>'),on=_('<button type="button" aria-label="Bold"><!></button>'),nn=_('<button type="button" aria-label="Italic"><!></button>'),sn=_('<button type="button" aria-label="Underline"><!></button>'),ln=_('<button type="button" aria-label="Align left"><!></button>'),cn=_('<button type="button" aria-label="Align center"><!></button>'),dn=_('<button type="button" aria-label="Align right"><!></button>'),un=_('<div><h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Text</h3> <textarea class="w-full text-sm p-2 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] mb-2 resize-none" rows="3"></textarea> <div class="relative mb-2"><button type="button" class="w-full flex items-center justify-between gap-2 text-sm px-2 py-1.5 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] text-left"><span class="truncate"> </span> <span class="text-xs text-[var(--color-muted)] shrink-0"> </span></button> <!></div> <div class="grid grid-cols-2 gap-2 mb-2"><!> <!></div> <label class="block mb-3"><input type="range" min="8" max="800" step="1" class="w-full accent-[var(--color-accent)]" aria-label="Font size"/></label> <div class="grid grid-cols-3 gap-1 p-1 rounded-[8px] bg-[var(--color-surface-2)] mb-2"><!> <!> <!></div> <div class="grid grid-cols-3 gap-1 p-1 rounded-[8px] bg-[var(--color-surface-2)] mb-3"><!> <!> <!></div> <label class="block"><span class="text-xs text-[var(--color-muted)] block mb-1">Color</span> <input type="color" class="w-full h-9 rounded-[8px] border border-[var(--color-border)] cursor-pointer"/></label></div>'),fn=_('<div><h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Shape</h3> <label class="block mb-2"><span class="text-xs text-[var(--color-muted)] block mb-1">Fill</span> <input type="color" class="w-full h-9 rounded-[8px] border border-[var(--color-border)] cursor-pointer"/></label> <label class="block mb-2"><span class="text-xs text-[var(--color-muted)] block mb-1">Stroke</span> <input type="color" class="w-full h-9 rounded-[8px] border border-[var(--color-border)] cursor-pointer"/></label> <div class="grid grid-cols-2 gap-2"><!> <!></div></div>'),vn=_('<div><h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Sticker</h3> <label class="block"><span class="text-xs text-[var(--color-muted)] block mb-1">Color</span> <input type="color" class="w-full h-9 rounded-[8px] border border-[var(--color-border)] cursor-pointer"/></label></div>'),hn=_('<button type="button" aria-label="Flip horizontal"><!> H</button>'),pn=_('<button type="button" aria-label="Flip vertical"><!> V</button>'),mn=_('<div><h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Image</h3> <div class="grid grid-cols-2 gap-2 mb-3 p-1 rounded-[8px] bg-[var(--color-surface-2)]"><!> <!></div> <label class="block mb-2 text-xs"><span class="text-[var(--color-muted)]"> </span> <input type="range" min="-1" max="1" step="0.05" class="w-full"/></label> <label class="block mb-2 text-xs"><span class="text-[var(--color-muted)]"> </span> <input type="range" min="-1" max="1" step="0.05" class="w-full"/></label> <label class="block mb-2 text-xs"><span class="text-[var(--color-muted)]"> </span> <input type="range" min="-2" max="2" step="0.1" class="w-full"/></label> <!></div>'),gn=_('<button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button" aria-label="Bring forward"><!></button>'),bn=_('<button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button" aria-label="Send backward"><!></button>'),xn=_('<button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button" aria-label="Bring to front"><!></button>'),yn=_('<button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button" aria-label="Send to back"><!></button>'),$n=_('<div><h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Transform</h3> <div class="grid grid-cols-2 gap-2"><!> <!> <!> <!> <!></div></div> <!> <!> <!> <!> <div><h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Order</h3> <div class="grid grid-cols-4 gap-1 p-1 rounded-[8px] bg-[var(--color-surface-2)]"><!> <!> <!> <!></div></div>',1),kn=_('<div class="p-4 flex flex-col gap-5"><div class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]" style="font-family: var(--font-mono);">Properties</div> <!></div>');function hr(o,r){St(r,!0);const e=$t(r,"stockBackgrounds",19,()=>[]),n=$r();let s=Le(!1),h=Le("images"),t=Le(null),l=Le(null);async function C(Q){W(l,Q,!0);try{await new Promise((oe,ae)=>{const fe=new Image;fe.onload=()=>oe(),fe.onerror=()=>ae(new Error("image load failed")),fe.src=Q}),n.setBackground({type:"image",src:Q,fit:"cover"})}catch{}finally{i(l)===Q&&W(l,null)}}function pe(Q){var Me;const oe=Q.currentTarget,ae=(Me=oe.files)==null?void 0:Me[0];if(!ae)return;const fe=new FileReader;fe.onload=()=>{const ye=fe.result;typeof ye=="string"&&n.setBackground({type:"image",src:ye,fit:"cover"})},fe.readAsDataURL(ae),oe.value=""}const de={Landscape:cr,Sky:na,Sea:eo,Forest:Za,Urban:Ta,Texture:xr,Abstract:Zt},ge={Solid:Qt,Soft:gr,Vivid:to,Sunset:qa,Cool:Ua,Dark:pr,Mono:ja},T=me(()=>n.selectedIds.length===1?n.getElement(n.selectedIds[0])??null:null),ue=me(()=>n.selectedIds.length);function N(Q,oe=!0){i(T)&&n.updateElement(i(T).id,Q,oe)}var E=kn(),j=v(f(E),2);{var K=Q=>{var oe=Uo(),ae=f(oe),fe=f(ae);u(ae);var Me=v(ae,2),ye=f(Me);Pe(ye,{label:"Align left",children:(ze,Be)=>{var Z=Lo(),Ee=f(Z);za(Ee,{size:14,strokeWidth:1.8}),u(Z),S("click",Z,()=>n.alignSelected("left")),p(ze,Z)},$$slots:{default:!0}});var He=v(ye,2);Pe(He,{label:"Center horizontally",children:(ze,Be)=>{var Z=Fo(),Ee=f(Z);xa(Ee,{size:14,strokeWidth:1.8}),u(Z),S("click",Z,()=>n.alignSelected("centerX")),p(ze,Z)},$$slots:{default:!0}});var Ke=v(He,2);Pe(Ke,{label:"Align right",children:(ze,Be)=>{var Z=jo(),Ee=f(Z);$a(Ee,{size:14,strokeWidth:1.8}),u(Z),S("click",Z,()=>n.alignSelected("right")),p(ze,Z)},$$slots:{default:!0}});var Re=v(Ke,2);Pe(Re,{label:"Align top",children:(ze,Be)=>{var Z=No(),Ee=f(Z);wa(Ee,{size:14,strokeWidth:1.8}),u(Z),S("click",Z,()=>n.alignSelected("top")),p(ze,Z)},$$slots:{default:!0}});var Ve=v(Re,2);Pe(Ve,{label:"Center vertically",children:(ze,Be)=>{var Z=Ro(),Ee=f(Z);ba(Ee,{size:14,strokeWidth:1.8}),u(Z),S("click",Z,()=>n.alignSelected("centerY")),p(ze,Z)},$$slots:{default:!0}});var Je=v(Ve,2);Pe(Je,{label:"Align bottom",children:(ze,Be)=>{var Z=Bo(),Ee=f(Z);ya(Ee,{size:14,strokeWidth:1.8}),u(Z),S("click",Z,()=>n.alignSelected("bottom")),p(ze,Z)},$$slots:{default:!0}}),u(Me);var et=v(Me,2);{var Qe=ze=>{var Be=Ho(),Z=f(Be);Pe(Z,{label:"Distribute horizontally",children:(ce,x)=>{var g=Do(),I=f(g);ka(I,{size:14,strokeWidth:1.8}),rt(),u(g),S("click",g,()=>n.distributeSelected("h")),p(ce,g)},$$slots:{default:!0}});var Ee=v(Z,2);Pe(Ee,{label:"Distribute vertically",children:(ce,x)=>{var g=Wo(),I=f(g);_a(I,{size:14,strokeWidth:1.8}),rt(),u(g),S("click",g,()=>n.distributeSelected("v")),p(ce,g)},$$slots:{default:!0}}),u(Be),p(ze,Be)};xe(et,ze=>{i(ue)>=3&&ze(Qe)})}u(oe),te(()=>he(fe,`Align · ${i(ue)??""} selected`)),p(Q,oe)},je=Q=>{const oe=me(()=>(()=>{const ce=new Map;for(const x of Co){const g=ce.get(x.category)??[];g.push(x),ce.set(x.category,g)}return[...ce.entries()]})()),ae=me(()=>e().length>0),fe=me(()=>(()=>{if(!i(ae))return[];const ce=new Map;for(const x of e()){const g=ce.get(x.category)??[];g.push(x),ce.set(x.category,g)}return[...ce.entries()]})()),Me=me(()=>(()=>{const ce=new Map;for(const x of To){const g=ce.get(x.category)??[];g.push(x),ce.set(x.category,g)}return[...ce.entries()]})());var ye=en(),He=v(P(ye),2),Ke=v(f(He),2),Re=f(Ke);st(Re,{label:"W",suffix:"px",get value(){return n.project.canvasSize.width},onChange:ce=>{n.project.canvasSize={...n.project.canvasSize,width:ce},n.commit()}});var Ve=v(Re,2);st(Ve,{label:"H",suffix:"px",get value(){return n.project.canvasSize.height},onChange:ce=>{n.project.canvasSize={...n.project.canvasSize,height:ce},n.commit()}}),u(Ke),u(He);var Je=v(He,2),et=v(f(Je),2),Qe=f(et),ze=v(Qe,2);u(et);var Be=v(et,2);{var Z=ce=>{var x=Zo(),g=f(x),I=f(g);jt(I,z=>W(t,z),()=>i(t));var O=v(I,2),G=f(O);Qa(G,{size:13,strokeWidth:2}),rt(),u(O),u(g);var L=v(g,2);{var A=z=>{var ne=H(),Ae=P(ne);ot(Ae,17,()=>i(fe),([se,Ie])=>se,(se,Ie)=>{var Ce=me(()=>Yt(i(Ie),2));let Ne=()=>i(Ce)[0],Ze=()=>i(Ce)[1];const _e=me(()=>de[Ne()]??cr);var a=qo(),c=f(a),m=f(c);Dt(m,()=>i(_e),(y,k)=>{k(y,{size:11,strokeWidth:2})});var b=v(m,2),w=f(b,!0);u(b),u(c);var M=v(c,2);ot(M,21,Ze,y=>y.id,(y,k)=>{var d=Vo(),$=f(d),J=v($,2);{var re=ee=>{var Te=Oo(),Se=f(Te);lr(Se,{size:18,strokeWidth:2.2,class:"animate-spin"}),u(Te),p(ee,Te)};xe(J,ee=>{i(l)===i(k).url&&ee(re)})}u(d),te(()=>{d.disabled=i(l)!==null,at(d,"aria-label",i(k).id),at(d,"aria-busy",i(l)===i(k).url),at($,"src",i(k).thumbnailUrl)}),S("click",d,()=>C(i(k).url)),p(y,d)}),u(M),u(a),te(()=>he(w,Ne())),p(se,a)}),p(z,ne)},F=z=>{var ne=H(),Ae=P(ne);ot(Ae,17,()=>i(Me),([se,Ie])=>se,(se,Ie)=>{var Ce=me(()=>Yt(i(Ie),2));let Ne=()=>i(Ce)[0],Ze=()=>i(Ce)[1];const _e=me(()=>de[Ne()]);var a=Ko(),c=f(a),m=f(c);Dt(m,()=>i(_e),(y,k)=>{k(y,{size:11,strokeWidth:2})});var b=v(m,2),w=f(b,!0);u(b),u(c);var M=v(c,2);ot(M,21,Ze,y=>y.seed,(y,k)=>{const d=me(()=>Io(i(k).seed));Pe(y,{get label(){return i(k).seed},children:($,J)=>{var re=Xo(),ee=f(re),Te=v(ee,2);{var Se=ve=>{var R=Yo(),ke=f(R);lr(ke,{size:18,strokeWidth:2.2,class:"animate-spin"}),u(R),p(ve,R)};xe(Te,ve=>{i(l)===i(d)&&ve(Se)})}u(re),te(ve=>{re.disabled=i(l)!==null,at(re,"aria-label",i(k).seed),at(re,"aria-busy",i(l)===i(d)),at(ee,"src",ve)},[()=>Eo(i(k).seed)]),S("click",re,()=>C(i(d))),p($,re)},$$slots:{default:!0}})}),u(M),u(a),te(()=>he(w,Ne())),p(se,a)}),p(z,ne)};xe(L,z=>{i(ae)?z(A):z(F,-1)})}u(x),S("change",I,pe),S("click",O,()=>{var z;return(z=i(t))==null?void 0:z.click()}),p(ce,x)},Ee=ce=>{var x=Qo(),g=f(x),I=v(f(g),2);ft(I),u(g);var O=v(g,2);ot(O,17,()=>i(oe),([G,L])=>G,(G,L)=>{var A=me(()=>Yt(i(L),2));let F=()=>i(A)[0],z=()=>i(A)[1];const ne=me(()=>ge[F()]);var Ae=Jo(),se=f(Ae),Ie=f(se);Dt(Ie,()=>i(ne),(_e,a)=>{a(_e,{size:11,strokeWidth:2})});var Ce=v(Ie,2),Ne=f(Ce,!0);u(Ce),u(se);var Ze=v(se,2);ot(Ze,21,z,_e=>_e.id,(_e,a)=>{{let c=me(()=>i(a).id.split("-").slice(1).join(" "));Pe(_e,{get label(){return i(c)},children:(m,b)=>{var w=Go();let M;te(y=>{at(w,"aria-label",i(a).id),M=lt(w,"",M,y)},[()=>({background:Po(i(a).background)})]),S("click",w,()=>n.setBackground(i(a).background)),p(m,w)},$$slots:{default:!0}})}}),u(Ze),u(Ae),te(()=>he(Ne,F())),p(G,Ae)}),u(x),te(()=>ut(I,n.project.background.type==="color"?n.project.background.color:"#ffffff")),S("input",I,G=>n.setBackground({type:"color",color:G.currentTarget.value})),p(ce,x)};xe(Be,ce=>{i(h)==="images"?ce(Z):ce(Ee,-1)})}u(Je),te(()=>{Xe(Qe,1,`h-8 flex items-center justify-center gap-1.5 text-xs font-medium rounded-[6px] transition-colors ${i(h)==="images"?"bg-[var(--color-surface)] text-[var(--color-ink)]":"text-[var(--color-muted)] hover:text-[var(--color-ink)]"}`),at(Qe,"aria-pressed",i(h)==="images"),Xe(ze,1,`h-8 flex items-center justify-center gap-1.5 text-xs font-medium rounded-[6px] transition-colors ${i(h)==="colors"?"bg-[var(--color-surface)] text-[var(--color-ink)]":"text-[var(--color-muted)] hover:text-[var(--color-ink)]"}`),at(ze,"aria-pressed",i(h)==="colors")}),S("click",Qe,()=>W(h,"images")),S("click",ze,()=>W(h,"colors")),p(Q,ye)},$e=Q=>{var oe=$n(),ae=P(oe),fe=v(f(ae),2),Me=f(fe);st(Me,{label:"X",suffix:"px",get value(){return i(T).x},onChange:L=>N({x:L})});var ye=v(Me,2);st(ye,{label:"Y",suffix:"px",get value(){return i(T).y},onChange:L=>N({y:L})});var He=v(ye,2);st(He,{label:"W",suffix:"px",get value(){return i(T).width},onChange:L=>N({width:L})});var Ke=v(He,2);st(Ke,{label:"H",suffix:"px",get value(){return i(T).height},onChange:L=>N({height:L})});var Re=v(Ke,2);{let L=me(()=>i(T).rotation*180/Math.PI);st(Re,{label:"R",suffix:"°",get value(){return i(L)},onChange:A=>N({rotation:A*Math.PI/180})})}u(fe),u(ae);var Ve=v(ae,2);{var Je=L=>{const A=me(()=>i(T));var F=un(),z=v(f(F),2);Hr(z);var ne=v(z,2),Ae=f(ne),se=f(Ae);let Ie;var Ce=f(se,!0);u(se);var Ne=v(se,2),Ze=f(Ne,!0);u(Ne),u(Ae);var _e=v(Ae,2);{var a=R=>{var ke=an();ot(ke,21,()=>Ao,U=>U.label,(U,qe)=>{var vt=rn(),Ft=P(vt),Rt=f(Ft,!0);u(Ft);var Ot=v(Ft,2);ot(Ot,16,()=>i(qe).fonts,Ct=>Ct,(Ct,gt)=>{var bt=tn(),Tt=f(bt);let ie;var B=f(Tt,!0);u(Tt);var D=v(Tt,2),we=f(D,!0);u(D),u(bt),te(()=>{Xe(bt,1,`w-full flex items-center justify-between gap-2 text-left px-2 py-1.5 hover:bg-[var(--color-surface-2)] ${i(A).fontFamily===gt?"bg-[var(--color-surface-2)]":""}`),ie=lt(Tt,"",ie,{"font-family":gt}),he(B,i(A).text||gt),he(we,gt)}),S("click",bt,()=>{N({fontFamily:gt}),W(s,!1)}),p(Ct,bt)}),te(()=>he(Rt,i(qe).label)),p(U,vt)}),u(ke),p(R,ke)};xe(_e,R=>{i(s)&&R(a)})}u(ne);var c=v(ne,2),m=f(c);st(m,{label:"Sz",suffix:"px",get value(){return i(A).fontSize},onChange:R=>N({fontSize:R})});var b=v(m,2);st(b,{label:"Lh",get value(){return i(A).lineHeight},step:.05,onChange:R=>N({lineHeight:R})}),u(c);var w=v(c,2),M=f(w);ft(M),u(w);var y=v(w,2),k=f(y);Pe(k,{label:"Bold (Ctrl+B)",children:(R,ke)=>{var U=on(),qe=f(U);mr(qe,{size:13,strokeWidth:2.2}),u(U),te(()=>Xe(U,1,`w-full h-7 flex items-center justify-center rounded-[6px] ${i(A).isBold?"bg-[var(--color-surface)] text-[var(--color-accent)]":"text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]"}`)),S("click",U,()=>N({isBold:!i(A).isBold})),p(R,U)},$$slots:{default:!0}});var d=v(k,2);Pe(d,{label:"Italic (Ctrl+I)",children:(R,ke)=>{var U=nn(),qe=f(U);br(qe,{size:13,strokeWidth:2.2}),u(U),te(()=>Xe(U,1,`w-full h-7 flex items-center justify-center rounded-[6px] ${i(A).isItalic?"bg-[var(--color-surface)] text-[var(--color-accent)]":"text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]"}`)),S("click",U,()=>N({isItalic:!i(A).isItalic})),p(R,U)},$$slots:{default:!0}});var $=v(d,2);Pe($,{label:"Underline (Ctrl+U)",children:(R,ke)=>{var U=sn(),qe=f(U);Ga(qe,{size:13,strokeWidth:2.2}),u(U),te(()=>Xe(U,1,`w-full h-7 flex items-center justify-center rounded-[6px] ${i(A).isUnderline?"bg-[var(--color-surface)] text-[var(--color-accent)]":"text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]"}`)),S("click",U,()=>N({isUnderline:!i(A).isUnderline})),p(R,U)},$$slots:{default:!0}}),u(y);var J=v(y,2),re=f(J);Pe(re,{label:"Align left",children:(R,ke)=>{var U=ln(),qe=f(U);Ka(qe,{size:13,strokeWidth:2}),u(U),te(()=>Xe(U,1,`w-full h-7 flex items-center justify-center rounded-[6px] ${i(A).textAlignment==="left"?"bg-[var(--color-surface)] text-[var(--color-accent)]":"text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]"}`)),S("click",U,()=>N({textAlignment:"left"})),p(R,U)},$$slots:{default:!0}});var ee=v(re,2);Pe(ee,{label:"Align center",children:(R,ke)=>{var U=cn(),qe=f(U);Xa(qe,{size:13,strokeWidth:2}),u(U),te(()=>Xe(U,1,`w-full h-7 flex items-center justify-center rounded-[6px] ${i(A).textAlignment==="center"?"bg-[var(--color-surface)] text-[var(--color-accent)]":"text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]"}`)),S("click",U,()=>N({textAlignment:"center"})),p(R,U)},$$slots:{default:!0}});var Te=v(ee,2);Pe(Te,{label:"Align right",children:(R,ke)=>{var U=dn(),qe=f(U);Ya(qe,{size:13,strokeWidth:2}),u(U),te(()=>Xe(U,1,`w-full h-7 flex items-center justify-center rounded-[6px] ${i(A).textAlignment==="right"?"bg-[var(--color-surface)] text-[var(--color-accent)]":"text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]"}`)),S("click",U,()=>N({textAlignment:"right"})),p(R,U)},$$slots:{default:!0}}),u(J);var Se=v(J,2),ve=v(f(Se),2);ft(ve),u(Se),u(F),te(()=>{ut(z,i(A).text),Ie=lt(se,"",Ie,{"font-family":i(A).fontFamily}),he(Ce,i(A).text||i(A).fontFamily),he(Ze,i(A).fontFamily),ut(M,i(A).fontSize),ut(ve,i(A).color)}),S("input",z,R=>N({text:R.currentTarget.value})),S("click",Ae,()=>W(s,!i(s))),S("input",M,R=>N({fontSize:parseInt(R.currentTarget.value,10)},!1)),S("change",M,()=>n.commit()),S("input",ve,R=>N({color:R.currentTarget.value})),p(L,F)};xe(Ve,L=>{i(T).type==="text"&&L(Je)})}var et=v(Ve,2);{var Qe=L=>{const A=me(()=>i(T));var F=fn(),z=v(f(F),2),ne=v(f(z),2);ft(ne),u(z);var Ae=v(z,2),se=v(f(Ae),2);ft(se),u(Ae);var Ie=v(Ae,2),Ce=f(Ie);st(Ce,{label:"Sw",suffix:"px",get value(){return i(A).strokeWidth},onChange:_e=>N({strokeWidth:_e})});var Ne=v(Ce,2);{var Ze=_e=>{st(_e,{label:"Cr",suffix:"px",get value(){return i(A).cornerRadius},onChange:a=>N({cornerRadius:a})})};xe(Ne,_e=>{i(A).shapeType==="rectangle"&&_e(Ze)})}u(Ie),u(F),te(()=>{ut(ne,i(A).fillColor),ut(se,i(A).strokeColor??"#000000")}),S("input",ne,_e=>N({fillColor:_e.currentTarget.value})),S("input",se,_e=>N({strokeColor:_e.currentTarget.value})),p(L,F)};xe(et,L=>{i(T).type==="shape"&&L(Qe)})}var ze=v(et,2);{var Be=L=>{const A=me(()=>i(T));var F=H(),z=P(F);{var ne=Ae=>{var se=vn(),Ie=v(f(se),2),Ce=v(f(Ie),2);ft(Ce),u(Ie),u(se),te(()=>ut(Ce,i(A).color??"#111111")),S("input",Ce,Ne=>N({color:Ne.currentTarget.value})),p(Ae,se)};xe(z,Ae=>{(i(A).stickerType==="cursive"||i(A).stickerType==="custom")&&Ae(ne)})}p(L,F)};xe(ze,L=>{i(T).type==="sticker"&&L(Be)})}var Z=v(ze,2);{var Ee=L=>{const A=me(()=>i(T));var F=mn(),z=v(f(F),2),ne=f(z);Pe(ne,{label:"Flip horizontal",children:(k,d)=>{var $=hn(),J=f($);Oa(J,{size:13,strokeWidth:1.8}),rt(),u($),te(()=>Xe($,1,`w-full h-7 flex items-center justify-center gap-1.5 rounded-[6px] text-xs ${i(A).flipHorizontal?"bg-[var(--color-surface)] text-[var(--color-accent)]":"text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]"}`)),S("click",$,()=>N({flipHorizontal:!i(A).flipHorizontal})),p(k,$)},$$slots:{default:!0}});var Ae=v(ne,2);Pe(Ae,{label:"Flip vertical",children:(k,d)=>{var $=pn(),J=f($);Va(J,{size:13,strokeWidth:1.8}),rt(),u($),te(()=>Xe($,1,`w-full h-7 flex items-center justify-center gap-1.5 rounded-[6px] text-xs ${i(A).flipVertical?"bg-[var(--color-surface)] text-[var(--color-accent)]":"text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]"}`)),S("click",$,()=>N({flipVertical:!i(A).flipVertical})),p(k,$)},$$slots:{default:!0}}),u(z);var se=v(z,2),Ie=f(se),Ce=f(Ie);u(Ie);var Ne=v(Ie,2);ft(Ne),u(se);var Ze=v(se,2),_e=f(Ze),a=f(_e);u(_e);var c=v(_e,2);ft(c),u(Ze);var m=v(Ze,2),b=f(m),w=f(b);u(b);var M=v(b,2);ft(M),u(m);var y=v(m,2);st(y,{label:"Cr",suffix:"px",get value(){return i(A).cornerRadius},onChange:k=>N({cornerRadius:k})}),u(F),te((k,d,$)=>{he(Ce,`Brightness (${k??""})`),ut(Ne,i(A).brightness),he(a,`Contrast (${d??""})`),ut(c,i(A).contrast),he(w,`Saturation (${$??""})`),ut(M,i(A).saturation)},[()=>i(A).brightness.toFixed(2),()=>i(A).contrast.toFixed(2),()=>i(A).saturation.toFixed(2)]),S("input",Ne,k=>N({brightness:parseFloat(k.currentTarget.value)},!1)),S("change",Ne,()=>n.commit()),S("input",c,k=>N({contrast:parseFloat(k.currentTarget.value)},!1)),S("change",c,()=>n.commit()),S("input",M,k=>N({saturation:parseFloat(k.currentTarget.value)},!1)),S("change",M,()=>n.commit()),p(L,F)};xe(Z,L=>{i(T).type==="image"&&L(Ee)})}var ce=v(Z,2),x=v(f(ce),2),g=f(x);Pe(g,{label:"Bring forward",children:(L,A)=>{var F=gn(),z=f(F);Pa(z,{size:14,strokeWidth:2}),u(F),S("click",F,()=>n.bringForward(i(T).id)),p(L,F)},$$slots:{default:!0}});var I=v(g,2);Pe(I,{label:"Send backward",children:(L,A)=>{var F=bn(),z=f(F);Ea(z,{size:14,strokeWidth:2}),u(F),S("click",F,()=>n.sendBackward(i(T).id)),p(L,F)},$$slots:{default:!0}});var O=v(I,2);Pe(O,{label:"Bring to front",children:(L,A)=>{var F=xn(),z=f(F);Aa(z,{size:14,strokeWidth:2}),u(F),S("click",F,()=>n.bringToFront(i(T).id)),p(L,F)},$$slots:{default:!0}});var G=v(O,2);Pe(G,{label:"Send to back",children:(L,A)=>{var F=yn(),z=f(F);Sa(z,{size:14,strokeWidth:2}),u(F),S("click",F,()=>n.sendToBack(i(T).id)),p(L,F)},$$slots:{default:!0}}),u(x),u(ce),p(Q,oe)};xe(j,Q=>{i(ue)>=2?Q(K):i(T)?Q($e,-1):Q(je,1)})}u(E),p(o,E),Mt()}At(["click","change","input"]);const pt="abcdefghijklmnopqrstuvwxyz".split(""),mt="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),zt="0123456789".split(""),We=[...pt,...mt,...zt],wn=[{id:"occasions",nameAr:"مناسبات",nameEn:"Occasions",previewLetter:"A",previewFontSize:55,fonts:[{fontFamily:"morning",nameAr:"صباحيات",nameEn:"Morning",previewFontSize:75,letters:["A","B","C","D","E","F","G","H","I","J","K","L"]},{fontFamily:"jommah",nameAr:"الجمعة",nameEn:"Friday",previewFontSize:75,letters:["A","B","C","D","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V"]},{fontFamily:"monasabat",nameAr:"مناسبات",nameEn:"Occasions",letters:["P","T","Q","R","S","K","L",...pt.slice(0,25),"A","B","C","F","G","H","I","J","M","N","O"]},{fontFamily:"zifaf",nameAr:"زفاف",nameEn:"Wedding",previewFontSize:75,letters:["A","B","C","D","F","G","H","I"]},{fontFamily:"graduation",nameAr:"تخرج",nameEn:"Graduation",letters:[...pt,...mt.slice(0,12)]}]},{id:"eid",nameAr:"العيد",nameEn:"Eid",previewLetter:"A",previewFontSize:55,fonts:[{fontFamily:"eid1",nameAr:"العيد ١",nameEn:"Eid 1",previewFontSize:75,letters:We},{fontFamily:"eid2",nameAr:"العيد ٢",nameEn:"Eid 2",letters:We},{fontFamily:"eid3",nameAr:"العيد ٣",nameEn:"Eid 3",previewLetter:"c",letters:[...pt,...mt,"1","2","3","4"]}]},{id:"islamic",nameAr:"إسلامي",nameEn:"Islamic",previewLetter:"A",previewFontSize:55,fonts:[{fontFamily:"Allah1",nameAr:"لفظ الجلالة ١",nameEn:"Allah 1",letters:[..."abcdefghijklmnopqrstuvx".split(""),...zt]},{fontFamily:"Allah3",nameAr:"لفظ الجلالة ٣",nameEn:"Allah 3",letters:We},{fontFamily:"basmalah1",nameAr:"بسملة ١",nameEn:"Basmalah 1",previewFontSize:75,letters:We},{fontFamily:"basmalah2",nameAr:"بسملة ٢",nameEn:"Basmalah 2",letters:We},{fontFamily:"islamic",nameAr:"إسلامي",nameEn:"Islamic",letters:We},{fontFamily:"thikr",nameAr:"أذكار",nameEn:"Thikr",letters:We.slice(0,We.length-1)},{fontFamily:"masjed",nameAr:"مساجد",nameEn:"Mosque",letters:We},{fontFamily:"aqsa",nameAr:"الأقصى",nameEn:"Al-Aqsa",previewLetter:"d",letters:"abcdefghijklmnopqrs".split("")},{fontFamily:"sadaqa",nameAr:"صدقة",nameEn:"Sadaqa",previewLetter:"x",letters:"abcdefghijklmnopqrstuvwx".split("")},{fontFamily:"rasool1",nameAr:"الرسول ١",nameEn:"Prophet 1",letters:We},{fontFamily:"rasool2",nameAr:"الرسول ٢",nameEn:"Prophet 2",letters:We}]},{id:"hajj",nameAr:"الحج",nameEn:"Hajj",previewLetter:"A",previewFontSize:55,fonts:[{fontFamily:"hajj1",nameAr:"الحج ١",nameEn:"Hajj 1",letters:We},{fontFamily:"hajj3",nameAr:"الحج ٣",nameEn:"Hajj 3",previewLetter:"d",letters:"abcdefghijklmnopqrstuvwx".split("")}]},{id:"family",nameAr:"العائلة",nameEn:"Family",previewLetter:"A",previewFontSize:55,fonts:[{fontFamily:"ommy1",nameAr:"أمي ١",nameEn:"Mom 1",previewLetter:"a",letters:[...pt,...zt.slice(1)]},{fontFamily:"ommy2",nameAr:"أمي ٢",nameEn:"Mom 2",previewLetter:"a",letters:["a","c","d","f","g","h","j","k","s","x","z"]}]},{id:"shapes",nameAr:"أشكال",nameEn:"Shapes",previewLetter:"A",previewFontSize:55,fonts:[{fontFamily:"butterfly1",nameAr:"فراشات",nameEn:"Butterflies",letters:[...pt,...mt,...zt.slice(1)]},{fontFamily:"flower1",nameAr:"زهور ١",nameEn:"Flowers 1",letters:["b","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","w","x","y","z","C","D","E","F","G","H","I","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","8","9"]},{fontFamily:"flower2",nameAr:"زهور ٢",nameEn:"Flowers 2",letters:[...pt,...mt,...zt.slice(1)]},{fontFamily:"heart1",nameAr:"قلوب ١",nameEn:"Hearts 1",letters:We},{fontFamily:"heart2",nameAr:"قلوب ٢",nameEn:"Hearts 2",letters:[...pt,...mt]},{fontFamily:"social1",nameAr:"اجتماعي ١",nameEn:"Social 1",letters:We}]},{id:"decorations",nameAr:"مخطوطات",nameEn:"Decorations",previewLetter:"A",previewFontSize:55,fonts:[{fontFamily:"decoration1",nameAr:"زخرفة ١",nameEn:"Decoration 1",letters:We},{fontFamily:"decoration2",nameAr:"زخرفة ٢",nameEn:"Decoration 2",letters:We},{fontFamily:"decoration3",nameAr:"زخرفة ٣",nameEn:"Decoration 3",letters:We},{fontFamily:"decoration4",nameAr:"زخرفة ٤",nameEn:"Decoration 4",letters:We},{fontFamily:"badge1",nameAr:"شارات ١",nameEn:"Badges 1",letters:We},{fontFamily:"badge2",nameAr:"شارات ٢",nameEn:"Badges 2",letters:We},{fontFamily:"harakat1",nameAr:"حركات ١",nameEn:"Diacritics 1",letters:[...pt,...mt,...zt.slice(1)]},{fontFamily:"harakat2",nameAr:"حركات ٢",nameEn:"Diacritics 2",letters:We}]},{id:"ramadan",nameAr:"رمضان",nameEn:"Ramadan",previewLetter:"A",previewFontSize:55,fonts:[{fontFamily:"ramadan1",nameAr:"رمضان ١",nameEn:"Ramadan 1",previewLetter:"C",letters:[...pt,...mt]},{fontFamily:"ramadan2",nameAr:"رمضان ٢",nameEn:"Ramadan 2",previewLetter:"a",letters:["a","b","c","d","e","f","g",...mt,...zt]},{fontFamily:"ramadan3",nameAr:"رمضان ٣",nameEn:"Ramadan 3",letters:We}]}];async function _r(o,r){if(!(typeof document>"u"||!document.fonts))try{await document.fonts.load(`64px "${o}"`,r)}catch{}}var _n=_('<button type="button" class="aspect-square rounded-[12px] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface)] hover:ring-2 hover:ring-[var(--color-accent)] transition-all flex flex-col items-center justify-center p-2 text-[var(--color-ink)]"><span class="leading-none"> </span> <span class="mt-1 text-[10px] text-[var(--color-muted)] truncate w-full text-center"> </span></button>'),zn=_('<section><div class="flex items-baseline justify-between mb-2"><h3 class="text-sm font-semibold text-[var(--color-accent)]"> </h3> <span class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]" style="font-family: var(--font-mono);"> </span></div> <div class="grid grid-cols-3 gap-2"></div></section>'),Sn=_('<div class="flex flex-col gap-6"></div>'),Mn=_('<button type="button" class="aspect-square rounded-[12px] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface)] hover:ring-2 hover:ring-[var(--color-accent)] transition-all flex items-center justify-center text-[var(--color-ink)]"><span class="leading-none"> </span></button>'),An=_('<div class="flex flex-col gap-3"><button type="button" class="self-start flex items-center gap-1 text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)]"><!> <!> كل المخطوطات</button> <div class="grid grid-cols-3 gap-2"></div></div>');function Cn(o,r){St(r,!0);let e=Le(null);function n(){W(e,null),r.onClose()}async function s(t){await _r(t.fontFamily,t.letters.join("")),W(e,t,!0)}function h(t){i(e)&&(r.onPick(i(e),t),n())}{let t=me(()=>i(e)?i(e).nameAr:"مخطوطات");Ht(o,{get open(){return r.open},onClose:n,get title(){return i(t)},children:(l,C)=>{var pe=H(),de=P(pe);{var ge=ue=>{var N=Sn();ot(N,21,()=>wn,E=>E.id,(E,j)=>{var K=zn(),je=f(K),$e=f(je),Q=f($e,!0);u($e);var oe=v($e,2),ae=f(oe,!0);u(oe),u(je);var fe=v(je,2);ot(fe,21,()=>i(j).fonts,Me=>Me.fontFamily,(Me,ye)=>{const He=me(()=>i(ye).previewLetter??i(j).previewLetter),Ke=me(()=>i(ye).previewFontSize??i(j).previewFontSize);var Re=_n(),Ve=f(Re),Je=f(Ve,!0);u(Ve);var et=v(Ve,2),Qe=f(et,!0);u(et),u(Re),te(()=>{at(Re,"title",`${i(ye).nameAr??""} · ${i(ye).nameEn??""}`),lt(Ve,`font-family: '${i(ye).fontFamily??""}', system-ui; font-size: ${i(Ke)??""}px;`),he(Je,i(He)),he(Qe,i(ye).nameAr)}),S("click",Re,()=>s(i(ye))),p(Me,Re)}),u(fe),u(K),te(()=>{he(Q,i(j).nameAr),he(ae,i(j).nameEn)}),p(E,K)}),u(N),p(ue,N)},T=ue=>{const N=me(()=>i(e));var E=An(),j=f(E),K=f(j);Jt(K,{size:14,class:"rtl:hidden"});var je=v(K,2);Ia(je,{size:14,class:"hidden rtl:inline"}),rt(),u(j);var $e=v(j,2);ot($e,20,()=>i(N).letters,Q=>Q,(Q,oe)=>{var ae=Mn(),fe=f(ae),Me=f(fe,!0);u(fe),u(ae),te(()=>{at(ae,"title",oe),lt(fe,`font-family: '${i(N).fontFamily??""}', system-ui; font-size: 64px;`),he(Me,oe)}),S("click",ae,()=>h(oe)),p(Q,ae)}),u($e),u(E),S("click",j,()=>W(e,null)),p(ue,E)};xe(de,ue=>{i(e)?ue(T,-1):ue(ge)})}p(l,pe)},$$slots:{default:!0}})}Mt()}At(["click"]);let Xt=[];function Tn(o){return!o||!(o instanceof HTMLElement)?!1:o.tagName==="INPUT"||o.tagName==="TEXTAREA"||o.isContentEditable}function En(o,r){function e(n){if(Tn(n.target))return;const s=n.metaKey||n.ctrlKey;if(s&&n.key.toLowerCase()==="z"&&!n.shiftKey){n.preventDefault(),o.undo();return}if(s&&n.shiftKey&&n.key.toLowerCase()==="z"){n.preventDefault(),o.redo();return}if(s&&n.key.toLowerCase()==="y"){n.preventDefault(),o.redo();return}if(s&&n.key.toLowerCase()==="a"){n.preventDefault(),o.selectAll();return}if(s&&n.key.toLowerCase()==="s"){n.preventDefault(),r.onSave();return}if(s&&n.key.toLowerCase()==="e"){n.preventDefault(),r.onExport();return}if(s&&n.key.toLowerCase()==="c"){Xt=o.selectedIds.map(l=>o.getElement(l)).filter(l=>!!l).map(l=>structuredClone(l));return}if(s&&n.key.toLowerCase()==="v"){if(Xt.length===0)return;n.preventDefault();for(const l of Xt){const C=structuredClone(l);C.id=crypto.randomUUID(),C.x+=30,C.y+=30,o.addElement(C)}return}if(s&&n.key.toLowerCase()==="d"){n.preventDefault(),o.duplicateElements(o.selectedIds);return}if(n.key==="Delete"||n.key==="Backspace"){o.selectedIds.length&&(n.preventDefault(),o.deleteElements([...o.selectedIds]));return}if(n.key==="Escape"){o.clearSelection();return}if(n.key==="]"){o.toggleInspector();return}if(n.key==="?"){r.onToggleShortcuts();return}if(n.key==="f"||n.key==="F"){o.fitToScreen();return}const t={v:"select",t:"text",s:"shape",i:"image",k:"sticker",b:"background"}[n.key.toLowerCase()];if(t&&!s){o.setTool(t);return}if(n.key==="ArrowLeft"||n.key==="ArrowRight"||n.key==="ArrowUp"||n.key==="ArrowDown"){if(!o.selectedIds.length)return;n.preventDefault();const l=n.shiftKey?10:1,C=n.key==="ArrowLeft"?-l:n.key==="ArrowRight"?l:0,pe=n.key==="ArrowUp"?-l:n.key==="ArrowDown"?l:0;o.moveBy(C,pe,!0)}}return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)}const In=3e4,Pn=2e3;function Ln(o){return{id:o.id,userId:o.userId,name:o.name,canvasSize:o.canvasSize,background:o.background,elements:o.elements,thumbnailUrl:o.thumbnailUrl??null,createdAt:ir.fromMillis(o.createdAt),updatedAt:ir.fromMillis(o.updatedAt)}}function Fn(o){let r=null,e=null,n=!1,s=JSON.stringify(o.editor.project);async function h(){const C=o.getExport();if(!C)return null;try{const pe=await C(.4,!1),de=o.editor.project.id,ge=da(ua,`thumbnails/${de}.png`);return await fa(ge,pe,"data_url"),await va(ge)}catch{return null}}async function t(){var T,ue,N;if(n)return;const C=o.editor.project;if(!o.editor.ui.isDirty||!Gt.currentUser)return;o.editor.setSaving(!0);const pe=C.id==="new",de=pe?crypto.randomUUID():C.id,ge=Gt.currentUser.uid;C.userId!==ge&&(C.userId=ge);try{const E=await h();E&&(C.thumbnailUrl=E);const j={...Ln(C),id:de,userId:ge};await sa(la(ca,"projects",de),j,{merge:!0}),pe&&(C.id=de,(T=o.onFirstCreate)==null||T.call(o,de)),o.editor.markSaved(),s=JSON.stringify(C),(ue=o.onSaved)==null||ue.call(o,C)}catch(E){((E==null?void 0:E.code)??"")==="permission-denied"?(console.error("autosave: permission denied — client Firebase auth not signed in",E),(N=o.onPermissionDenied)==null||N.call(o)):console.error("autosave failed",E)}finally{o.editor.setSaving(!1)}}r=setInterval(()=>{t()},In);const l=setInterval(()=>{const C=JSON.stringify(o.editor.project);C!==s&&(s=C,e&&clearTimeout(e),e=setTimeout(()=>{t()},Pn))},500);return{stop:()=>{n=!0,r&&clearInterval(r),e&&clearTimeout(e),clearInterval(l)},saveNow:t,setProjectId:C=>{o.editor.project.id=C}}}async function jn(o,r,e="betakti-design.png"){const n=await o(r.scale,r.withWatermark),s=document.createElement("a");return s.href=n,s.download=e,document.body.appendChild(s),s.click(),document.body.removeChild(s),n}async function Nn(o,r){var e;try{const n=await o(r.scale,r.withWatermark),h=await(await fetch(n)).blob(),t=globalThis.ClipboardItem;return!t||!((e=navigator.clipboard)!=null&&e.write)?!1:(await navigator.clipboard.write([new t({"image/png":h})]),!0)}catch{return!1}}function Rn(o,r,e){const n=o*e*r*e*4*.35;return n>1024*1024?`${(n/(1024*1024)).toFixed(1)} MB`:`${Math.round(n/1024)} KB`}var Bn=_('<button type="button"><span><!></span> <span class="truncate flex-1"> </span></button>'),Dn=_('<div class="text-xs text-[var(--color-muted)] px-2 py-2">No layers yet</div>'),Wn=_('<div class="flex flex-col h-full"><div class="px-4 py-3 flex items-center justify-between flex-none"><span class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]" style="font-family: var(--font-mono);">Pages</span> <button class="w-6 h-6 flex items-center justify-center rounded-[6px] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]" aria-label="Add page">+</button></div> <div class="px-2 flex flex-col gap-1 flex-none"><button class="flex items-center gap-3 p-2 rounded-[8px] bg-[var(--color-surface-2)] text-start" type="button"><div class="w-10 h-10 rounded-[6px] flex-none shadow-[var(--shadow-1)]"></div> <div class="min-w-0 flex-1"><div class="text-[13px] font-medium text-[var(--color-accent)] truncate"> </div> <div class="text-[10px] text-[var(--color-muted)]" style="font-family: var(--font-mono);"> </div></div></button> <button class="flex items-center justify-center gap-1.5 p-2 rounded-[8px] border border-dashed border-[var(--color-border-strong)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] text-xs mt-1" type="button">+ Add page</button></div> <div class="mt-5 px-4 py-3 flex items-center justify-between border-t border-[var(--color-border)] flex-none"><span class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]" style="font-family: var(--font-mono);">Layers</span></div> <div class="flex-1 overflow-y-auto px-2 pb-3 flex flex-col gap-0.5 min-h-0"></div></div>'),Hn=_('<a href="/auth/login" class="hidden md:flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase font-semibold px-2 py-1 rounded-[999px] hover:opacity-80 transition-opacity" style="font-family: var(--font-mono); background: color-mix(in srgb, var(--color-ink-2) 12%, transparent); color: var(--color-ink-2);"><span class="inline-block w-1.5 h-1.5 rounded-full bg-current"></span> <span>Login to autosave</span></a>'),Un=_('<span class="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span> <span>Saving…</span>',1),On=_('<span class="inline-block w-1.5 h-1.5 rounded-full bg-current"></span> <span>Unsaved</span>',1),Vn=_("<!> <span>Saved</span>",1),qn=_('<div class="hidden sm:flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase font-semibold px-2 py-1 rounded-[999px] flex-none"><!></div>'),Yn=_('<div class="on-soft flex items-center gap-3 px-4 py-2 text-sm border-b border-[var(--color-border)]" style="background: var(--brand-gradient-soft);"><span class="flex-1">قالب Pro — الترقية مطلوبة للتصدير بدون علامة مائية</span> <a href="/subscription" class="px-3 py-1 rounded-[8px] text-white text-xs font-semibold" style="background: var(--brand-gradient);">ترقية</a> <button type="button" class="text-[var(--color-muted)] hover:text-[var(--color-ink)] text-sm px-2" aria-label="Dismiss">×</button></div>'),Xn=_('<span class="w-px h-5 bg-[var(--color-border)] mx-0.5"></span>'),Kn=_("<!> <!> <!>",1),Zn=_('<aside class="hidden lg:flex w-[320px] border-s border-[var(--color-border)] bg-[var(--color-surface)] flex-col overflow-y-auto"><!></aside>'),Gn=_('<div class="text-[var(--color-warning)]">A watermark will be added (Free tier).</div>'),Jn=_('<div class="flex flex-col gap-4"><div><span class="text-xs text-[var(--color-muted)] block mb-2">Resolution</span> <!></div> <div class="text-xs text-[var(--color-muted)] space-y-1"><div> </div> <div> </div> <!></div> <button class="w-full py-2.5 rounded-[10px] text-white font-medium" style="background: var(--brand-gradient)">Download PNG</button> <button class="w-full py-2 rounded-[10px] border border-[var(--color-border)] text-sm hover:bg-[var(--color-surface-2)]">Copy to clipboard</button></div>'),Qn=_('<div class="flex items-center gap-2"><span class="font-mono text-xs px-2 py-0.5 rounded bg-[var(--color-surface-2)] border border-[var(--color-border)]"> </span> <span class="text-[var(--color-ink)]"> </span></div> <div class="text-[var(--color-muted)]"> </div>',1),ei=_('<div class="grid grid-cols-2 gap-x-6 gap-y-2 text-sm"></div>'),ti=_('<div class="flex flex-col h-dvh w-full bg-[var(--color-paper)] text-[var(--color-ink)]"><header class="h-14 border-b border-[var(--color-border)] flex items-center px-2 sm:px-4 gap-2 sm:gap-3 bg-[var(--color-surface)] flex-none" style="padding-top: env(safe-area-inset-top); height: calc(3.5rem + env(safe-area-inset-top));"><button type="button" class="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-[8px] hover:bg-[var(--color-surface-2)] flex-none" aria-label="Layers"><!></button> <a href="/home" class="hidden lg:flex items-center gap-1.5 px-1 hover:opacity-80 transition-opacity"><!> <span class="font-semibold text-[15px] hidden sm:inline" style="font-family: var(--font-display);">Betakti<span class="text-[var(--color-accent)]">.</span></span></a> <span class="text-[var(--color-muted)] hidden lg:inline"><!></span> <a href="/projects" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors hidden lg:inline"> </a> <span class="text-[var(--color-muted)] hidden lg:inline"><!></span> <input class="ui-name-input text-sm font-medium bg-transparent border border-transparent hover:bg-[var(--color-surface-2)] focus:bg-[var(--color-surface-2)] focus:border-[var(--color-accent)] rounded-[8px] px-2.5 py-1 outline-none w-0 flex-1 min-w-0 lg:w-auto lg:flex-none lg:min-w-[160px] lg:max-w-[220px] transition-colors"/> <!> <div class="hidden lg:block flex-1"></div> <div class="hidden lg:flex items-center"><!> <span class="w-px h-5 bg-[var(--color-border)] mx-1"></span></div> <div class="hidden md:flex items-center gap-0.5"><!> <!></div> <span class="hidden md:inline w-px h-5 bg-[var(--color-border)] mx-1"></span> <button class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-sm font-semibold text-white rounded-[8px] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-shadow flex-none" style="background: var(--brand-gradient)"><!> <span class="hidden sm:inline">Export</span></button> <button type="button" class="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-[8px] hover:bg-[var(--color-surface-2)] flex-none" aria-label="Properties"><!></button></header> <!> <div class="flex-1 flex min-h-0"><aside class="hidden lg:flex w-60 border-e border-[var(--color-border)] bg-[var(--color-surface)] flex-col"><!></aside> <main class="flex-1 relative min-w-0"><!> <input type="file" accept="image/*" class="hidden"/> <div class="editor-toolbar absolute top-2 sm:top-4 start-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[12px] shadow-[var(--shadow-2)] p-1 z-10 max-w-[calc(100vw-1rem)] overflow-x-auto scroll-rail"></div> <div class="absolute bottom-3 sm:bottom-4 start-1/2 -translate-x-1/2 flex items-center gap-2" style="padding-bottom: env(safe-area-inset-bottom);"><div class="flex items-center gap-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[12px] shadow-[var(--shadow-2)] px-1 py-1 text-sm"><button class="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-surface-2)] rounded-[8px] text-base" aria-label="Zoom out">−</button> <span class="px-2 text-xs w-14 text-center text-[var(--color-ink-2)] font-medium" style="font-family: var(--font-mono);"> </span> <button class="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-surface-2)] rounded-[8px] text-base" aria-label="Zoom in">+</button> <span class="w-px h-5 bg-[var(--color-border)] mx-1"></span> <button class="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-surface-2)] rounded-[8px] text-[var(--color-ink-2)]" aria-label="Fit to screen" title="Fit to screen (F)"><!></button></div> <div class="hidden sm:flex items-center gap-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[12px] shadow-[var(--shadow-2)] p-1"><button><!> Light</button> <button><!> Dark</button></div></div></main> <!></div> <!> <!></div> <!> <!> <!> <!>',1);function Ei(o,r){St(r,!0);const e=po(ho(r.data.project)),n=me(()=>r.data.isPro);let s=Le(!1);const h=me(()=>r.data.lockedPremium&&!i(s));let t=null,l=null,C=Le(!1),pe=Le(!1),de=Le(!1),ge=Le(!1),T=Le(1),ue=null,N=Le("light"),E=Le(!1),j=Le(!1);Kt(()=>{const ie=document.documentElement.getAttribute("data-theme");W(N,ie==="dark"?"dark":"light",!0)});function K(ie){W(N,ie,!0),document.documentElement.setAttribute("data-theme",ie);try{localStorage.setItem("theme",ie)}catch{}document.cookie=`theme=${ie}; path=/; max-age=${3600*24*365}; SameSite=Lax`}function je(){l==null||l.saveNow().then(()=>Pt.push("تم الحفظ","success"))}function $e(){W(pe,!0)}Kt(()=>{const ie=En(e,{onSave:je,onExport:$e,onToggleShortcuts:()=>W(de,!i(de))});ha().then(D=>{W(C,!!D)});const B=pa(Gt,D=>{W(C,!!D)});return l=Fn({editor:e,getExport:()=>t,onFirstCreate:D=>{Yr(`/editor/${D}`,{})}}),()=>{ie(),B(),l==null||l.stop()}}),Lr(()=>{l==null||l.stop()});async function Q(ie,B){await _r(ie.fontFamily,B);const D=e.addCentered(fr({stickerType:"cursive",content:B,fontFamily:ie.fontFamily,color:"#111111",width:240,height:240}));e.selectOnly(D.id),e.setTool("select")}function oe(ie){if(ie==="text"){const B=e.addCentered(mo());e.selectOnly(B.id),e.setTool("select")}else if(ie==="shape"){const B=e.addCentered(go());e.selectOnly(B.id),e.setTool("select")}else if(ie==="sticker"){const B=e.addCentered(fr());e.selectOnly(B.id),e.setTool("select")}else ie==="image"?ue==null||ue.click():(ie==="background"&&e.clearSelection(),e.setTool(ie))}function ae(ie){var Ye;const B=ie.currentTarget,D=(Ye=B.files)==null?void 0:Ye[0];if(!D)return;const we=new FileReader;we.onload=()=>{const Ge=we.result,Ue=new Image;Ue.onload=()=>{const Oe=Ue.width>800?800/Ue.width:1,nt=e.addCentered(bo({imageSrc:Ge,width:Ue.width*Oe,height:Ue.height*Oe}));e.selectOnly(nt.id),e.setTool("select")},Ue.src=Ge},we.readAsDataURL(D),B.value=""}async function fe(){if(!t)return;if(r.data.lockedPremium&&!i(n)){Pt.push("قالب Pro — يتطلّب الترقية للتصدير","error");return}const ie=!i(n);await jn(t,{scale:i(T),withWatermark:ie},`${e.project.name}.png`),Pt.push("تم التصدير","success"),W(pe,!1)}async function Me(){if(!t)return;const ie=await Nn(t,{scale:i(T),withWatermark:!i(n)});Pt.push(ie?"نُسخ إلى الحافظة":"تعذّر النسخ",ie?"success":"error")}const ye=[{keys:"Ctrl+Z",ar:"تراجع",en:"Undo"},{keys:"Ctrl+Shift+Z",ar:"إعادة",en:"Redo"},{keys:"Ctrl+C / V",ar:"نسخ / لصق",en:"Copy / Paste"},{keys:"Ctrl+D",ar:"تكرار",en:"Duplicate"},{keys:"Delete",ar:"حذف",en:"Delete"},{keys:"Arrows",ar:"تحريك 1 بكسل",en:"Nudge 1px"},{keys:"Shift+Arrows",ar:"تحريك 10 بكسل",en:"Nudge 10px"},{keys:"Ctrl+A",ar:"تحديد الكل",en:"Select all"},{keys:"Ctrl+S",ar:"حفظ",en:"Save"},{keys:"Ctrl+E",ar:"تصدير",en:"Export"},{keys:"T / S / I / K / B",ar:"أدوات",en:"Tools"},{keys:"F",ar:"ملاءمة",en:"Fit"},{keys:"]",ar:"إخفاء اللوحة",en:"Toggle inspector"},{keys:"Space+Drag",ar:"تحريك المشهد",en:"Pan canvas"},{keys:"?",ar:"الاختصارات",en:"Shortcuts"}],He=[{id:"select",Icon:Ba,label:"Select",key:"V"},{id:"text",Icon:nr,label:"Text",key:"T"},{id:"shape",Icon:Qt,label:"Shape",key:"S"},{id:"image",Icon:sr,label:"Image",key:"I"},{id:"sticker",Icon:Zt,label:"Sticker",key:"K"},{id:"background",Icon:ia,label:"Background",key:"B"}];var Ke=ti();Vr("1wflx0k",ie=>{Ur(()=>{Or.title=`${e.project.name??""} · Betakti`})});var Re=P(Ke);{const ie=B=>{var D=Wn(),we=v(f(D),2),Ye=f(we),Ge=f(Ye);let Ue;var De=v(Ge,2),Oe=f(De),nt=f(Oe,!0);u(Oe);var tt=v(Oe,2),ct=f(tt);u(tt),u(De),u(Ye),rt(2),u(we);var ht=v(we,4);ot(ht,21,()=>e.project.elements,dt=>dt.id,(dt,Fe)=>{const kt=me(()=>e.selectedIds.includes(i(Fe).id));var wt=Bn(),Et=f(wt),Vt=f(Et);{var zr=it=>{nr(it,{size:12,strokeWidth:2})},Sr=it=>{var rr=H(),Tr=P(rr);{var Er=It=>{La(It,{size:12,strokeWidth:2})},Ir=It=>{Qt(It,{size:12,strokeWidth:2})};xe(Tr,It=>{i(Fe).shapeType==="circle"?It(Er):It(Ir,-1)})}p(it,rr)},Mr=it=>{sr(it,{size:12,strokeWidth:2})},Ar=it=>{Zt(it,{size:12,strokeWidth:2})};xe(Vt,it=>{i(Fe).type==="text"?it(zr):i(Fe).type==="shape"?it(Sr,1):i(Fe).type==="image"?it(Mr,2):it(Ar,-1)})}u(Et);var tr=v(Et,2),Cr=f(tr,!0);u(tr),u(wt),te(()=>{Xe(wt,1,`flex items-center gap-2 px-2 py-1.5 rounded-[6px] text-xs text-start hover:bg-[var(--color-surface-2)] ${i(kt)?"bg-[var(--color-surface-2)] text-[var(--color-accent)]":"text-[var(--color-ink-2)]"}`),Xe(Et,1,`w-5 h-5 rounded-[5px] flex-none flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] ${i(kt)?"text-[var(--color-accent)]":"text-[var(--color-muted)]"}`),he(Cr,i(Fe).type==="text"?"text"in i(Fe)?i(Fe).text:"Text":i(Fe).type==="shape"?i(Fe).shapeType??"Shape":i(Fe).type==="image"?"Image":"Sticker")}),S("click",wt,()=>{e.selectOnly(i(Fe).id),W(E,!1)}),p(dt,wt)},dt=>{var Fe=Dn();p(dt,Fe)}),u(ht),u(D),te(()=>{Ue=lt(Ge,"",Ue,{background:e.project.background.type==="color"?e.project.background.color:"var(--brand-gradient)"}),he(nt,e.project.name),he(ct,`${e.project.canvasSize.width??""} × ${e.project.canvasSize.height??""}`)}),p(B,D)};var Ve=f(Re),Je=f(Ve),et=f(Je);xr(et,{size:18,strokeWidth:1.8}),u(Je);var Qe=v(Je,2),ze=f(Qe);Kr(ze,{size:22}),rt(2),u(Qe);var Be=v(Qe,2),Z=f(Be);Jt(Z,{size:14}),u(Be);var Ee=v(Be,2),ce=f(Ee,!0);u(Ee);var x=v(Ee,2),g=f(x);Jt(g,{size:14}),u(x);var I=v(x,2);ft(I);var O=v(I,2);{var G=B=>{var D=Hn();p(B,D)},L=B=>{var D=qn(),we=f(D);{var Ye=De=>{var Oe=Un();rt(2),p(De,Oe)},Ge=De=>{var Oe=On();rt(2),p(De,Oe)},Ue=De=>{var Oe=Vn(),nt=P(Oe);Fa(nt,{size:12,strokeWidth:2.2}),rt(2),p(De,Oe)};xe(we,De=>{e.ui.isSaving?De(Ye):e.ui.isDirty?De(Ge,1):De(Ue,-1)})}u(D),te(()=>lt(D,`font-family: var(--font-mono); ${e.ui.isSaving?"background: color-mix(in srgb, var(--color-accent) 14%, transparent); color: var(--color-accent);":e.ui.isDirty?"background: color-mix(in srgb, var(--color-warning) 18%, transparent); color: var(--color-warning);":"background: color-mix(in srgb, var(--color-success) 18%, transparent); color: var(--color-success);"}`)),p(B,D)};xe(O,B=>{i(C)?B(L,-1):B(G)})}var A=v(O,4),F=f(A);Gr(F,{}),rt(2),u(A);var z=v(A,2),ne=f(z);Pe(ne,{label:"Undo",shortcut:"Ctrl+Z",children:(B,D)=>{{let we=me(()=>!e.canUndo());Bt(B,{label:"Undo",size:"sm",onclick:()=>e.undo(),get disabled(){return i(we)},children:(Ye,Ge)=>{Ja(Ye,{size:15,strokeWidth:1.75})},$$slots:{default:!0}})}},$$slots:{default:!0}});var Ae=v(ne,2);Pe(Ae,{label:"Redo",shortcut:"Ctrl+Shift+Z",children:(B,D)=>{{let we=me(()=>!e.canRedo());Bt(B,{label:"Redo",size:"sm",onclick:()=>e.redo(),get disabled(){return i(we)},children:(Ye,Ge)=>{Da(Ye,{size:15,strokeWidth:1.75})},$$slots:{default:!0}})}},$$slots:{default:!0}}),u(z);var se=v(z,4),Ie=f(se);Wa(Ie,{size:14,strokeWidth:2.2}),rt(2),u(se);var Ce=v(se,2),Ne=f(Ce);Ha(Ne,{size:18,strokeWidth:1.8}),u(Ce),u(Ve);var Ze=v(Ve,2);{var _e=B=>{var D=Yn(),we=v(f(D),4);u(D),S("click",we,()=>W(s,!0)),p(B,D)};xe(Ze,B=>{i(h)&&B(_e)})}var a=v(Ze,2),c=f(a),m=f(c);ie(m),u(c);var b=v(c,2),w=f(b);_o(w,{registerExport:B=>t=B});var M=v(w,2);jt(M,B=>ue=B,()=>ue);var y=v(M,2);ot(y,23,()=>He,B=>B.id,(B,D,we)=>{var Ye=Kn(),Ge=P(Ye);{var Ue=tt=>{var ct=Xn();p(tt,ct)};xe(Ge,tt=>{(i(we)===1||i(we)===4)&&tt(Ue)})}var De=v(Ge,2);Pe(De,{get label(){return i(D).label},get shortcut(){return i(D).key},children:(tt,ct)=>{{let ht=me(()=>e.ui.tool===i(D).id);Bt(tt,{get label(){return i(D).label},size:"sm",get active(){return i(ht)},onclick:()=>oe(i(D).id),children:(dt,Fe)=>{var kt=H(),wt=P(kt);Dt(wt,()=>i(D).Icon,(Et,Vt)=>{Vt(Et,{size:16,strokeWidth:1.8})}),p(dt,kt)},$$slots:{default:!0}})}},$$slots:{default:!0}});var Oe=v(De,2);{var nt=tt=>{Pe(tt,{label:"Cursive stickers",shortcut:"C",children:(ct,ht)=>{Bt(ct,{label:"Cursive stickers",size:"sm",get active(){return i(ge)},onclick:()=>W(ge,!0),children:(dt,Fe)=>{gr(dt,{size:16,strokeWidth:1.8})},$$slots:{default:!0}})},$$slots:{default:!0}})};xe(Oe,tt=>{i(D).id==="sticker"&&tt(nt)})}p(B,Ye)}),u(y);var k=v(y,2),d=f(k),$=f(d),J=v($,2),re=f(J);u(J);var ee=v(J,2),Te=v(ee,4),Se=f(Te);Ra(Se,{size:13,strokeWidth:2}),u(Te),u(d);var ve=v(d,2),R=f(ve),ke=f(R);Jr(ke,{size:13,strokeWidth:2}),rt(),u(R);var U=v(R,2),qe=f(U);pr(qe,{size:13,strokeWidth:2}),rt(),u(U),u(ve),u(k),u(b);var vt=v(b,2);{var Ft=B=>{var D=Zn(),we=f(D);hr(we,{get stockBackgrounds(){return r.data.stockBackgrounds}}),u(D),p(B,D)};xe(vt,B=>{e.ui.inspectorVisible&&B(Ft)})}u(a);var Rt=v(a,2);Ht(Rt,{get open(){return i(E)},onClose:()=>W(E,!1),side:"start",title:"Layers",bare:!0,children:(B,D)=>{ie(B)},$$slots:{default:!0}});var Ot=v(Rt,2);Ht(Ot,{get open(){return i(j)},onClose:()=>W(j,!1),side:"end",title:"Properties",bare:!0,children:(B,D)=>{hr(B,{get stockBackgrounds(){return r.data.stockBackgrounds}})},$$slots:{default:!0}}),u(Re),te((B,D)=>{at(Je,"aria-expanded",i(E)),he(ce,B),ut(I,e.project.name),at(Ce,"aria-expanded",i(j)),he(re,`${D??""}%`),Xe(R,1,`flex items-center gap-1.5 px-2.5 h-8 rounded-[8px] text-xs font-medium transition-colors ${i(N)==="light"?"bg-[var(--color-surface-2)] text-[var(--color-ink)]":"text-[var(--color-muted)] hover:text-[var(--color-ink)]"}`),at(R,"aria-pressed",i(N)==="light"),Xe(U,1,`flex items-center gap-1.5 px-2.5 h-8 rounded-[8px] text-xs font-medium transition-colors ${i(N)==="dark"?"bg-[var(--color-surface-2)] text-[var(--color-ink)]":"text-[var(--color-muted)] hover:text-[var(--color-ink)]"}`),at(U,"aria-pressed",i(N)==="dark")},[()=>Xr(),()=>Math.round(e.ui.zoom*100)]),S("click",Je,()=>W(E,!0)),S("change",I,B=>e.setName(B.currentTarget.value)),S("click",se,$e),S("click",Ce,()=>W(j,!0)),S("change",M,ae),S("click",$,()=>e.setZoom(e.ui.zoom/1.1)),S("click",ee,()=>e.setZoom(e.ui.zoom*1.1)),S("click",Te,()=>e.fitToScreen()),S("click",R,()=>K("light")),S("click",U,()=>K("dark"))}var Ct=v(Re,2);Ht(Ct,{get open(){return i(pe)},onClose:()=>W(pe,!1),title:"Export",children:(ie,B)=>{var D=Jn(),we=f(D),Ye=v(f(we),2);ea(Ye,{options:[{value:1,label:"1x"},{value:2,label:"2x"},{value:3,label:"3x"}],get value(){return i(T)},onChange:Fe=>{Fe===1||i(n)?W(T,Fe,!0):Pt.push("HD exports require Pro","error")}}),u(we);var Ge=v(we,2),Ue=f(Ge),De=f(Ue);u(Ue);var Oe=v(Ue,2),nt=f(Oe);u(Oe);var tt=v(Oe,2);{var ct=Fe=>{var kt=Gn();p(Fe,kt)};xe(tt,Fe=>{i(n)||Fe(ct)})}u(Ge);var ht=v(Ge,2),dt=v(ht,2);u(D),te(Fe=>{he(De,`Dimensions: ${e.project.canvasSize.width*i(T)} × ${e.project.canvasSize.height*i(T)}`),he(nt,`≈ ${Fe??""}`)},[()=>Rn(e.project.canvasSize.width,e.project.canvasSize.height,i(T))]),S("click",ht,fe),S("click",dt,Me),p(ie,D)},$$slots:{default:!0}});var gt=v(Ct,2);Qr(gt,{get open(){return i(de)},onClose:()=>W(de,!1),title:"Shortcuts · اختصارات",children:(ie,B)=>{var D=ei();ot(D,21,()=>ye,we=>we.keys,(we,Ye)=>{var Ge=Qn(),Ue=P(Ge),De=f(Ue),Oe=f(De,!0);u(De);var nt=v(De,2),tt=f(nt,!0);u(nt),u(Ue);var ct=v(Ue,2),ht=f(ct,!0);u(ct),te(()=>{he(Oe,i(Ye).keys),he(tt,i(Ye).en),he(ht,i(Ye).ar)}),p(we,Ge)}),u(D),p(ie,D)},$$slots:{default:!0}});var bt=v(gt,2);Cn(bt,{get open(){return i(ge)},onClose:()=>W(ge,!1),onPick:(ie,B)=>{Q(ie,B)}});var Tt=v(bt,2);fo(Tt,{}),p(o,Ke),Mt()}At(["click","change"]);export{Ei as component};
