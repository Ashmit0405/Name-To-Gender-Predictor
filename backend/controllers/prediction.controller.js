import axios from "axios";
import { asyncHandler } from "../utils/asyncfunction.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getgender=asyncHandler(async(req,res)=>{
    try {
        const {name,count=1,probability=0.0001}=req.body;
        if(!name){
            throw new ApiError(400,"Name is Required")
        }
        const response=await axios.post('http://127.0.0.1:5000/predict',{
            name: name,
            count: count,
            probability: probability
        });
        const gender=response.data.gender;
        console.log(`Predicted Gender: ${gender}`)
        return res.status(200).json(new ApiResponse(200,{gender},"Gender Predicted Successully"))
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
})

export {getgender}