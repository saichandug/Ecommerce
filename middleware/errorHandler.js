module.exports = (err, req, res, next) => {
    if(err.name === "ValidationError") {
        return res.status(400).json({ error: err.message});
    }
    if(err.name === "CatchError") {
        return res.status(400).json({ error: "invalid ID"});
    }
    return res.status(500).json({
        message: err.message
    })
};