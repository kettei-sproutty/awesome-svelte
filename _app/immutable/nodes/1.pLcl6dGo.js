import{a as _,t as h}from"../chunks/disclose-version.Bg1Py1au.js";import{G as $,I as i,D as x,J as k,K as f,L as d,M as w,N as y,n as a,O as D,P as E,Q as G,p as I,f as J,t as K,g as L,c as b,r as p,R as M}from"../chunks/runtime.DcozdgtE.js";import{s as l}from"../chunks/render.6DGg8_pc.js";import{s as N}from"../chunks/entry.arJsaOCJ.js";function O(){const s=x,e=s.l.u;e&&(e.b.length&&$(()=>{g(s),f(e.b)}),i(()=>{const r=k(()=>e.m.map(y));return()=>{for(const t of r)typeof t=="function"&&t()}}),e.a.length&&i(()=>{g(s),f(e.a)}))}function g(s){if(s.l.s)for(const e of s.l.s)d(e);w(s.s)}function P(s,e,r){if(s==null)return e(void 0),a;const t=s.subscribe(e,r);return t.unsubscribe?()=>t.unsubscribe():t}function Q(s,e,r){const t=r[e]??(r[e]={store:null,source:E(void 0),unsubscribe:a});if(t.store!==s)if(t.unsubscribe(),t.store=s??null,s==null)t.source.v=void 0,t.unsubscribe=a;else{var u=!0;t.unsubscribe=P(s,n=>{u?t.source.v=n:G(t.source,n)}),u=!1}return d(t.source)}function R(){const s={};return D(()=>{for(var e in s)s[e].unsubscribe()}),s}const S=()=>{const s=N;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},j={subscribe(s){return S().page.subscribe(s)}};var q=h("<h1> </h1> <p> </p>",1);function F(s,e){I(e,!1);const r=R(),t=()=>Q(j,"$page",r);O();var u=q(),n=J(u),m=b(n);p(n);var o=M(n,2),v=b(o);p(o),K(()=>{var c;l(m,t().status),l(v,(c=t().error)==null?void 0:c.message)}),_(s,u),L()}export{F as component};