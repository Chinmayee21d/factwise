f = r"e:\New Folder\Antigravity Tool\FactWise_website - Copy (2)\src\app\solutions\components\RfqAnalyticsAnimation.tsx"

with open(f, 'rb') as fh:
    raw = fh.read()

# Replace all mojibake byte sequences with correct UTF-8
replacements = [
    (b'\xe2\x80\x94', '\u2014'.encode()),  # em dash —
    (b'\xe2\x80\x93', '\u2013'.encode()),  # en dash –
    (b'\xe2\x86\x92', '\u2192'.encode()),  # right arrow →
    (b'\xe2\x9c\x93', '\u2713'.encode()),  # check ✓
    (b'\xe2\x9c\xa6', '\u2726'.encode()),  # star ✦
    (b'\xe2\x82\xb9', '\u20b9'.encode()),  # rupee ₹
    (b'\xc2\xb7',     b'\xc2\xb7'),        # middle dot (already correct UTF-8)
]

for bad, good in replacements:
    count = raw.count(bad)
    if count:
        print(f"Replacing {count}x {bad.hex()} -> {good.hex()}")
        raw = raw.replace(bad, good)

with open(f, 'wb') as fh:
    fh.write(raw)

print("Done. Verifying...")
c = raw.decode('utf-8')
bad_jsx = [l for l in c.split('\n') if '\u00e2' in l and not l.strip().startswith('//') and not l.strip().startswith('/*') and not l.strip().startswith('*')]
print(f"Bad JSX lines: {len(bad_jsx)}")
for l in bad_jsx:
    print(repr(l[:100]))
