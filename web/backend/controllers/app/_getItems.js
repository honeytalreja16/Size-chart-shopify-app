const _getItems = async (req, res) => {
        try {
            const sizeCharts = await sizeChartModel.find(); 
            res.status(200).json(sizeCharts);
        } catch (error) {
            res.status(500).json({ message: "Error fetching size charts", error });
        }
    }

