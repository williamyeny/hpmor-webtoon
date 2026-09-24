# usage: python3 work/unwrap_md.py FILE.md [...]  — undo hard wrapping: each paragraph / list item on one line.
# Leaves headings, tables, code fences, blockquote starts, list starts, nested lists, footnotes, front matter alone.
import re, sys
BLOCK = re.compile(r'\s*([#|<]|[-*+] |\d+\. |```|\[\^|>|---\s*$|\*\*[^*]+\*\*\s*$)')
def unwrap(text):
    L = text.split('\n'); out = []; code = False; front = L and L[0].strip() == '---'
    for i, b in enumerate(L):
        if front:
            out.append(b)
            if i > 0 and b.strip() == '---': front = False
            continue
        if b.strip().startswith('```'): code = not code; out.append(b); continue
        a = out[-1] if out else ''
        joinable = (not code and b.strip() and a.strip() and not BLOCK.match(b)
                    and not re.match(r'\s*([#|<]|```|---\s*$)', a) and not a.endswith(('  ', '\\'))
                    and not (a.strip().startswith('**') and re.match(r'\s*\*\*[^*]+\*\*\s*$', a)))
        if joinable: out[-1] = a.rstrip() + ' ' + b.strip()
        else: out.append(b)
    return '\n'.join(out)
for f in sys.argv[1:]:
    s = open(f).read(); t = unwrap(s)
    same = re.sub(r'\s+', ' ', s) == re.sub(r'\s+', ' ', t)
    print(f'{f}: {s.count(chr(10))} -> {t.count(chr(10))} lines, text {"unchanged" if same else "CHANGED!"}')
    if same and t != s: open(f, 'w').write(t)
