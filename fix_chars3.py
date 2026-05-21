f = r"e:\New Folder\Antigravity Tool\FactWise_website - Copy (2)\src\app\solutions\components\RfqAnalyticsAnimation.tsx"

with open(f, 'r', encoding='utf-8') as fh:
    c = fh.read()

bad_sequences = [
    ('\u00e2\u0080\u0094', '\u2014'),  # em dash
    ('\u00e2\u0080\u0093', '\u2013'),  # en dash
    ('\u00e2\u0086\u0092', '\u2192'),  # right arrow
    ('\u00e2\u009c\u0093', '\u2713'),  # check mark
    ('\u00e2\u009c\u00a6', '\u2726'),  # star
    ('\u00e2\u0082\u00b9', '\u20b9'),  # rupee
    ('\u00e2\u20ac\u201c', '\u2014'),  # em dash variant
]
for bad, good in bad_sequences:
    c = c.replace(bad, good)

with open(f, 'w', encoding='utf-8') as fh:
    fh.write(c)

remaining = [l for l in c.split('\n') if '\u00e2' in l]
print(f"Remaining bad lines: {len(remaining)}")
for l in remaining[:5]:
    print(repr(l[:80]))
