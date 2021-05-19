const router = require('express').Router();

const { authMiddleware } = require('../../utils/auth');

const { upload } = require('../../utils/uploadImg');