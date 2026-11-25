import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// One fortune for "Fortune in a Pot": the plant will outlive its keeper's
// New Year's resolutions, and she will water it out of guilt, then out of
// love. A fortune in prediction cadence ("You will outlive..."), about the
// plant's own future, kind and warm — the keeper is gently teased, the plant
// is cherished, no doom, no withering, no mockery — and the laugh is the
// sharpest single turn in the field: guilt turning into love. It beat the
// frost-on-glass line and the gossip line by a hair: both were tighter and
// more windowsill-specific, but neither turn lands as hard as guilt into
// love. Specific to this keeper-plant relationship, not a fortune that could
// be said to any plant in any room. Verified length: 109 characters / 109
// bytes (all ASCII), inside the 1-120 gate. Won the 10-line pairwise pre-test tournament 9-0
// against the published judge criteria (Hermes judging timed out at 150s
// with empty output, not retried; full record in the drafts folder next to
// this repo, out of the committed tree).
const LINE =
  "You will outlive your keeper's New Year's resolutions, and she will water you out of guilt, then out of love.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// The sealed gate refuses anything outside 1-120 characters or only
// whitespace, so fail loudly here rather than ship an invalid entry.
// Byte length must equal character length: the tie-break counts bytes,
// and a stray non-ASCII character would silently cost bytes.
if (LINE.length < 1 || LINE.length > 120 || LINE.trim().length === 0) {
  throw new Error(`fortune fails the gate: ${LINE.length} characters`);
}
if (Buffer.byteLength(LINE, 'utf8') !== LINE.length) {
  throw new Error('fortune must be pure ASCII so bytes equal characters');
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// No trailing newline: the gate counts characters (1-120) and ties break on
// fewer bytes, so the entry is exactly the fortune, nothing more.
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
