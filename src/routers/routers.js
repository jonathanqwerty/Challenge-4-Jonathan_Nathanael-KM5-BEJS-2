const express = require("express");
const userControllers = require("../controllers/userControllers");
const bankAccountControllers = require("../controllers/bankAccountControllers");
const transactionController = require("../controllers/transactionController");
const router = express.Router();

// users
router.post("/users/register", userControllers.registerUser);

router.get("/users", userControllers.getUser);
router.get("/user/:id", userControllers.getUserById);

// bank account

router.post("/accounts/register", bankAccountControllers.createAccount);
router.get("/accounts", bankAccountControllers.getAccounts);
router.get("/account/:accountid", bankAccountControllers.getAccountById);

// transaction

router.post("/transactions/create", transactionController.createTransaction);
router.get("/transaction", transactionController.getTransaction);
router.get(
  "/transaction/:transactionid",
  transactionController.getTransactionById
);
module.exports = router;
