// Shared SVG <defs>: the "worn storybook" look lives here.
// - wobble: hand-drawn tremor on every panel (lines and fills move together)
// - grain: fine paper tooth, multiplied over everything
// - mottle: low-frequency gouache unevenness
// - glow / blur helpers for light and depth of field
export function baseDefs() {
  return `
<filter id="wobble" x="-2%" y="-2%" width="104%" height="104%">
  <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="7" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<filter id="wobbleBig" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="11" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<filter id="grain" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="2" stitchTiles="stitch" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.11  0 0 0 0 0.07  0 0 0 -1.4 1.05"/>
</filter>
<filter id="mottle" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="4" seed="5" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.22  0 0 0 0 0.12  0 0 0 -2.2 1.25"/>
</filter>
<filter id="fibers" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.02 0.35" numOctaves="2" seed="9" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0 0.1  0 0 0 -3 1.6"/>
</filter>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="glowSm" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
<filter id="glowXs" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>
<filter id="blur1" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.5"/></filter>
<filter id="blur2" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="3.5"/></filter>
<filter id="blur3" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="7"/></filter>
<filter id="blur4" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="12"/></filter>
<filter id="silhouette"><feFlood flood-color="#150b08" result="f"/><feComposite in="f" in2="SourceAlpha" operator="in"/></filter>
<filter id="silhouetteRed"><feFlood flood-color="#3a0a0a" result="f"/><feComposite in="f" in2="SourceAlpha" operator="in"/></filter>
<filter id="desat"><feColorMatrix type="saturate" values="0.35"/></filter>
<filter id="desat2"><feColorMatrix type="saturate" values="0.1"/></filter>
<filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" seed="4" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<filter id="deckle" x="-3%" y="-3%" width="106%" height="106%">
  <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="12" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="6"/><feOffset dx="0" dy="5" result="b"/>
  <feFlood flood-color="#1a0e08" flood-opacity="0.35"/><feComposite in2="b" operator="in"/>
  <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
</filter>
<filter id="chroma" x="-5%" y="-5%" width="110%" height="110%">
  <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
  <feOffset in="r" dx="-5" dy="0" result="r2"/>
  <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="gb"/>
  <feOffset in="gb" dx="4" dy="1" result="gb2"/>
  <feBlend in="r2" in2="gb2" mode="screen"/>
</filter>`;
}
