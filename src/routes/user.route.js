const { Router } = require('express');
const router = Router();

const User =  require('../controllers/user.controller');
const user = new User();

router
  .route('/')
  .get(user.getUsers);

router
  .route('/:_id')
  .get(user.getUser)
  .put(user.updateUser)
  .delete(user.deleteUser);


module.exports = router;