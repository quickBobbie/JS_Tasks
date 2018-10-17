const router = require('express').Router();
const cors = require('cors');

const { client, auth } = require('../config');

const PostController = require('../Controllers/PostController');
const PutController = require('../Controllers/PutController');
const DeleteController = require('../Controllers/DeleteController');

const { passport } = require('./auth');

router.all('*', cors(client.url));

router.post('/signup', PostController.signUp);
router.post('/signin', passport.authenticate('local', {session : auth.session}), PostController.signIn);

router.put('/user', passport.authenticate('jwt', {session : auth.session}), PutController.updateUser);

router.delete('/user', passport.authenticate('jwt', {session : auth.session}), DeleteController.deleteUser);

module.exports = router;