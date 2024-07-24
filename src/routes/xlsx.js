const { Router } = require("express");
const XlsxController = require("../controlers/xlsx");

const router = Router();
router.get("/relatorio", XlsxController.getXlsxData);

module.exports = router;
