f = r"e:\New Folder\Antigravity Tool\FactWise_website - Copy (2)\src\app\solutions\components\RfqAnalyticsAnimation.tsx"

with open(f, 'rb') as fh:
    raw = fh.read()

# Find the exact bytes around one of the bad sequences
idx = raw.find(b'\xe2\x80\x94')
if idx >= 0:
    print("Found em-dash bytes at", idx, ":", raw[idx-5:idx+10])
else:
    # Try to find what bytes are actually there
    # Search for the string "currencies" to find the narrative line
    idx2 = raw.find(b'currencies')
    if idx2 >= 0:
        print("Found 'currencies' at", idx2)
        print("Bytes around it:", raw[idx2-2:idx2+30])
        # Show hex
        chunk = raw[idx2+10:idx2+20]
        print("Hex:", chunk.hex())
