import Sizecharts from "../../models/sizeChartModal.js"

const _UpdateSizeChart = async (req,res)=>{
try {
    // const UpdateSizeChartList = await Sizecharts.findOne(
    //     store_domain = res.locals.shopify.session.shop

    // )


    const {_id,Title,Product,Collection,Image,Checked} = req.body
    console.log(req.body,"list item---")
    const updatedItems = await Sizecharts.findByIdAndUpdate(
        {_id:_id},
    {
        Title :Title,
        Product :Product,
        Collection :Collection,
        Image : Image,
        Checked :Checked,
    }
          
    )
    res.status(200).send({updatedItems})
} catch (error) {
    console.log(error,"updateSizeChart error----")
}
}
export default _UpdateSizeChart