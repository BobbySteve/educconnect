const Newsletter = require('../models/Newsletter');

exports.subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const newSubscription = new Newsletter({ email });
    await newSubscription.save();
    res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email is already subscribed' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
