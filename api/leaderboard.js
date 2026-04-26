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
    const { name, score, wave, date } = req.body;
    let scores = (await kv.get('lb:scores')) || [];
    scores.push({ name, score, wave, date });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 10);
    const plays = await kv.incr('lb:plays');
    await kv.set('lb:scores', scores);
    const rank = scores.findIndex(x => x.name === name && x.score === score) + 1;
    return res.json({ rank, plays });
  }

  res.status(405).end();
};
