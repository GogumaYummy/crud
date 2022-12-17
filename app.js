require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./models');

const app = express();
db.sequelize.sync({ force: false });

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.post('/posts', async (req, res, next) => {
  try {
    const { title, content } = req.body;

    await db.Posts.create({ title, content });
    res.status(201).json({ message: '작성 완료!' });
  } catch (err) {
    next(err);
  }
});
app.get('/posts', async (req, res, next) => {
  try {
    const posts = await db.Posts.findAll({
      attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
      order: [['id', 'DESC']],
    });
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
});
app.get('/posts/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await db.Posts.findByPk(postId, {
      attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
    });
    if (!post) throw new Error('게시글이 없습니다.');
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});
app.patch('/posts/:postId', async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { postId } = req.params;
    const post = await db.Posts.findByPk(postId);
    if (!post) throw new Error('게시글이 없습니다.');
    await post.update({ title, content });
    res.status(201).json({ message: '수정 완료!' });
  } catch (err) {
    next(err);
  }
});
app.delete('/posts/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await db.Posts.findByPk(postId);
    if (!post) throw new Error('게시글이 없습니다.');
    await post.destroy();
    res.status(201).json({ message: '삭제 완료!' });
  } catch (err) {
    next(err);
  }
});

app.post('/items', async (req, res, next) => {
  try {
    const { title, price, image, category } = req.body;
    await db.Items.create({ title, price, image, category });
    res.status(201).json({ message: '작성 완료!' });
  } catch (err) {
    next(err);
  }
});

app.get('/items', async (req, res, next) => {
  try {
    const items = await db.Items.findAll({
      attributes: [
        'itemId',
        'title',
        'price',
        'image',
        'category',
        'createdAt',
      ],
      order: [['itemId', 'DESC']],
    });
    res.status(200).json({ items });
  } catch (err) {
    next(err);
  }
});

app.get('/items/:itemId', async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await db.Items.findByPk(itemId, {
      attributes: [
        'itemId',
        'title',
        'price',
        'image',
        'category',
        'createdAt',
      ],
    });
    if (!item) throw new Error('게시글이 없습니다.');
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

app.patch('/items/:itemId', async (req, res, next) => {
  try {
    const { title, price, image, category } = req.body;
    const { itemId } = req.params;
    const item = await db.Items.findByPk(itemId);
    if (!item) throw new Error('게시글이 없습니다.');
    await item.update({ title, price, image, category });
    res.status(201).json({ message: '수정 완료!' });
  } catch (err) {
    next(err);
  }
});

app.delete('/items/:itemId', async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await db.Items.findByPk(itemId);
    if (!item) throw new Error('게시글이 없습니다.');
    await item.destroy();
    res.status(201).json({ message: '삭제 완료!' });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(999).json({ errorMessage: err.message });
});

app.listen(process.env.PORT, () =>
  console.log('listening on port ' + process.env.PORT)
);
