const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');
  const sauce = new Sauce({
    title: req.body.sauce.title,
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    price: req.body.sauce.price,
    userId: req.body.sauce.userId,
    heat: req.body.sauce.heat,
    likes: 0,
    dislikes: 0,
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
      _id: req.params.id,
      title: req.body.sauce.title,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + '/images/' + req.file.filename,
      price: req.body.sauce.price,
      userId: req.body.sauce.userId,
      heat: req.body.sauce.heat,
      likes: 0,
      dislikes: 0,
    };
  } else {
    sauce = {
      _id: req.params.id,
      title: req.body.title,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId,
      heat: req.body.heat,
      likes: 0,
      dislikes: 0,
    };
  }
  Sauce.updateOne({ _id: req.params.id }, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({ _id: req.params.id }).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeSauce = (req, res, next) => {

  console.log(req.params.id);
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({ error: 'Sauce not found' });
    }
    const userId = req.body.userId;
    const like = req.body.like;
    switch (like) {
      case 1: // user likes the sauce
        resetVote(sauce, userId);
        if (!sauce.usersLiked.includes(userId)) {
          sauce.likes++;
          sauce.usersLiked.push(userId);
        }
        break;
      case 0: // user removes their like
        resetVote(sauce, userId);
        break;
      case -1: // user dislikes the sauce
        resetVote(sauce, userId);
        if (!sauce.usersDisliked.includes(userId)) {
          sauce.dislikes++;
          sauce.usersDisliked.push(userId);
        }
        break;
      default:
        return res.status(400).json({ error: 'Invalid like value' });
    }
    Sauce.updateOne({ _id: req.params.id }, sauce)
      .then(() => {
        res.status(200).json({ message: 'Sauce liked/disliked successfully!' });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  })
    .catch((error) => {
      res.status(404).json({ error: 'Sauce not found' });
    });
};

function resetVote(sauce, userId) {
  if (sauce.usersLiked.includes(userId)) {
    sauce.likes--;
    sauce.usersLiked = sauce.usersLiked.filter(id => id !== userId);
  }
  if (sauce.usersDisliked.includes(userId)) {
    sauce.dislikes--;
    sauce.usersDisliked = sauce.usersDisliked.filter(id => id !== userId);
  }
}
