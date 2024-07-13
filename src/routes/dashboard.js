const { Router } = require("express");
const DashBoardController = require("../controlers/dashboard");

const router = Router();
router.get("/finance", DashBoardController.getMonthChart);

module.exports = router;
