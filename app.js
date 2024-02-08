"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fs = require("fs");
var app = (0, express_1.default)();
var PORT = 4000;
app.use(express_1.default.json());
var products = [
    {
        id: 1,
        name: "rame",
        cost: 500,
        createdAt: new Date(),
    },
    {
        id: 2,
        name: "ramee",
        cost: 100,
        createdAt: new Date(),
    },
    {
        id: 3,
        name: "rme",
        cost: 200,
        createdAt: new Date(),
    },
];
console.log("products:", products);
app.get("/api/products", function (req, res) {
    res.send({ success: true, data: products });
});
app.get("/api/products/:id", function (req, res) {
    var id = req.params.id;
    var product = products.find(function (p) { return p.id === Number(id); });
    if (!product) {
        return res.status(404).json({ success: false, data: null });
    }
    res.send({ success: true, data: product });
});
app.post("/api/products", function (req, res) {
    var product = req.body;
    var lastId = products.length > 0 ? products[products.length - 1].id : 0;
    product.id = lastId + 1;
    products.push(product);
    res.send({ success: true, data: product });
    // Save products to a JSON file
    saveProductsToFile();
});
app.delete("/api/products/:id", function (req, res) {
    var id = req.params.id;
    var index = products.findIndex(function (p) { return p.id === Number(id); });
    if (index === -1) {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Product with ID ".concat(id, " not found"),
        });
    }
    var deletedProduct = products.splice(index, 1);
    res.send({
        success: true,
        data: deletedProduct[0],
        message: "Product deleted",
    });
    // Save products to a JSON file
    saveProductsToFile();
});
app.put("/api/products/:id", function (req, res) {
    var id = req.params.id;
    var updatedProduct = req.body;
    var index = products.findIndex(function (p) { return p.id === Number(id); });
    if (index === -1) {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Product with ID ".concat(id, " not found"),
        });
    }
    products[index] = __assign(__assign({}, products[index]), updatedProduct);
    res.send({
        success: true,
        data: products[index],
        message: "Product updated",
    });
    // Save products to a JSON file
    saveProductsToFile();
});
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
// Function to save products to a JSON file
function saveProductsToFile() {
    fs.writeFile("products.json", JSON.stringify(products, null, 2), function (err) {
        if (err) {
            console.error("Error writing to file:", err);
        }
        else {
            console.log("Products saved to file");
        }
    });
}
