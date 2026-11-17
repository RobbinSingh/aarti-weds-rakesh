/* ===================== AIPAN KIT ===================== */
const W = "#fbf3e4";
const dots = (pts,r=1.6,c=W)=>pts.map(([x,y])=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${c}"/>`).join('');
const A = {
  band(w=360,c=W){ // three-line Aipan border with dot row and diamonds
    let s=`<g fill="none" stroke="${c}" stroke-linecap="round" filter="url(#hand)"><path d="M0 3H${w}" stroke-width="1.6"/><path d="M0 7H${w}" stroke-width="1"/><path d="M0 22H${w}" stroke-width="1.6"/>`;
    for(let x=10;x<w;x+=20){ s+=`<path d="M${x} 10 l4 4.5 l-4 4.5 l-4 -4.5z" stroke-width="1"/>`; }
    s+=`</g><g filter="url(#hand)">`+dots(Array.from({length:Math.ceil(w/20)},(_,i)=>[i*20,14.5]),1.5,c)+`</g>`;
    return {vb:`0 0 ${w} 26`, s, par:'none'};
  },
  drip(w=360,c=W){ // vasudhara: vertical lines falling from the threshold, each ending in a dot
    let s=`<g stroke="${c}" stroke-linecap="round" filter="url(#hand)">`, d=[];
    for(let x=6,i=0;x<w;x+=8,i++){ const L= 34 + ((i%5)*7) + (i%2?6:0); s+=`<path d="M${x} 0V${L}" stroke-width="1.4"/>`; d.push([x,L+4.5]); }
    s+=`</g><g filter="url(#hand)">${dots(d,2,c)}</g>`;
    return {vb:`0 0 ${w} 70`, s, par:'none'};
  },
  chowki(c=W){ // Lakshmi/Saraswati chowki style mandala
    let s=`<g fill="none" stroke="${c}" stroke-linecap="round" stroke-linejoin="round" filter="url(#hand)">`;
    s+=`<circle r="96" stroke-width="1.8"/><circle r="90" stroke-width="1"/><circle r="70" stroke-width="1.6"/><circle r="66" stroke-width="1"/>`;
    for(let i=0;i<16;i++){ const a=i*22.5; s+=`<g transform="rotate(${a})"><path d="M0 -70 C10 -76 12 -84 0 -89 C-12 -84 -10 -76 0 -70Z" stroke-width="1.3"/><path d="M0 -73 V-85" stroke-width=".9"/></g>`; }
    for(let i=0;i<8;i++){ const a=i*45; s+=`<g transform="rotate(${a})"><path d="M0 -36 C14 -44 16 -58 0 -64 C-16 -58 -14 -44 0 -36Z" stroke-width="1.4"/><path d="M0 -40 C6 -46 6 -54 0 -58 C-6 -54 -6 -46 0 -40Z" stroke-width="1"/></g>`; }
    s+=`<rect x="-24" y="-24" width="48" height="48" stroke-width="1.4"/><rect x="-24" y="-24" width="48" height="48" transform="rotate(45)" stroke-width="1.4"/><circle r="15" stroke-width="1.3"/>`;
    s+=`<path d="M0 -10V10M-10 0H10M0 -10H7M0 10H-7M-10 0V-7M10 0V7" stroke-width="1.6"/>`;
    s+=`</g><g filter="url(#hand)">`;
    const d=[]; for(let i=0;i<48;i++){const a=i/48*Math.PI*2; d.push([Math.cos(a)*93,Math.sin(a)*93]);}
    for(let i=0;i<32;i++){const a=i/32*Math.PI*2; d.push([Math.cos(a)*30.5,Math.sin(a)*30.5]);}
    [[4,-5],[-5,-4],[-4,5],[5,4]].forEach(p=>d.push(p));
    s+=dots(d,1.5,c)+`</g>`;
    return {vb:"-100 -100 200 200", s};
  },
  feet(c=W){ // a pair of Lakshmi footprints walking upward
    const foot=(x,y,flip)=>`<g transform="translate(${x} ${y}) scale(${flip?-1:1} 1)"><path d="M0 0 C6 0 8 8 7.5 15 C7 22 5 28 0 29 C-5 28 -6 22 -5.5 15 C-5 8 -6 0 0 0Z" fill="none" stroke="${c}" stroke-width="1.3"/>${dots([[-4,-3.5],[-1,-5],[2.2,-4.8],[5,-3.6],[7,-1.6]],1.25,c)}${dots([[0.5,7],[0.5,13],[0.5,19],[0.5,24]],1,c)}</g>`;
    return {vb:"0 0 30 70", s:`<g filter="url(#hand)">${foot(9,38,true)}${foot(21,8,false)}</g>`};
  },
  edge(c="#8f2b1a"){ return A.band(400,c); },
  archFrame(c=W){ // white double arch outline with dots, wraps the video windows
    const P=(i)=>`M${16+i} 360 V${120} A${104-i} ${104-i} 0 0 1 ${224-i} 120 V360 Z`;
    let s=`<g fill="none" stroke="${c}" stroke-linejoin="round" filter="url(#hand)"><path d="${P(0)}" stroke-width="1.8"/><path d="${P(9)}" stroke-width="1.1"/></g>`;
    const d=[]; for(let t=0;t<=1.0001;t+=1/26){const a=Math.PI+t*Math.PI; d.push([120+Math.cos(a)*99.5,120+Math.sin(a)*99.5]);}
    for(let y=128;y<=352;y+=12){d.push([20.5,y]);d.push([219.5,y]);}
    s+=`<g filter="url(#hand)">${dots(d,1.5,c)}</g>`;
    return {vb:"0 0 240 368", s, par:'none'};
  },
  heroFrame(){ // thin aipan frame over the hero film
    let s=`<g fill="none" stroke="${W}" stroke-opacity=".85" filter="url(#hand)"><path d="M10 10H330V730H10Z" stroke-width="1.2"/><path d="M16 16H324V724H16Z" stroke-width=".7"/></g>`;
    const d=[]; for(let x=24;x<=316;x+=12){d.push([x,13]);d.push([x,727]);} for(let y=24;y<=716;y+=12){d.push([13,y]);d.push([327,y]);}
    s+=`<g opacity=".85">${dots(d,1.1)}</g>`;
    return {vb:"0 0 340 740", s, par:'none'};
  }
};
function paint(el,art){ el.setAttribute('viewBox',art.vb); if(art.par) el.setAttribute('preserveAspectRatio',art.par=='none'?'none':art.par); el.innerHTML=art.s; }

/* ---------- carved Kumaoni likhai door leaf ---------- */
function leafSVG(side){
  const dark="#2a1409", mid="#4a2a17", lite="#8b5a33";
  const panel=(x,y,w,h,arch)=>{
    const p = arch ? `M${x} ${y+h} V${y+w/2} A${w/2} ${w/2} 0 0 1 ${x+w} ${y+w/2} V${y+h}Z` : `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
    return `<path d="${p}" fill="${mid}" stroke="${dark}" stroke-width="3"/><path d="${p}" fill="none" stroke="${lite}" stroke-width="1" transform="translate(1.2 1.2)" opacity=".7"/>`;
  };
  const rosette=(cx,cy,r)=>{ let s=`<g transform="translate(${cx} ${cy})">`;
    for(let i=0;i<8;i++) s+=`<path transform="rotate(${i*45})" d="M0 0 C${r*.35} ${-r*.3} ${r*.3} ${-r*.85} 0 ${-r} C${-r*.3} ${-r*.85} ${-r*.35} ${-r*.3} 0 0Z" fill="${mid}" stroke="${dark}" stroke-width="1.6"/>`;
    return s+`<circle r="${r*.28}" fill="${lite}" stroke="${dark}" stroke-width="1.5"/></g>`; };
  const vine=(x,y1,y2)=>{ let s=`<path d="M${x} ${y1} V${y2}" stroke="${dark}" stroke-width="2"/>`; for(let y=y1+10;y<y2;y+=18){ s+=`<path d="M${x} ${y} q8 -6 10 -14 M${x} ${y+9} q-8 -6 -10 -14" stroke="${dark}" stroke-width="1.6" fill="none"/>`;} return s; };
  const ringX = side==='l' ? 112 : 8;
  return `<svg viewBox="0 0 120 400" preserveAspectRatio="none">
   <defs><linearGradient id="wg${side}" x1="0" x2="1"><stop offset="0" stop-color="#5c3720"/><stop offset=".5" stop-color="#6b4127"/><stop offset="1" stop-color="#4d2d19"/></linearGradient>
   <radialGradient id="br${side}" cx=".35" cy=".3"><stop offset="0" stop-color="#ffe7a1"/><stop offset=".6" stop-color="#c9952f"/><stop offset="1" stop-color="#7a5413"/></radialGradient></defs>
   <rect width="120" height="400" fill="url(#wg${side})" filter="url(#wood)"/>
   <rect x="3" y="3" width="114" height="394" fill="none" stroke="${dark}" stroke-width="4"/>
   <rect x="9" y="9" width="102" height="382" fill="none" stroke="${lite}" stroke-width="1" opacity=".5"/>
   ${vine(15,16,384)}${vine(105,16,384)}
   ${panel(26,22,68,118,true)}${rosette(60,92,26)}
   ${panel(26,152,68,96,false)}${rosette(60,200,20)}
   <path d="M38 170 L60 160 L82 170 M38 230 L60 240 L82 230" stroke="${dark}" stroke-width="1.6" fill="none"/>
   ${panel(26,260,68,120,false)}${rosette(60,320,24)}
   <circle cx="${ringX}" cy="205" r="5" fill="url(#br${side})" stroke="#4a3208"/>
   <circle cx="${ringX}" cy="219" r="11" fill="none" stroke="url(#br${side})" stroke-width="3.2"/>
   ${[60,130,280,350].map(y=>`<circle cx="${side==='l'?114:6}" cy="${y}" r="2.6" fill="url(#br${side})"/>`).join('')}
  </svg>`;
}

/* ---------- gate wall art: door frame, lintel, vasudhara, threshold aipan, feet ---------- */
function wallArt(){
  const fr="#3b1f10";
  // door opening: x 65..295, y 281..686 (matches .leaf/.beyond: left/right 18%, top 36%, bottom 12%)
  let s=`<rect width="360" height="780" fill="#8f2b1a"/>`;
  s+=`<rect x="53" y="268" width="254" height="424" fill="${fr}"/><rect x="59" y="274" width="242" height="414" fill="#5a3520" filter="url(#wood)"/>`;
  s+=`<path d="M44 274 H316 V250 H44Z" fill="#5a3520" stroke="${fr}" stroke-width="3" filter="url(#wood)"/>`;
  for(let x=60;x<=296;x+=16) s+=`<path d="M${x} 274 v9 a4 4 0 0 0 8 0 v-9" fill="#4a2a17" stroke="${fr}" stroke-width="1.4"/>`;
  s+=`<path d="M146 250 Q180 214 214 250Z" fill="#5a3520" stroke="${fr}" stroke-width="3"/><circle cx="180" cy="239" r="7" fill="#c9952f" stroke="${fr}" stroke-width="1.5"/>`;
  s+=`<g fill="none" stroke="${W}" stroke-linecap="round" filter="url(#hand)"><path d="M38 692 V238 H322 V692" stroke-width="1.8"/><path d="M30 692 V230 H330 V692" stroke-width="1"/></g>`;
  const d=[]; for(let y=246;y<=686;y+=12){d.push([34,y]);d.push([326,y]);} for(let x=42;x<=318;x+=12) d.push([x,234]);
  s+=`<g filter="url(#hand)">${dots(d,1.6)}</g>`;
  s+=`<g transform="translate(0 190)">${A.band(360).s}</g>`;
  s+=`<g transform="translate(0 216) scale(1 .3)">${A.drip(360).s}</g>`;
  // threshold (dehli) with aipan
  s+=`<rect x="22" y="692" width="316" height="22" fill="#6d1f12"/><g transform="translate(22 690) scale(.878 1)">${A.band(360).s}</g>`;
  return s;
}
