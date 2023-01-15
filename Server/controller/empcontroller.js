const express = require('express');
var cors = require('cors')
var app = express()
var router = express.Router();
const Employe = require('../model/employe');

router.use(cors());

router.get('/getAll', async (req, res) => {
	try{
		const emp = await Employe.find();
		res.json(emp);
	}catch(err){
		res.json({message: err});
	}

});

router.post('/', async (req, res) => {
	const empl = new Employe({
		nom: req.body.nom,
		description: req.body.description
	});
	empl.save();
	const emp = await Employe.find();
	res.json(emp);
	
});

router.get('/:empid', async (req, res) => {
	try{
		const emp =  await Employe.findById(req.params.empid);
		res.json(emp);
	}catch(err){
		res.json ({message: err});
	}
});


//Modifier
router.patch('/:empid', async (req, res) => {
	try{
		const emp =  await Employe.updateOne(
			{ _id: req.params.empid },
			{ $set: {nom: req.body.nom}}
		);
		res.json(emp);
	}catch(err){
		res.json ({message: err});
	}
});


router.delete('/:empid', async (req, res) => {
	try{
		const emp =  await Employe.remove(
			{ _id: req.params.empid });
		res.json(emp);
	}catch(err){
		res.json ({message: err});
	}
});

router.get('/delete', async (req, res) => {
	try{
		const emp =  await Employe.deleteMany();
		res.json(emp);
	}catch(err){
		res.json ({message: err});
	}
});


module.exports = router;