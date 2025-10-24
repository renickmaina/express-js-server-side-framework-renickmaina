const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductControler");
const auth = require("../middleware/auth");
const validateProduct = require("../middleware/validate");

router.get("/", auth, productController.getProducts);
router.get("/:id", auth, productController.getProductById);
router.post("/", auth, validateProduct, productController.createProduct);
router.put("/:id", auth, validateProduct, productController.updateProduct);
router.delete("/:id", auth, productController.deleteProduct);

// Stats route
router.get("/stats/category", auth, productController.getStats);

module.exports = router;
