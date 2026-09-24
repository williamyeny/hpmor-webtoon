# usage: python3 work/undash_history.py [--apply]
# Book One's em-dash pass sometimes reworded book-verbatim lines ("X—y" -> "X. And y"), so their dashes can't be
# restored by punctuation alone. Pair each lettered line before the pass (2ff839d^) with its version after (90fd714);
# where the old line followed the book word for word with the book's dash, put the old line back in the current file.
import re, subprocess, sys, difflib
APPLY = '--apply' in sys.argv
src = open('work/restore_dashes.py').read().split('\ntext = open(')[0]  # reuse the book index + fix_line, not the CLI part
sys.argv = ['x', 'ep01']; ns = {}; exec(src, ns)
fix_line = ns['fix_line']
lit = re.compile(r"\b(?:say|shout|whisper|inner|cold|cap|capC|dark|note|plain|hat|think|NAR|FT)\(\s*(?:'(?:[^'\\]|\\.)*'\s*,\s*)?'((?:[^'\\]|\\.)*)'")
show = lambda rev, ep: subprocess.run(['git', 'show', f'{rev}:episodes/{ep}.js'], capture_output=True, text=True).stdout
apply = APPLY
def book_dashes(s):
    """number of the line's own dashes that sit exactly where the book has one (in a 5+ word verbatim run)"""
    plain = s.replace('—', ' , ')  # take our dashes out, then ask the restorer where the book's dashes go
    s2, ch = fix_line(plain)
    return len(ch)
for n in range(1, 13):
    ep = f'ep{n:02d}'
    A = [m.group(1) for m in lit.finditer(show('2ff839d^', ep))]; B = [m.group(1) for m in lit.finditer(show('90fd714', ep))]
    cur = open(f'episodes/{ep}.js').read(); new = cur; done = manual = 0
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, A, B, autojunk=False).get_opcodes():
        if op != 'replace': continue
        for a in A[i1:i2]:
            if '—' not in a: continue
            b = max(B[j1:j2], key=lambda x: difflib.SequenceMatcher(None, a, x).ratio())
            if difflib.SequenceMatcher(None, a, b).ratio() < 0.5: continue
            a_s = a.replace("\\'", "'"); k = book_dashes(a_s)
            if not k: continue
            words_same = re.sub(r'[^a-z]', '', a.lower()) == re.sub(r'[^a-z]', '', b.lower())
            if words_same: continue  # punctuation-only change: work/restore_dashes.py handles these
            mixed = k < a.count('—')
            where = "'" + b + "'"
            if where in new and not mixed:
                print(f'{ep} RESTORE\n   now: {b}\n   was: {a}'); new = new.replace(where, "'" + a + "'", 1); done += 1
            else:
                print(f'{ep} MANUAL ({"line changed since" if where not in new else "has non-book dashes too"})\n   now: {b}\n   was: {a}'); manual += 1
    print(f'== {ep}: {done} lines to restore, {manual} to check by hand')
    if apply and new != cur: open(f'episodes/{ep}.js', 'w').write(new)
