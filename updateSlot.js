//method update the slot by the doctor
const updateSlot = (req, res, freeSlot) => {
    const {email, date, time } = req.body;
    if (!email || !date || !time) {
        if (!email) {
            return res.status (400).send ('Email address not present');
        }
        if (!date) {
            return res.status (400).send ('Date not present ');
        }
        if (!time ) {
            return res.status (400).send ('Time not present');
        }
    }
    new freeSlot ( {
        email : email,
        date : date,
        time : time,
    }).save ((err, result) => {
        if (err) {
            console.log ('Error in uploading free slot from server side');
        }
        else {
            res.status (200).json ('Slot updated successfully !');
        }
    }) 
}

module.exports = {
    updateSlot : updateSlot,
}