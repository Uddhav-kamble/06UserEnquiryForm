let express = require("express");
const { enquiryInsert, enquiryList, enquiryDelete, enquirySingleRow, enquiryUpdate } = require("../../controllers/web/enquiryController")
let enquiryRouter = express.Router()

enquiryRouter.post("/insert", enquiryInsert)  //http://localhost:8000/api/website/enquiry/insert

enquiryRouter.get("/view",enquiryList)        //http://localhost:8000/api/website/enquiry/view

enquiryRouter.delete("/delete/:id",enquiryDelete)        //http://localhost:8000/api/website/enquiry/delete/:id

enquiryRouter.get("/single/:id",enquirySingleRow)        //http://localhost:8000/api/website/enquiry/single/:id

enquiryRouter.put("/update/:id",enquiryUpdate)        //http://localhost:8000/api/website/enquiry/update/:id


module.exports = enquiryRouter;