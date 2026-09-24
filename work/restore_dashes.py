# usage: python3 work/restore_dashes.py epXX [--apply]
# Where a lettered line follows HPMOR word for word (a run of 5+ matching words) and the book has an em dash
# between two of those words (or an interrupting dash right after the line's last word), put the book's dash back.
# Lines we reworded don't match the book and are left alone. Dry run prints the changes; --apply writes them.
import re, sys, glob
ep = sys.argv[1]; apply = '--apply' in sys.argv
W = re.compile(r"[A-Za-z0-9]+(?:['’][A-Za-z]+)*")
def norm(w): return w.lower().replace('’', "'")
def clean_tex(t):
    t = re.sub(r'%.*', '', t)
    for _ in range(3): t = re.sub(r'\\[a-zA-Z]+\*?(?:\[[^\]]*\])?\{([^{}]*)\}', r'\1', t)
    t = re.sub(r'\\[a-zA-Z]+\*?', ' ', t)
    return t.replace('{', '').replace('}', '').replace('~', ' ').replace('``', '“').replace("''", '”')
src_words, src_gaps, src_orig = [], [], []  # src_gaps[i] = text between word i and word i+1
for f in sorted(glob.glob('hpmor/chapters/hpmor-chapter-*.tex')):
    t = clean_tex(open(f).read()); ms = list(W.finditer(t))
    for k, m in enumerate(ms):
        src_words.append(norm(m.group())); src_orig.append(m.group()); src_gaps.append(t[m.end(): ms[k + 1].start()] if k + 1 < len(ms) else '')
idx = {}
for i in range(len(src_words) - 2): idx.setdefault(tuple(src_words[i:i + 3]), []).append(i)
def fix_line(s):
    ms = list(W.finditer(s)); ws = [norm(m.group()) for m in ms]
    if len(ws) < 5: return s, []
    gap_src = {}  # our gap index k (between word k and k+1) -> source gap text, source index of word k+1
    trail = None
    for i in range(len(ws) - 2):
        for p in idx.get(tuple(ws[i:i + 3]), []):
            a = 0
            while i - a - 1 >= 0 and p - a - 1 >= 0 and ws[i - a - 1] == src_words[p - a - 1]: a += 1
            b = 2
            while i + b + 1 < len(ws) and p + b + 1 < len(src_words) and ws[i + b + 1] == src_words[p + b + 1]: b += 1
            if a + b + 1 < 5: continue
            for k in range(i - a, i + b):
                gap_src[k] = (src_gaps[p + (k - i)], p + (k - i) + 1)
            if i + b == len(ws) - 1: trail = src_gaps[p + b]
    out, changes, last = [], [], 0
    Q = '"\'“”‘’*'
    core = lambda g: ''.join(c for c in g if c not in Q and not c.isspace())
    for k in range(len(ms) - 1):
        g = s[ms[k].end(): ms[k + 1].start()]
        if k in gap_src and core(gap_src[k][0]) == '—' and core(g) != '—' and '\n' not in g and '\\n' not in g:
            # keep our own quote marks and *italics*: closing marks stay before the dash, opening marks after it
            sg = gap_src[k][0]
            if any(c in g + sg for c in '"\'“”‘’'):
                # quote marks around the dash: copy the book's arrangement, in straight quotes, keeping our *italics*
                qd = '"' if '"' in g else ("'" if "'" in g else None)  # our line's own quote style wins
                new = sg.replace('“', qd or '"').replace('”', qd or '"').replace('‘', qd or "'").replace('’', qd or "'")
                # our *italics* marks: those before the space close the previous word, those after it open the next
                parts = re.split(r'\s+', g); m0 = ''.join(c for c in parts[0] if c == '*'); m1 = ''.join(c for c in parts[-1] if c == '*') if len(parts) > 1 else ''
                new = m0 + new + m1
            else:
                # our *italics* marks: those before the space close the previous word, those after it open the next
                parts = re.split(r'\s+', g); m0 = ''.join(c for c in parts[0] if c == '*'); m1 = ''.join(c for c in parts[-1] if c == '*') if len(parts) > 1 else ''
                new = m0 + '—' + m1
            out.append(s[last: ms[k].end()] + new); last = ms[k + 1].start()
            changes.append((ms[k].group(), g, ms[k + 1].group()))
            nxt = ms[k + 1].group(); sw = src_orig[gap_src[k][1]].replace('’', "'")
            if nxt != sw and nxt.lower() == sw.lower():  # take the book's case ("x. Y" -> "x—y")
                out.append(sw); last = ms[k + 1].end()
    out.append(s[last:]); s2 = ''.join(out)
    # an interrupted line: the book breaks off with a dash right after our last word
    if trail is not None and trail.strip().startswith('—') and re.match(r'—\s*[”"’]', trail.strip()):
        m = re.search(r"([A-Za-z0-9])([*]*)([.…,!?;:]+)?([*]*)\s*$", s2)
        if m and m.group(3) and '—' not in m.group(3):
            s2 = s2[:m.start(3)] + '—' + s2[m.end(3):]; changes.append((ms[-1].group(), m.group(3), '(end)'))
    return s2, changes
text = open(f'episodes/{ep}.js').read()
# lettered string literals: the text argument of say/shout/... (the last string literal before the x coordinate)
lit = re.compile(r"\b(say|shout|whisper|inner|cold|cap|capC|dark|note|plain|hat|think|NAR|FT)\(\s*(?:'(?:[^'\\]|\\.)*'\s*,\s*)?'((?:[^'\\]|\\.)*)'")
res, total = [], 0
def repl(m):
    global total
    raw = m.group(2); s = raw.replace("\\'", "'")
    s2, ch = fix_line(s)
    if not ch: return m.group(0)
    total += len(ch); res.append((s, s2))
    return m.group(0)[:m.start(2) - m.start(0)] + s2.replace("'", "\\'") + m.group(0)[m.end(2) - m.start(0):]
new = lit.sub(repl, text)
for a, b in res: print('  -', a); print('  +', b)
print(ep, total, 'dashes restored' if apply else 'dashes to restore')
if apply and new != text: open(f'episodes/{ep}.js', 'w').write(new)
