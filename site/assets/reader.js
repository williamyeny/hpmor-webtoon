
(function(){
  var bar=document.querySelector('.bar'),last=0,ep=document.body.dataset.ep;
  addEventListener('scroll',function(){var y=scrollY;if(bar){if(y>last&&y>80)bar.classList.add('hide');else bar.classList.remove('hide');}last=y;
    if(ep){try{var h=document.documentElement.scrollHeight-innerHeight;localStorage.setItem('hpmor-progress',JSON.stringify({ep:ep,y:y,p:h>0?y/h:0,t:Date.now()}));}catch(e){}}
  },{passive:true});
  if(ep){try{var s=JSON.parse(localStorage.getItem('hpmor-progress')||'null');if(s&&s.ep===ep&&location.hash==='#continue'){addEventListener('load',function(){scrollTo(0,s.y)});}}catch(e){}}
  var cont=document.getElementById('continue');
  if(cont){try{var s2=JSON.parse(localStorage.getItem('hpmor-progress')||'null');if(s2&&s2.ep){var a=document.querySelector('[data-id="'+s2.ep+'"]');if(a){cont.href=s2.ep+'/#continue';cont.textContent='Continue · Episode '+Number(s2.ep.slice(2));}}}catch(e){}}
})();