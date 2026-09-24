# usage: python3 work/bump.py epXX "unique snippet" +200   → grows the tile containing the snippet
import sys,re
ep,snip,delta=sys.argv[1],sys.argv[2],int(sys.argv[3])
p=f'episodes/{ep}.js'; s=open(p).read()
i=s.find(snip); assert i>=0, 'snippet not found: '+snip
starts=[m.start() for m in re.finditer(r'ep\.(panel|bleed|multi|beat)\(', s) if m.start()<i]
j=starts[-1]
m=re.compile(r'ep\.(panel|bleed|multi|beat)\((\d+)').match(s,j)
old=int(m.group(2)); new=old+delta
s=s[:m.start(2)]+str(new)+s[m.end(2):]
open(p,'w').write(s); print(ep, m.group(1), old,'->',new)
