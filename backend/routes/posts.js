const express = require("express");
const router = express.Router();

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");


router.post("", checkAuth, extractFile, PostController.createPosts);

router.put("/:id", checkAuth, extractFile, PostController.updatePosts);

router.get("", PostController.getPosts);  // fetch

router.get("/:id", PostController.getPost);

router.delete("/:id", checkAuth, PostController.deletePosts);

module.exports = router;
