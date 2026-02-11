const imageKit = require("@imagekit/nodejs");

const imagekit =  new imageKit({
    privateKey: process.env.PRIVATE_KEY
})

const uploadImage = async(buffer)=>{
    const upload = await imagekit.files.upload({
        file: buffer.toString('base64'),
        fileName: "image.jpg"
    })
    return upload;
}

module.exports = uploadImage;