import { Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./controllers/ListUserSenderComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";


const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();

const listTagsController = new ListTagsController();


router.post("/users", createUserController.handle)
router.post("/tags",ensureAuthenticated ,ensureAdmin, createTagController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/compliments",ensureAuthenticated, createComplimentController.handle)

router.get(
  "/users/compliments/send",
  ensureAuthenticated, 
  listUserSendComplimentsController.handle
);
router.get(
  "/users/compliments/receive",
  ensureAuthenticated,  
  listUserReceiveComplimentsController.handle
);

router.get(
  "/tags",
  ensureAuthenticated,
  listTagsController.handle 
)

export { router } 