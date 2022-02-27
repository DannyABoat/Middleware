const { Router } = require("express");
const { addUser, findUser, updateUser, deleteUser, login } = require("./userControllers");
const { hashPassword } = require("../middleware");
const userRouter = Router();

userRouter.post("/user", hashPassword, addUser);
userRouter.get("/user", findUser);
userRouter.put("/user", updateUser);
userRouter.delete("/user", deleteUser);

userRouter.post("/signIn", login);

module.exports = userRouter;