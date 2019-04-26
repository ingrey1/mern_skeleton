import User from '../models/user.model';
import _ from 'lodash';
import errorHandler from '../helpers/dbErrorHandler';

const create = (req, res, next) => {
  console.log('create called');
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }

    res.status(200).json({
      message: 'Successfully signed up!'
    });
  });
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  }).select('name email updated created');
};

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    // attach user info to request
    req.profile = user;
    // pass to appropriate middleware function
    next();
  });
};

const read = (req, res) => {
  // remove sensitive info before sending to client
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

const update = (req, res, next) => {
  let user = req.profile;
  // update user record
  user = _.extend(user, req.body);
  user.updated = Date.now();
  // save changes to user in db
  user.save(err => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  });
  // remove sensitive info
  user.hashed_password = undefined;
  res.json(user);
};

const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  });
  // remove sensitive info
  deletedUser.hashed_password = undefined;
  res.json(deletedUser);
};

export default { create, list, userByID, read, update, remove };
