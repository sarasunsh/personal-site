'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();


module.exports = router;

// Make sure this is after all of
// the registered routes! If a request was made to /api/ that doesn't match any of the above, we return 404
router.use(function (req, res) {
  res.status(404).end();
});
