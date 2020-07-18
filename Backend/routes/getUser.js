const router = require("express").Router();
const verifyUser = require("../middleware/jwt");
const UserModel = require("../models/user");

router.get("/", async (req, res) => {
  const allUserData = await UserModel.find({});
  res.send({
    message: "success",
    type: "GET_ALL_USERS",
    users: allUserData.map((doc) => ({
      name: doc.name,
      id: doc._id,
      skills: doc.skills,
      email: doc.email,
      name: doc.name,
      city: doc.city,
    })),
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let userData = await UserModel.findOne({
      _id: id,
    });
    console.log(userData);
    userData.password = undefined;
    res.send({
      message: "success",
      type: "GET_SINGLE_USER",
      user: userData,
    });
  } catch (e) {
    res.send({
      message: "failure",
      type: "NO_USER",
    });
  }
});

router.post("/:id", verifyUser, async (req, res) => {
  console.log(req.userData);
  if (req.userData.id === req.params.id) {
    const updateQuery = await UserModel.findOneAndUpdate(
      { _id: req.userData.id },
      {
        $set: req.body.data,
      },
      { new: true, useFindAndModify: false }
    );
    res.json(updateQuery);
  } else {
    res.json({
      message: "failure",
      type: "NOT_AUTHORIZED",
    });
  }
});

module.exports = router;
