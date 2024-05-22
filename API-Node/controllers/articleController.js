// controllers/articleController.js
const Article = require('../models/Article');

exports.index = async (req, res) => {
  const articles = await Article.find().lean();
  res.json(articles);
};

exports.store = async (req, res) => {
  console.log(req.body);
  const article = new Article(req.body);
  await article.save();
  res.status(201).json(article);
};

exports.show = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('tags').exec();
    if (!article) throw new Error('Article not found');
    res.json(article);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('tags').exec();
    if (!article) throw new Error('Article not found');
    res.json(article);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422).json({ errors: err.errors });
    } else {
      res.status(404).json({ error: err.message });
    }
  }
};

exports.destroy = async (req, res) => {
  try {
    const article = await Article.findByIdAndRemove(req.params.id);
    if (!article) throw new Error('Article not found');
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
