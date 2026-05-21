import re

f = r"e:\New Folder\Antigravity Tool\FactWise_website - Copy (2)\src\app\solutions\components\RfqAnalyticsAnimation.tsx"

with open(f, 'r', encoding='utf-8') as fh:
    c = fh.read()

replacements = [
    ("V\u00c2\u00b7", "V\u00b7"),
    ("\u00c2\u00b7", "\u00b7"),
    ("\u00e2\u0080\u0093", "\u2013"),
    ("\u00e2\u0080\u0094", "\u2014"),
    ("\u00e2\u0086\u0092", "\u2192"),
    ("\u00e2\u009c\u0093", "\u2713"),
    ("\u00e2\u009c\u00a6", "\u2726"),
    ("\u00e2\u0082\u00b9", "\u20b9"),
]

for old, new in replacements:
    c = c.replace(old, new)

with open(f, 'w', encoding='utf-8') as fh:
    fh.write(c)

print("Done")
