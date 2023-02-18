'use strict';

const express = require ('express');
const {clothesModel} = require ('../models');
const router = express.Router ();

router.get ('/clothes', async (req, res, next) => {
  // const food = await clothesModel.findAll ();
  // res.status (200).send (food);
  try {
    const clothes = await clothesModel.findAll ();
    res.status (200).send (clothes);
  }
  catch (e) {
    console.log ('error in clothes get', e);
  }

});

router.get ('/clothes/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    console.log ('cloth id is: ', id);

    const singleClothItem = await clothesModel.findByPk (id);
    res.status (200).send (singleClothItem);
  }
  catch (e) {
    console.log ('error in clothes get', e);
  }

  // const {id} = req.params;
  // console.log ('cloth id is: ', id);

  // const singleFoodItem = await clothesModel.findByPk (id);
  // res.status (200).send (singleFoodItem);
});

router.post ('/clothes', async (req, res, next) => {
  try {
    let newClothesItem = await clothesModel.create (req.body);
    res.status (200).send (newClothesItem);
  }
  catch (e) {
    console.log ('Please enter valid input', e);
  }
});

router.put ('/clothes/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const itemsModified = await clothesModel.update (req.body, {where: {id}});
    res.status (200).send (itemsModified);
  }
  catch (e) {
    console.log ('error in clothes put', e);
  }

  // const {id} = req.params;
  // const itemsModified = await clothesModel.update (req.body, {where: {id}});

  // res.status (200).send (itemsModified);
});

router.delete ('/clothes/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    await clothesModel.destroy ({where: {id}});
    res.status (200).send ('deleted');
  }
  catch (e) {
    console.log ('error in clothes delete', e);
  }
  
  // const {id} = req.params;
  // await clothesModel.destroy ({where: {id}});
  // res.status (200).send ('deleted');
});

module.exports = router;
