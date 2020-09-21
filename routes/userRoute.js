const express = require('express');

const router = express.Router();

router.get("/users/createadmin", async (request, response) => {
    //If error server will be sent a message, 
    try {
        const user = new User({
            name: 'Robbie',
            email: 'robbie@ga.co',
            password: 'chicken',
            isAdmin: true
        });

        const newUser = await user.save();
        response.send(user);

    } catch (error) {
        response.send({ msg: error.message })
    }

})

module.exports = router;
