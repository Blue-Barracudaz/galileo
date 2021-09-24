const models = require('../../models/index');

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

module.exports = {getUser};