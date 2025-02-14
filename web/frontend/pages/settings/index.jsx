import { Frame, Grid, MediaCard, Page } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import FirstAppSeting from "../../components/settings/FirstAppSeting";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Frame>
      
        <FirstAppSeting />
      
    </Frame>
  );
}
