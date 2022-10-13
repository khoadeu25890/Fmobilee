import express from "express";
import Product from "../model/productModel.js";
// library
import asyncHandler from "express-async-handler";
const router = express.Router();

// @desc Fetch all Products
// @route  GET/api/products
// @access Public

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc Fetch single Product
// @route  GET/api/products/:ud
// @access Public

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        message: "Products not found",
      });
    }
    res.json(product);
  })
);

export default router;
