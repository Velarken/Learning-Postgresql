const { Router } = require('express');
const newUserRouter = Router();
const newUserController = require('../controllers/newUserController')


// index
newUserRouter.get('/', newUserController.getUsernames);
// db query
newUserRouter.get('/search', (req,res) => res.render('searchUser'))
newUserRouter.get('/search/:username', newUserController.searchUserGet)
// create user
newUserRouter.get('/new', newUserController.createUsernameGet);
newUserRouter.post('/new',newUserController.createUsernamePost);
// delete user
newUserRouter.get('/delete', (req,res) => {
    res.render('deleteUser')
})

module.exports = newUserRouter;