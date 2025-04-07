
const mongoose= require("mongoose")

const connectDB=async ()=>{

    await  mongoose.connect("mongodb+srv://renio067778:rishabh06@namastebackend.hgswilw.mongodb.net/NamsteBackend")
};

module.exports= connectDB;