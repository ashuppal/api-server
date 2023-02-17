'use strict';

const {app} = require ('../server');
const supertest = require ('supertest');
const {sequelizeDatabase} = require ('../models');
const request = supertest (app);

beforeAll (async () => {
  await sequelizeDatabase.sync ();
});

afterAll (async () => {
  await sequelizeDatabase.drop ();
});

describe ('Food route', () => {
  it ('create a food item', async () => {
    let response = await request.post ('/food').send ({
      name: 'tacos',
      type: 'Mexican',
    });

    let responseTwo = await request.post ('/food').send ({
      name: 'teriyaki',
      type: 'Japanese',
    });

    expect (response.status).toEqual (200);
    expect (response.body.id).toBeTruthy ();
    expect (response.body.name).toEqual ('tacos');
    expect (response.body.type).toEqual ('Mexican');
    expect (responseTwo.body.name).toEqual ('teriyaki');
    expect (responseTwo.body.type).toEqual ('Japanese');
  });

  it ('gets all food', async () => {
    let response = await request.get ('/food');
    // console.log(response.body);
    expect (response.status).toEqual (200);
    expect (response.body.length).toEqual (2);
    expect (response.body[0].name).toEqual ('tacos');
    expect (response.body[1].type).toEqual ('Japanese');
  });

  it ('gets a single food item by id', async () => {
    let response = await request.get ('/food/1');

    expect (response.status).toEqual (200);
    expect (response.body.id).toBeTruthy ();
    expect (response.body.name).toEqual ('tacos');
    expect (response.body.type).toEqual ('Mexican');
  });

  it ('updates as expected', async () => {
    let response = await request.put ('/food/1').send ({
      id: 1,
      name: 'burritos',
      type: 'Mexican',
    });

    expect (response.status).toEqual (200);
    expect (response.body).toEqual ([1]);
  });

  it ('deletes as expected', async () => {
    let response = await request.delete ('/food/1');
    console.log ('delete response', response.body);
    // if we use the base postgres functionality, this works!
    expect (response.status).toEqual (200);
    // expect(response).toEqual([1]);

    let responseTwo = await request.get ('/food');
    expect (responseTwo.body[0].type).toEqual ('Japanese');
  });
});

describe ('Clothes route', () => {
  it ('create a clothes item', async () => {
    let response = await request.post ('/clothes').send ({
      name: 't-shirt',
      size: 'large',
    });

    let responseTwo = await request.post ('/clothes').send ({
      name: 'sweater',
      size: 'medium',
    });

    expect (response.status).toEqual (200);
    expect (response.body.id).toBeTruthy ();
    expect (response.body.name).toEqual ('t-shirt');
    expect (response.body.size).toEqual ('large');
    expect (responseTwo.body.name).toEqual ('sweater');
    expect (responseTwo.body.size).toEqual ('medium');
  });

  it ('gets all clothes', async () => {
    let response = await request.get ('/clothes');
    // console.log(response.body);
    expect (response.status).toEqual (200);
    expect (response.body.length).toEqual (2);
    expect (response.body[0].name).toEqual ('t-shirt');
    expect (response.body[1].size).toEqual ('medium');
  }), it ('gets a single clothes item by id', async () => {
    let response = await request.get ('/clothes/1');

    expect (response.status).toEqual (200);
    expect (response.body.id).toBeTruthy ();
    expect (response.body.name).toEqual ('t-shirt');
    expect (response.body.size).toEqual ('large');
  }), it ('updates as expected', async () => {
    let response = await request.put ('/clothes/1').send ({
      id: 1,
      name: 'hoodie',
      size: 'large',
    });

    expect (response.status).toEqual (200);
    expect (response.body).toEqual ([1]);
  }), it ('deletes as expected', async () => {
    let response = await request.delete ('/clothes/1');
    console.log ('delete response', response.body);
    // if we use the base postgres functionality, this works!
    expect (response.status).toEqual (200);
    // expect(response).toEqual([1]);

    let responseTwo = await request.get ('/clothes');
    expect (responseTwo.body[0].size).toEqual ('medium');
  });
});
