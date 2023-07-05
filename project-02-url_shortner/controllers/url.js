const shortid = require('shortid');
const URL = require('../models/url');

const handleGenerateShortUrl = async (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body.url) {
    return res.status(400).json({ error: 'url is required' });
  }
  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.render('Home', { id: shortId });
};

const handleRedirectUrl = async (req, res) => {
  const shortId = req.params.shortId;

  if (shortId === '') return res.json({ error: 'url id is required' });
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) return res.json({ error: 'url id is required' });
  return res.redirect(entry.redirectUrl);
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateShortUrl,
  handleRedirectUrl,
  handleGetAnalytics,
};
