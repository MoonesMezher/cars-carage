const express = require('express');
const router = express.Router();

// Methods
const { createMessage, showAllMessages, showAllNotReadedMessages, showAllReadedMessages, markAsRead, showMessage } = require('../controllers/messageController');


const requireAuth = require('../middlewares/requireAuth');
const validatePageParameter = require('../middlewares/checkFromPageKeyMiddleware');
const validateObjectId = require('../middlewares/checkFromIdMiddleware');

// GET
router.get('/page/:page', [requireAuth, validatePageParameter], showAllMessages)

router.get('/read/page/:page', [requireAuth, validatePageParameter], showAllReadedMessages)

router.get('/not-read/page/:page', [requireAuth, validatePageParameter], showAllNotReadedMessages)

router.get('/:id', [requireAuth, validateObjectId], showMessage)

// POST
router.post('/create/:id', validateObjectId,  createMessage);

// PUT
router.put('/mark-as-read/:id', requireAuth, markAsRead);

module.exports = router;