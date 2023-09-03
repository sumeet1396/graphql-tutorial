const axios = require('axios');

const get = async ({url, params}) => axios.get(url, {params})

const post = async ({url, params, body }) => axios.post(url, body, { params: {} })

module.exports = { get, post }