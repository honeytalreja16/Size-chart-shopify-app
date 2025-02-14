import Sizecharts from "../../models/sizeChartModal.js"

const _getItems = async (req, res) => {
      try {
        const sizeCharts = await Sizecharts.find({
            store_domain: res.locals.shopify.session.shop
        })
        res.status(200).send({sizeCharts})
      } catch (error) {
        
      }
    }

export default _getItems