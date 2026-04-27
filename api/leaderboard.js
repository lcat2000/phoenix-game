const { Redis } = require('@upstash/redis');
const kv = Redis.fromEnv();

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const [scores, plays] = await Promise.all([
      kv.get('lb:scores'),
      kv.get('lb:plays')
    ]);
    return res.json({ scores: scores || [], plays: plays || 0 });
  }

  if (req.method === 'POST') {
    const { name, score, wave, date } = req.body || {};
    if (typeof name !== 'string' || name.length < 1 || name.length > 6) return res.status(400).json({ error: 'invalid name' });
    if (!Number.isInteger(score) || score < 0 || score > 9999999) return res.status(400).json({ error: 'invalid score' });
    if (!Number.isInteger(wave) || wave < 1 || wave > 99) return res.status(400).json({ error: 'invalid wave' });
    let scores = (await kv.get('lb:scores')) || [];
    scores.push({ name, score, wave, date: typeof date === 'string' ? date.slice(0, 10) : '' });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 10);
    const plays = await kv.incr('lb:plays');
    await kv.set('lb:scores', scores);
    const idx = scores.findIndex(x => x.name === name && x.score === score);
    return res.json({ rank: idx + 1, plays });
  }

  res.status(405).end();
};
