
const { SERVER_ERROR, ID_REQUIRED } = require("../util/messages")
const { addToExcel, readExcelFile } = require('../util/excel');
const path = require('path');

const fileName = 'certificates.xlsx';
const parentFolderPath = path.join(__dirname, '..');
const filePath = path.join(parentFolderPath, fileName);

exports.getAllCertificates = async (req, res) => {
    try{

        const data = await readExcelFile(filePath)
        return res.status(200).json({ status: 1, message: 'Success', data });
        
    } catch(err){
        console.log(err)
        return res.status(500).json({status: 0, message: SERVER_ERROR})
    }
}

exports.getOneCertificate = async (req, res) => {
    try{
        if(!req?.params?.id){
            return res.status(500).json({status: 0, message: ID_REQUIRED})
        }
        const data = await readExcelFile(filePath)
        console.log(req?.params?.id, 232332)
        const certificateWithId = data?.find(el => el?.id == req?.params?.id)
        if(certificateWithId){
            return res.status(200).json({ status: 1, message: 'Success', data: certificateWithId });
        } else {
            return res.status(200).json({ status: 1, message: 'Not found' });
        }
    } catch(err){
        console.log(err)
        return res.status(500).json({status: 0, message: SERVER_ERROR})
    }
}

exports.addCertificate = async (req, res) => {
    try {
        const { receipentName, courseName, issuerName, dateOfIssue } = req?.body;

        // Validation
        if (!(receipentName && courseName && issuerName && dateOfIssue)) {
            return res.status(500).json({ status: 0, message: 'COURSE_VALIDATION_ERROR' });
        }        

        const id = Math.ceil(Math.random()*100000000)
        await addToExcel(
            filePath, 
            "Sheet1",
            ["id", "Receipent Name", "Course Name", "Issuer Name", "Date Of Issue"],
            [id, receipentName, courseName, issuerName, dateOfIssue]
        )

        return res.status(200).json({ status: 1, message: 'Certificate added successfully' });
    } catch (err) {
        console.log(err);
        return res?.status(500)?.json({ status: 0, message: 'SERVER_ERROR', error: err });
    }
};
