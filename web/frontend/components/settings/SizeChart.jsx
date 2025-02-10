import { useState, useEffect } from "react";
import { Card, DataTable } from "@shopify/polaris";
import axios from "axios";

const SizeChart = () => {
  const [sizeData, setSizeData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sizechart")
      .then((response) => setSizeData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Convert MongoDB data into format suitable for Polaris DataTable
  const rows = sizeData.map((item) => [item.size, item.chest, item.waist, item.hips]);

  return (
    <Card title="Size Chart" sectioned>
      <DataTable
        columnContentTypes={["text", "text", "text", "text"]}
        headings={["Size", "Chest", "Waist", "Hips"]}
        rows={rows}
      />
    </Card>
  );
};

export default SizeChart;
