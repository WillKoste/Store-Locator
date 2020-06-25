const express = require('express');
const router = express.Router();

const Store = require('../models/Store');

// @desc    Get all stores
// @route   GET /api/v1/stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();

    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (err) {
    console.error(err)
    res.status(500),json({success: false, error: 'Server Error'});
  }
});

// @desc    Get store by store ID
// @route   GET /api/v1/stores/:storeId
router.get('/:storeId', async (req, res) => {
  try {
    const store = await Store.findOne({storeId: req.params.storeId});

    if(!store){
      return res.status(404).json({success: false, errors: [{msg: `No store found with the ID of ${req.params.storeId}`}]});
    }

    res.json({success: true, data: store});
  } catch (err) {
    console.error(err)
    res.status(500),json({success: false, error: 'Server Error'});
  }
});

// @desc    Create a store
// @route   POST /api/v1/stores
router.post('/', async (req, res) => {
  const {storeId, address} = req.body;

  try {
    let store = await Store.findOne({storeId});
    if(store){
      return res.status(400).json({success: false, msg: 'Store ID already in use, please try another string'});
    }

    store = new Store({
      storeId,
      address
    });

    await store.save();
    res.status(201).json({success: true, msg: `Store created, with the id of: ${storeId}`});
  } catch (err) {
    console.error(err);
    res.status(500),json({success: false, error: 'Server Error'});
  }
});

// @desc    Update store by Store ID
// @route   PUT /api/v1/stores/:storeId
router.put('/:storeId', async (req, res) => {
  const {address, storeId} = req.body;

  const storeFields = {};
  if(address) storeFields.address = address;
  if(storeId) storeFields.storeId = storeId
  
  try {
    let store = await Store.findOne({storeId: req.params.storeId});

    if(!store){
      return res.status(404).json({success: false, errors: [{msg: `No store found with the ID of ${req.params.storeId}`}]});
    }

    store = await Store.findOneAndUpdate({storeId: req.params.storeId}, {$set: storeFields}, {new: true})

    res.json({success: true, data: store});
  } catch (err) {
    console.error(err)
    res.status(500),json({success: false, error: 'Server Error'});
  }
});

// @desc    Delete store by Store ID
// @route   DELETE /api/v1/stores/:storeId
router.delete('/:storeId', async (req, res) => {
  try {
    let store = await Store.findOne({storeId: req.params.storeId});

    if(!store){
      return res.status(404).json({success: false, errors: [{msg: `No store found with the ID of ${req.params.storeId}`}]});
    }

    await Store.findOneAndRemove({storeId: req.params.storeId});
    res.json({success: true, msg: 'Store Removed'});
  } catch (err) {
    console.error(err)
    res.status(500),json({success: false, error: 'Server Error'});
  }
});

module.exports = router;