import Sizecharts from "../../models/sizeChartModal.js";

const _addNewSizeChart = async(req , res)=>{
    try {
    const sizeChartData = req.body
    console.log(sizeChartData,"size char data-----")
    
    await Sizecharts.create({
        store_domain: res.locals.shopify.session.shop,
         
        Title : sizeChartData.Title,
        Product : sizeChartData.Product,
        Collection : sizeChartData.Collection,
        Image: sizeChartData.Image

      });
    console.log(sizeChartData," sizeChartData---")
    res.status(200).send({success:true,sizeChartData})
} catch (error) {
    console.log(error,"errorrr-----")
}
}

export default _addNewSizeChart;