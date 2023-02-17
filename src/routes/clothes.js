'use strict';

const express = require ('express');
const {clothesModel} = require ('../models');
const router = express.Router ();

router.get ('/clothes', async (req, res, next) => {
  const food = await clothesModel.findAll ();
  res.status (200).send (food);
});

router.get ('/clothes/:id', async (req, res, next) => {
  const {id} = req.params;
  console.log ('cloth id is: ', id);

  const singleFoodItem = await clothesModel.findByPk (id);
  res.status (200).send (singleFoodItem);
});

router.post ('/clothes', async (req, res, next) => {
  let newFoodItem = await clothesModel.create (req.body);
  res.status (200).send (newFoodItem);
});

router.put ('/clothes/:id', async (req, res, next) => {
  const {id} = req.params;
  const itemsModified = await clothesModel.update (req.body, {where: {id}});

  res.status (200).send (itemsModified);
});

router.delete ('/clothes/:id', async (req, res, next) => {
  const {id} = req.params;
  await clothesModel.destroy ({where: {id}});
  res.status (200).send ('deleted');
});

module.exports = router;
