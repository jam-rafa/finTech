const { Router } = require("express");
const DashBoardController = require("../controlers/dashboard");

const router = Router();
router.get("/finance", DashBoardController.getMonthChart);
router.get("/sector", DashBoardController.getSectorChat);
router.get("/profit-products", DashBoardController.getProfitProducts);
router.get("/loss-products", DashBoardController.getLossProducts);
router.get("/balance", DashBoardController.getBalance);





module.exports = router;
