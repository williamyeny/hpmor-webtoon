
(function(){
  // progress model: localStorage 'hpmor-state' = {last:'ep03', eps:{ep01:{p:1,done:true}, ep03:{p:0.42,y:1234}}}
  var KEY='hpmor-state';
  function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch(e){return {};}}
  function save(s){try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}}
  var bar=document.querySelector('.bar'),last=0,ep=document.body.dataset.ep;
  if(ep){
    var st=load();st.eps=st.eps||{};
    var t=0;
    addEventListener('scroll',function(){var y=scrollY;if(bar){if(y>last&&y>80)bar.classList.add('hide');else bar.classList.remove('hide');}last=y;
      if(t)return;t=setTimeout(function(){t=0;var h=document.documentElement.scrollHeight-innerHeight,p=h>0?Math.min(1,y/h):0;
        var e=st.eps[ep]||{};e.y=y;e.p=Math.max(e.p||0,p);if(p>0.97)e.done=true;st.eps[ep]=e;st.last=ep;save(st);},250);
    },{passive:true});
    if(location.hash==='#continue'){var e0=st.eps[ep];if(e0&&e0.y&&!e0.done)addEventListener('load',function(){scrollTo(0,e0.y)});}
    var end=document.querySelector('.end');
    if(end&&'IntersectionObserver' in window)new IntersectionObserver(function(en){if(en[0].isIntersecting){var e=st.eps[ep]||{};e.done=true;e.p=1;st.eps[ep]=e;save(st);}}).observe(end);
  }
  var list=document.querySelectorAll('ol.eps li[data-id]');
  if(list.length){
    var s2=load(),E=s2.eps||{},cur=null;
    // "currently reading" = the last episode opened, if unfinished; otherwise the first unread after it
    if(s2.last&&E[s2.last]&&!E[s2.last].done)cur=s2.last;
    list.forEach(function(li){var id=li.dataset.id,e=E[id];
      if(e&&e.done){li.classList.add('read');}
      else if(id===cur){li.classList.add('reading');var b=li.querySelector('.bar2');if(b){b.hidden=false;var pc=Math.max(4,Math.round((e.p||0)*100))+'%';b.querySelector('i').style.width=pc;b.querySelector('b').style.left=pc;}}
    });
    var btn=document.getElementById('continue');
    if(btn){var target=cur,label='Continue';
      if(!target){var ids=[].map.call(list,function(li){return li.dataset.id;});var anyRead=ids.some(function(i){return E[i]&&E[i].done;});
        target=ids.filter(function(i){return !(E[i]&&E[i].done);})[0];label=anyRead?'Next':'Begin reading';
        if(!target){target=ids[0];label='Read again';}}
      if(target){var li=document.querySelector('ol.eps li[data-id="'+target+'"]');var t=li?li.querySelector('.tt').textContent:'';
        btn.href=target+'/'+(label==='Continue'?'#continue':'');
        btn.querySelector('.lbl').textContent={'Continue':'Continue reading','Next':'Read next','Read again':'Read again'}[label]||'Begin reading';
        btn.querySelector('.ep').textContent='Episode '+Number(target.slice(2));
        btn.querySelector('.ttl').textContent=t;
        btn.setAttribute('aria-label',label+': Episode '+Number(target.slice(2))+', '+t);}
    }
  }
})();