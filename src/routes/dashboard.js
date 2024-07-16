const { Router } = require("express");
const DashBoardController = require("../controlers/dashboard");

const router = Router();
router.get("/finance", DashBoardController.getMonthChart);
router.get("/sector", DashBoardController.getSectorChat);


module.exports = router;
