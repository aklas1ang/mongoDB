const router = require('express').Router();

let People = require('../models/people.model');

//home
router.route('/').get((req,res)=> {
    People.find()
        .then(peoples => res.json(peoples))
        .catch(error => res.status(400).json("Error: " + error));
});

//select single data
router.route('/:id').get((req, res) => {
    People.findById(req.params.id)
        .then(people => res.json(people))
        .catch(err => res.status(400).json('Error: ' + err));
});

//add
router.route('/add').post((req, res) => {
    const fullname = req.body.fullname;
    const occupation = req.body.occupation;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;

    const newPeople = new People({fullname,occupation,email,phonenumber});

    newPeople.save()
            .then(res.json("New people added"))
            .catch(error => res.status(400).json("Error: " + error));
});

//update
router.route('/update/:id').post((req, res) => {
    
    People.findById(req.params.id)
            .then(peoples => {
                peoples.fullname = req.body.fullname;
                peoples.occupation = req.body.occupation;
                peoples.email = req.body.email;
                peoples.phonenumber = req.body.phonenumber;

                peoples.save()
                    .then(res.json("People updated successfully"))
                    .catch(error => res.status(400).json("Error: " + error));
                })
            .catch(error => res.status(400).json("Error: " + error));
});

//delete
router.route('/delete/:id').delete((req,res) => {
    People.findByIdAndDelete(req.params.id)
        .then(res.json('Deleted Successfully'))
        .catch(error => res.status(400).json("Error: " + error));
});

module.exports = router;