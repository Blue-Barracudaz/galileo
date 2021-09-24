const models = require('../../models/index.js');


const getProfile = async (req,res) =>{
  try {
    const newPost = await models.getProfile(req.params.user_id);
    res.status(201).json(newPost)
  }catch(error) {

    res.status(500).send(error)
  }
};

const createProfile = async (req,res) =>{
  try {
    const result = await models.createProfile(req.body);

    res.status(201).json(result)
  }catch(error) {

    res.status(500).send(error)
  }
};
const updateProfile = async (req,res) =>{
  try {
    const {user_id,...data} = req.body
    const result = await models.updateProfile(data,user_id);

    res.status(201).json(result)
  }catch(error) {

    res.status(500).send(error)
  }
};

const getUser = async (req, res) => {
  // console.log('getUser req.body from controller', req.body);
    try {
      let user = await models.getUser(req.body.username);
      // console.log('user in controller:', user);
      if (!user) {
        // console.log('noExistUser');
        res.send('noExistUser');
      } else if (req.body.password === user.password) {
        // console.log('Successfully login as:', req.body.password, user);
        // res.send('successLogin');
        res.send(user);
      } else {
        // console.log('Unsuccessfully login as:', req.body.password, user);
        res.send(`failLogin`)
      }
    } catch (err) {
      // console.log('getUser from controller ERR: ', err);
      res.status(500).send({message: err.message});
    }
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  getUser
}
