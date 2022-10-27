import DetailInformation from "../models/DetailedInformation"
import fs from 'fs'

export const createuserdetail = async (req, res) => {
    // console.log("req.fields", req.fields)
    // console.log("req.files", req.files)
    try {
        let fields = req.fields
        let files = req.files
        let userDetails = new DetailInformation(fields);
        userDetails.detailedInformationof = req.user._id
        //handle image
        if(files.profileimage){
            userDetails.profileimage.data = fs.readFileSync(files.profileimage.path)
            userDetails.profileimage.contentType = files.profileimage.type
        }

        if(files.citizenshipimage){
            userDetails.citizenshipimage.data = fs.readFileSync(files.citizenshipimage.path)
            userDetails.citizenshipimage.contentType = files.citizenshipimage.type 
        }

        userDetails.save((err, result) =>{
            if(err){
                console.log('saving hotel error => ',err)
                res.status(400).send('Error saving');
            }
            res.json(result);
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
}

export const profileimage = async (req, res) => {
    let user = await DetailInformation.findById(req.params.userId).exec();
    if(user && user.profileimage && user.profileimage.data !== null){
        res.set('Content-Type', user.profileimage.contentType)
        return res.send(user.profileimage.data)
        
    }
}

export const cityzenshipimage = async (req, res) => {
    let user = await DetailInformation.findById(req.params.userId).exec();
    if(user && user.citizenshipimage && user.citizenshipimage.data !== null){
        res.set('Content-Type', user.citizenshipimage.contentType)
        return res.send(user.citizenshipimage.data)
    }
}

export const detailInformationofuser = async (req, res) => {
    let user = await DetailInformation.find({detailedInformationof: req.user._id})
    .select('-profileimage.data')
    .select('-citizenshipimage.data')
    .populate('detailedInformationof', '_id')
    .exec();
    res.json(user)
}

export const detailuser = async (req, res) => {
    let user = await DetailInformation.find({detailedInformationof: req.params.userId})
    .select('-profileimage.data')
    .select('-citizenshipimage.data')
    .populate('detailedInformationof', '_id')
    .exec();
    res.json(user)
}

export const detailInfoofuser = async (req, res) => {
    let user = await DetailInformation.findById(req.params.userId)
    .select('-profileimage.data')
    .select('-citizenshipimage.data')
    .populate('detailedInformationof', '_id')
    .exec();
    res.json(user)
}

export const updateuserinfo = async (req, res) => {
    try {
        let fields = req.fields
        let files = req.files

        let data = {...fields}

        if(files.profileimage){
            let profileimage = {}
            profileimage.data = fs.readFileSync(files.profileimage.path)
            profileimage.contentType = files.profileimage.type
            data.profileimage = profileimage
        }

        if(files.citizenshipimage){
           let citizenshipimage = {}
           citizenshipimage.data = fs.readFileSync(files.citizenshipimage.path)
           citizenshipimage.contentType = files.citizenshipimage.type
           data.citizenshipimage = citizenshipimage
        }

        let updated = await DetailInformation.findByIdAndUpdate(req.params.userId, data, {new: true})
        .select('-image.data')
        res.json(updated)

    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
}
