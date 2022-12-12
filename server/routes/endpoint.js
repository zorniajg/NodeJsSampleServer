const path = require('path');

const express = require('express');

const endpointController = require('../controllers/endpoint');

const router = express.Router();

router.get('/', endpointController.getEndpoints);

// /admin/endpoint => GET
router.get('/endpoints/:_id', endpointController.getEndpoint);

// /admin/data => GET
//router.get('/data', endpointController.getData);

router.post('/delete-endpoint', endpointController.deleteEndpoint);

module.exports = router;
