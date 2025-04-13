const {
  client,
  createTables,
  createUser,
  createClothing,
  createOutfit,
  createOutfitClothes,
  createClothingTag,
  createOutfitTag,
  createReview,
  createComment,
  authenticate,
  findUserWithToken,
  fetchUsers,
  fetchUser,
  fetchUserClothing,
  fetchClothing,
  fetchOutfits,
  fetchUserOutfits, 
  fetchOutfit,
  fetchOutfitClothes,
  fetchClothingTags,
  fetchOutfitTags,
  fetchOutfitReviews,
  fetchOutfitReview,
  fetchUserReviews,
  fetchReviewComments,
  fetchReviewComment,
  fetchUserComments,
  updateClothing,
  updateOutfit,
  updateReview,
  updateComment,
  deleteClothing,
  deleteOutfit,
  deleteOutfitClothesbyClothing,
  deleteOutfitClothesbyOutfit,
  deleteClothingTag,
  deleteClothingTags,
  deleteOutfitTag,
  deleteOutfitTags,
  deleteReviews,
  deleteReview,
  deleteCommentsByOutfit,
  deleteCommentsByReview,
  deleteComment
} = require('./db');
const express = require('express');
const { seedDatabases } = require('./dbSeed');
const app = express();
app.use(express.json());

// Necessary functions/routes to access your account and access your account info
const isLoggedIn = async(req, res, next)=> {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  }
  catch(ex){
    next(ex);
  }
};

app.post('/api/auth/login', async(req, res, next)=> {
  try {
    res.send(await authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/auth/register', async(req, res, next)=> {
  try {
    res.send(await createUser(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/auth/me', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(req.user);
  }
  catch(ex){
    next(ex);
  }
});

// Fetches outfit info
app.get('/api/outfits', async(req, res, next)=> {
  try {
    res.send(await fetchOutfits());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/outfits/:outfitId', async(req, res, next)=> {
  try {
    res.send(await fetchOutfit(req.params.outfitId));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/outfits/:outfitId/clothing', async(req, res, next)=> {
  try {
    res.send(await fetchOutfitClothes(req.params.outfitId));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/clothing/:clothingId', async(req, res, next)=> {
  try {
    res.send(await fetchClothing(req.params.clothingId));
  }
  catch(ex){
    next(ex);
  }
});

// Fetches user specific information
app.get('/api/users/:userId/clothing', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchUserClothing(req.params.userId));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users/:userId/outfits', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchUserOutfits(req.params.userId));
  }
  catch(ex){
    next(ex);
  }
});

// Fetches Tags
app.get('/api/clothing/:clothingId/clothingTags', async(req, res, next)=> {
  try {
    res.send(await fetchClothingTags(req.params.clothingId));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/outfits/:outfitId/outfitTags', async(req, res, next)=> {
  try {
    res.send(await fetchOutfitTags(req.params.outfitId));
  }
  catch(ex){
    next(ex);
  }
});

// Fetches reviews and comments
app.get('/api/outfits/:outfitId/reviews', async(req, res, next)=> {
  try {
    res.send(await fetchOutfitReviews(req.params.outfitId));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/outfits/:outfitId/reviews/:reviewId', async(req, res, next)=> {
  try {
    res.send(await fetchOutfitReview({id: req.params.reviewId, outfit_id: req.params.outfitId}));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/outfits/:outfitId/reviews/:reviewId/comments', async(req, res, next)=> {
  try {
    res.send(await fetchReviewComments({outfit_id: req.params.outfitId, review_id: req.params.reviewId}));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/outfits/:outfitId/reviews/:reviewId/comments/:commentId', async(req, res, next)=> {
  try {
    res.send(await fetchReviewComment({id: req.params.commentId, outfit_id: req.params.outfitId, review_id: req.params.reviewId}));
  }
  catch(ex){
    next(ex);
  }
});

// Fetches user reviews and comments
app.get('/api/reviews/me', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchUserReviews(req.user.id));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/comments/me', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchUserComments(req.user.id));
  }
  catch(ex){
    next(ex);
  }
});

// Fetches info for admin users
app.get('/api/users', isLoggedIn, async(req, res, next)=> {
  try {
    if(!req.user.is_admin){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await fetchUsers());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users/:userId', isLoggedIn, async(req, res, next)=> {
  try {
    if(!req.user.is_admin){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await fetchUser(req.params.userId));
  }
  catch(ex){
    next(ex);
  }
});

// Create clothing and outfit statements.
app.post('/api/clothing', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.status(201).send(await createClothing(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/outfits', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.status(201).send(await createOutfit(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/outfits/:outfitId/clothing/:clothingId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.status(201).send(await createOutfitClothes({ outfit_id: req.params.outfitId, clothing_id: req.params.clothingId}));
  }
  catch(ex){
    next(ex);
  }
});

// Create Review and outfit statements
app.post('/api/outfits/:outfitId/reviews', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.status(201).send(await createReview({ user_id: req.body.user_id, outfit_id: req.params.outfitId, written_rating: req.body.written_rating }));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/outfits/:outfitId/reviews/:reviewId/comments', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.status(201).send(await createComment({ review_id: req.params.reviewId, user_id: req.body.user_id, outfit_id: req.params.outfitId, comment: req.body.comment }));
  }
  catch(ex){
    next(ex);
  }
});

// Create clothing and outfit tags

app.post('/api/clothing/:clothingId/clothingTags', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.status(201).send(await createClothingTag({clothing_id: req.params.clothingId, tag: req.body.tag}));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/outfits/:outfitId/outfitTags', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }

    res.status(201).send(await createOutfitTag({outfit_id: req.params.outfitId, tag: req.body.tag}));
  }
  catch(ex){
    next(ex);
  }
});

// Update clothing and outfits
app.put('/api/clothing/:clothingId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.status(201).send(await updateClothing({name: req.body.name, clothing_type: req.body.clothing_type, store_link: req.body.store_link, clothing_img_link: req.body.clothing_img_link, id: req.params.clothingId, user_id: req.body.user_id}));
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/outfits/:outfitId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.status(201).send(await updateOutfit({name: req.body.name, previously_worn: req.body.previously_worn, share_publicly: req.body.share_publicly, id: req.params.outfitId, user_id: req.body.user_id}));
  }
  catch(ex){
    next(ex);
  }
});

// Update reviews and comments
app.put('/api/users/:userId/reviews/:reviewId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await updateReview({ written_rating: req.body.written_rating, id: req.params.reviewId, user_id: req.params.userId }));
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/users/:userId/comments/:commentId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await updateComment({ comment: req.body.comment, id: req.params.commentId, user_id: req.params.userId }));
  }
  catch(ex){
    next(ex);
  }
});

// Deletes clothing and outfits

app.delete('/api/clothing/:clothingId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id && !req.user.is_admin){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    await deleteOutfitClothesbyClothing(req.params.clothingId);
    await deleteClothingTags(req.params.clothingId);
    await deleteClothing(req.params.clothingId);
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/outfits/:outfitId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id && !req.user.is_admin){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    await deleteOutfitClothesbyOutfit(req.params.outfitId);
    await deleteOutfitTags(req.params.outfitId);
    await deleteCommentsByOutfit(req.params.outfitId);
    await deleteReviews(req.params.outfitId);
    await deleteOutfit(req.params.outfitId);
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

// Deletes Tags
app.delete('/api/clothingTags/:clothingTagId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id && !req.user.is_admin){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    await deleteClothingTag(req.params.clothingTagId);
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/outfitTags/:outfitTagId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id && !req.user.is_admin){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    await deleteOutfitTag(req.params.outfitTagId);
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});


// Deletes Comments and Reviews
app.delete('/api/users/:userId/comments/:commentId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id && !req.user.is_admin){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    await deleteComment({ user_id: req.params.userId, id: req.params.commentId });
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/users/:userId/reviews/:reviewId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id && !req.user.is_admin){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    await deleteCommentsByReview(req.params.reviewId);
    await deleteReview({ user_id: req.params.userId, id: req.params.reviewId });
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message ? err.message : err });
});

const init = async()=> {
  const port = process.env.PORT || 3000;
  await client.connect();
  console.log('connected to database');

  await createTables();
  console.log('tables created');

  //Seed Databases here

  await seedDatabases();
  console.log('databases seeded');

  app.listen(port, ()=> console.log(`listening on port ${port}`));
};

init();