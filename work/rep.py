# usage: python3 work/rep.py epXX <<'X' ... lines "OLD ||| NEW" ... X     (exact substring replace, asserts presence)
import sys
ep=sys.argv[1]; p=f'episodes/{ep}.js'; s=open(p).read()
n=0
for line in sys.stdin.read().split('\n'):
    if '|||' not in line: continue
    a,b=line.split('|||',1); a=a.strip(); b=b.strip()
    if a not in s: print('NOT FOUND:', a[:80]); continue
    s=s.replace(a,b,1); n+=1
open(p,'w').write(s); print(ep, n, 'replaced; dashes left:', s.count('—'))
