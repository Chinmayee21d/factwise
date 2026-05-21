f = r"e:\New Folder\Antigravity Tool\FactWise_website - Copy (2)\src\app\solutions\components\RfqAnalyticsAnimation.tsx"

with open(f, 'rb') as fh:
    raw = fh.read()

# These are the exact byte sequences that appear as mojibake
# Each is a UTF-8 encoded Latin-1 misread of a Unicode character
replacements = [
    (b'\xe2\x80\x94', '\u2014'.encode('utf-8')),  # em dash
    (b'\xe2\x80\x93', '\u2013'.encode('utf-8')),  # en dash
    (b'\xe2\x86\x92', '\u2192'.encode('utf-8')),  # right arrow
    (b'\xe2\x9c\x93', '\u2713'.encode('utf-8')),  # check mark
    (b'\xe2\x9c\xa6', '\u2726'.encode('utf-8')),  # star
    (b'\xe2\x82\xb9', '\u20b9'.encode('utf-8')),  # rupee sign
    (b'\xc2\xb7',     '\u00b7'.encode('utf-8')),  # middle dot (already correct but ensure)
]

for bad, good in replacements:
    raw = raw.replace(bad, good)

with open(f, 'wb') as fh:
    fh.write(raw)

# Verify
c = raw.decode('utf-8')
bad_lines = [l for l in c.split('\n') if '\u00e2' in l and not l.strip().startswith('//') and not l.strip().startswith('/*') and not l.strip().startswith('*')]
print(f"Bad non-comment lines remaining: {len(bad_lines)}")
for l in bad_lines:
    print(repr(l[:100]))
