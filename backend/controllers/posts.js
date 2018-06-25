const Post = require("../models/post");



exports.createPosts = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Post add success",
        post: {
          id: result._id,
          ...result
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "creating a post fail!"
      });
    });
}

exports.updatePosts = (req, res, next) => {
  let ImagePath = req.body.imagePath; // ไฟล์ภาพเดิม
  if (req.file) {
    // ไฟล์ภาพใหม่
    const url = req.protocol + "://" + req.get("host");
    ImagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: ImagePath,
    creator: req.userData.userId
  });
  console.log("update result " + post);
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update success" });
      } else {
        res.status(401).json({ message: "Not authorizad!" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not update post!"
      });
    });
}

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.findOne();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .find()
    .then(data => {
      fetchedPosts = data;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "fetch posts success",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
};


exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
};

exports.deletePosts = (req, res, next) => {
  console.warn("ID has been deleted " + req.params.id);
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Delete success" });
      } else {
        res.status(401).json({ message: "Not authorizad!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not delete post!" });
    });
};
