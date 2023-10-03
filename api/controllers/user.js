const express = require('express');

const sockets = require('./../../socket');

const router = express.Router();

router.get('/:userId/ping', (req, res) => {
  try {
    const { userId } = req.params;
    const { user } = sockets.get();

    const socketConnections = user.sockets.values();
    const values = Array.from(socketConnections);
    const connections = values.reduce((group, item) => {
      if (item.payload.user == userId) {
        group.push(item.payload);
      }
      return group;
    }, []);

    return res.status(200).json(connections);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/:userId/message', (req, res) => {
  try {
    const { userId } = req.params;
    const { message } = req.body;
    const { user } = sockets.get();

    user.to(Number(userId)).emit('message', message);
    return res.status(200).json({ userId, message });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
