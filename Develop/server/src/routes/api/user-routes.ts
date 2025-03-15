import express from 'express';
const router = express.Router();
import {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} from '../../controllers/user-controller.js';

router.route('/').post(createUser).put(saveBook);
router.route('/login').post(login);
router.route('/me').get(getSingleUser);
router.route('/books/:bookId').delete(deleteBook);

export default router;
