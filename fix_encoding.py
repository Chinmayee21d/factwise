f = r"e:\New Folder\Antigravity Tool\FactWise_website - Copy (2)\src\app\solutions\components\RfqAnalyticsAnimation.tsx"

with open(f, 'rb') as fh:
    raw = fh.read()

# The file has double-encoded UTF-8. 
# Fix: decode as UTF-8, then fix the mojibake by re-encoding as latin-1 and decoding as UTF-8
# But only for the affected sequences.

# The pattern: UTF-8 bytes of a character were treated as Latin-1 and re-encoded as UTF-8
# So to fix: decode the UTF-8 string, then for each "bad" sequence, 
# encode it as latin-1 and decode as UTF-8

c = raw.decode('utf-8')

# Fix double-encoded sequences
# Each bad char: encode to latin-1 bytes, then decode those bytes as UTF-8
def fix_mojibake(s):
    try:
        return s.encode('latin-1').decode('utf-8')
    except:
        return s

# Find and fix specific known bad sequences
bad_map = {
    '\u00e2\u20ac\u201c': '\u2014',  # â€" -> em dash
    '\u00e2\u20ac\u009d': '\u201d',  # â€ -> right double quote  
    '\u00e2\u20ac\u0099': '\u2019',  # â€™ -> right single quote
    '\u00e2\u20ac\u009c': '\u201c',  # â€œ -> left double quote
    '\u00e2\u0086\u0092': '\u2192',  # â†' -> right arrow (already fixed but check)
    '\u00e2\u009c\u0093': '\u2713',  # âœ" -> check mark
    '\u00e2\u009c\u00a6': '\u2726',  # âœ¦ -> star
    '\u00e2\u0082\u00b9': '\u20b9',  # â‚¹ -> rupee
    '\u00c2\u00b7': '\u00b7',        # Â· -> middle dot
}

for bad, good in bad_map.items():
    count = c.count(bad)
    if count:
        print(f"Fixing {count}x: {repr(bad)} -> {repr(good)}")
        c = c.replace(bad, good)

with open(f, 'w', encoding='utf-8') as fh:
    fh.write(c)

# Verify
bad_jsx = [l for l in c.split('\n') if '\u00e2' in l and not l.strip().startswith('//') and not l.strip().startswith('/*') and not l.strip().startswith('*')]
print(f"\nBad JSX lines remaining: {len(bad_jsx)}")
for l in bad_jsx:
    print(repr(l[:100]))
