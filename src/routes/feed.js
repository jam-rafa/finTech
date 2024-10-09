const { Router } = require("express");
const FeedController = require("../controlers/feed");

const router = Router();
router.get("/search", FeedController.getSearch);






module.exports = router;
