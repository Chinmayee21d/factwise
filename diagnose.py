f = r"e:\New Folder\Antigravity Tool\FactWise_website - Copy (2)\src\app\solutions\components\RfqAnalyticsAnimation.tsx"

with open(f, 'rb') as fh:
    raw = fh.read()

# Find "currencies" and show surrounding bytes
idx = raw.find(b'currencies')
chunk = raw[idx+10:idx+25]
print("Bytes after 'currencies':", chunk.hex(), repr(chunk))

# Try decoding as latin-1 then re-encoding
try:
    decoded_latin1 = chunk.decode('latin-1')
    print("As latin-1:", repr(decoded_latin1))
    re_encoded = decoded_latin1.encode('utf-8')
    print("Re-encoded:", re_encoded.hex())
    final = re_encoded.decode('utf-8')
    print("Final:", repr(final))
except Exception as e:
    print("Error:", e)
