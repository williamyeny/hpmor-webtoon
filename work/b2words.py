# usage: python3 work/b2words.py epXX  — rebuild my pre-relayout draft of an episode from the session log
# (last Write + later Edits by the main session) and compare every lettering string with the current file.
import json, re, sys, glob
ep = sys.argv[1]; target = f'/Users/League/hpmor-webtoon/episodes/{ep}.js'
log = '/Users/League/.claude/projects/-Users-League-hpmor-webtoon/a734362a-0416-46f7-9ff6-65038d969df5.jsonl'
s = None
for ln in open(log):
    try: m = json.loads(ln)
    except: continue
    if m.get('isSidechain'): continue
    for c in (m.get('message') or {}).get('content') or []:
        if not isinstance(c, dict) or c.get('type') != 'tool_use': continue
        i = c.get('input', {})
        if i.get('file_path') != target: continue
        if c['name'] == 'Write': s = i['content']
        elif c['name'] == 'Edit' and s is not None:
            if i['old_string'] in s: s = s.replace(i['old_string'], i['new_string'], 0 if not i.get('replace_all') else -1) if False else (s.replace(i['old_string'], i['new_string']) if i.get('replace_all') else s.replace(i['old_string'], i['new_string'], 1))
            else: print('edit not applicable:', i['old_string'][:60])
if s is None: sys.exit('no Write found')
pat = re.compile(r"\b(say|shout|whisper|inner|cold|cap|capC|dark|note|sfx|plain|title|hat)\(\s*(?:'((?:[^'\\]|\\.)*)'\s*,\s*)?'((?:[^'\\]|\\.)*)'")
def lines(t): return [(a, b, c) for a, b, c in pat.findall(t)]
A, B = lines(s), lines(open(target).read())
sa, sb = [x[1:] for x in A], [x[1:] for x in B]
import difflib
d = [l for l in difflib.unified_diff([' | '.join(x) for x in sa], [' | '.join(x) for x in sb], lineterm='', n=0) if not l.startswith(('---', '+++', '@@'))]
print(ep, 'draft lines', len(sa), 'now', len(sb)); print('\n'.join(d) if d else 'IDENTICAL order+text')
