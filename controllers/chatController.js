const { findAll } = require('../models/Historic');

module.exports = async (_req, res) => {
    const historic = await findAll();
    
    res.status(200).render('chat', { historic });
};
