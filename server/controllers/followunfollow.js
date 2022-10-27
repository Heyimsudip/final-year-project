import User from "../models/user"

export const follow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (!user.followings.includes(req.body.userId)) {
            await user.updateOne({ $push: { followings: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you already follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant follow yourself");
      }
}

export const unfollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (user.followings.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followings: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you dont follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }
}

export const ownerinfo = async (req, res) => {
    try {
     const {ownerId} = req.params;
     console.log(ownerId)
     let roomowner = await User.findById(ownerId)
     .select('-hashed_password')
     .select('-subscriptions')
     .select('-stripe_seller')
     .select('-stripeSession')
     console.log('All Information', roomowner)
     res.json(roomowner)
    } catch (error) {
     res.status(400);
     throw new Error(error.message);
    }
 }
