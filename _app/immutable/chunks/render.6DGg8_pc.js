import{i as O,j as k,k as E,l as H,H as I,m as L,o as T,s as v,q as R,u as V,e as p,v as C,w as M,x as Y,y as q,z as B,A as P,B as $,a as j,p as z,h as b,C as W,g as F,D as G}from"./runtime.DcozdgtE.js";import{b as J}from"./disclose-version.Bg1Py1au.js";const K=new Set,A=new Set;function w(r){var N;var e=this,d=e.ownerDocument,c=r.type,i=((N=r.composedPath)==null?void 0:N.call(r))||[],t=i[0]||r.target,o=0,_=r.__root;if(_){var f=i.indexOf(_);if(f!==-1&&(e===document||e===window)){r.__root=e;return}var u=i.indexOf(e);if(u===-1)return;f<=u&&(o=f)}if(t=i[o]||r.target,t!==e){O(r,"currentTarget",{configurable:!0,get(){return t||d}});try{for(var h,s=[];t!==null;){var n=t.assignedSlot||t.parentNode||t.host||null;try{var a=t["__"+c];if(a!==void 0&&!t.disabled)if(k(a)){var[l,...g]=a;l.apply(t,[r,...g])}else a.call(t,r)}catch(m){h?s.push(m):h=m}if(r.cancelBubble||n===e||n===null)break;t=n}if(h){for(let m of s)queueMicrotask(()=>{throw m});throw h}}finally{r.__root=e,delete r.currentTarget}}}const Q=["touchstart","touchmove"];function U(r){return Q.includes(r)}function rr(r,e){e!==(r.__t??(r.__t=r.nodeValue))&&(r.__t=e,r.nodeValue=e==null?"":e+"")}function X(r,e){return D(r,e)}function er(r,e){E(),e.intro=e.intro??!1;const d=e.target,c=b,i=p;try{for(var t=H(d);t&&(t.nodeType!==8||t.data!==I);)t=L(t);if(!t)throw T;v(!0),R(t),V();const o=D(r,{...e,anchor:t});if(p===null||p.nodeType!==8||p.data!==C)throw M(),T;return v(!1),o}catch(o){if(o===T)return e.recover===!1&&Y(),E(),q(d),v(!1),X(r,e);throw o}finally{v(c),R(i)}}const y=new Map;function D(r,{target:e,anchor:d,props:c={},events:i,context:t,intro:o=!0}){E();var _=new Set,f=s=>{for(var n=0;n<s.length;n++){var a=s[n];if(!_.has(a)){_.add(a);var l=U(a);e.addEventListener(a,w,{passive:l});var g=y.get(a);g===void 0?(document.addEventListener(a,w,{passive:l}),y.set(a,1)):y.set(a,g+1)}}};f(B(K)),A.add(f);var u=void 0,h=P(()=>{var s=d??e.appendChild($());return j(()=>{if(t){z({});var n=G;n.c=t}i&&(c.$$events=i),b&&J(s,null),u=r(s,c)||{},b&&(W.nodes_end=p),t&&F()}),()=>{var l;for(var n of _){e.removeEventListener(n,w);var a=y.get(n);--a===0?(document.removeEventListener(n,w),y.delete(n)):y.set(n,a)}A.delete(f),S.delete(u),s!==d&&((l=s.parentNode)==null||l.removeChild(s))}});return S.set(u,h),u}let S=new WeakMap;function tr(r){const e=S.get(r);e&&e()}export{er as h,X as m,rr as s,tr as u};
