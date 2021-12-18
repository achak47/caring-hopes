//method update the slot by the doctor
//slot id needs to be updated 
const updateSlot = (req, res, freeSlot) => {
    const {doc_email, date, time } = req.body;
    if (!doc_email || !date || !time) {
        if (!doc_email) {
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
        doc_email : doc_email,
        patient_email : null,
        date : time,
        time : time,
        isbooked: false,
        meetlink: null,
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
