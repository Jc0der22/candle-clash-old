const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, 'raw-candles.json');
const OUTPUT = path.join(__dirname, 'assets', 'data', 'sample-candles.json');

try {
  const raw = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  const candles = Array.isArray(raw) ? raw : raw.candles;

  if (!candles || candles.length < 50) {
    console.error(`❌ Not enough candles: got ${candles?.length ?? 0}, need at least 50`);
    process.exit(1);
  }

  const dir = path.dirname(OUTPUT);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(OUTPUT, JSON.stringify(candles, null, 2));
  console.log(`✅ Saved ${candles.length} real STX candles to assets/data/sample-candles.json`);
  console.log(`   First candle close: $${candles[0].close}`);
  console.log(`   Last candle close: $${candles[candles.length - 1].close}`);
} catch (err) {
  console.error(`❌ Failed: ${err.message}`);
  process.exit(1);
}
