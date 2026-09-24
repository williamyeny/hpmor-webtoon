# usage: python3 work/unused.py epXX [epYY ...]  — imports and top-level consts/functions an episode never uses.
# Word-based, so a name that only appears inside a string or comment still counts as used; check by eye before deleting.
import re, sys
for ep in sys.argv[1:] or []:
    s = open(f'episodes/{ep}.js').read()
    code = re.sub(r'//[^\n]*', '', s).replace('...', ' ')
    names = []
    for m in re.finditer(r'^import\s+(?:\*\s+as\s+(\w+)|\{([^}]*)\}|(\w+))', s, re.M):
        if m.group(1): names.append(('import', m.group(1)))
        elif m.group(3): names.append(('import', m.group(3)))
        else: names += [('import', n.split(' as ')[-1].strip()) for n in m.group(2).split(',') if n.strip()]
    names += [('def', n) for n in re.findall(r'^(?:const|let|function)\s+([A-Za-z_$][\w$]*)', s, re.M)]
    dead = [f'{kind} {n}' for kind, n in names if len(re.findall(r'(?<![\w$.])' + re.escape(n) + r'(?![\w$])', code)) <= 1]
    print(f'{ep}: ' + (', '.join(dead) if dead else 'nothing unused'))
