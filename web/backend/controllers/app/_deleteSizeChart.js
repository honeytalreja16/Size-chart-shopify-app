import Sizecharts from "../../models/sizeChartModal.js"

const _deleteSizeChart = async(req , res)=>{
try {
    console.log("hit delete api===")
    const  {id} = req.params;
    console.log(id,"id to delete---")
   
    const deletedItem = await Sizecharts.findByIdAndDelete(
        {_id:id}
       
    )
    res.status(200).send({deletedItem})
} catch (error) {
    console.log(error,"dlt error----")
}
}
export default _deleteSizeChart