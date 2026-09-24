# usage: python3 work/wordcheck.py epXX [ref]  — compare every lettered string in episodes/epXX.js with git ref (default HEAD).
# Lines split across balloons show as -/+ pairs; check them by eye. Anything else means wording changed.
import re, subprocess, sys, difflib
ep = sys.argv[1]; ref = sys.argv[2] if len(sys.argv) > 2 else 'HEAD'
old = subprocess.run(['git', 'show', f'{ref}:episodes/{ep}.js'], capture_output=True, text=True, check=True).stdout
new = open(f'episodes/{ep}.js').read()
pat = re.compile(r"\b(?:say|shout|whisper|inner|cold|cap|capC|dark|note|sfx|plain|title|hat|think|NAR|FT)\(\s*(?:'((?:[^'\\]|\\.)*)'\s*,\s*)?'((?:[^'\\]|\\.)*)'")
A = [' | '.join(x) for x in pat.findall(old)]; B = [' | '.join(x) for x in pat.findall(new)]
d = [l for l in difflib.unified_diff(A, B, lineterm='', n=0) if not l.startswith(('---', '+++', '@@'))]
# joined text check: same words in the same order even if split differently
ja = ' '.join(re.sub(r'\\n', ' ', x.split(' | ', 1)[-1]) for x in A).split(); jb = ' '.join(re.sub(r'\\n', ' ', x.split(' | ', 1)[-1]) for x in B).split()
print(ep, len(A), '->', len(B), 'strings;', 'SAME WORDS IN ORDER' if ja == jb else 'WORDS DIFFER')
if d: print('\n'.join(d))
