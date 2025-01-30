import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import "./styles/index.css";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import SubscriptionDiscountPromoModal from "./components/settings/SubscriptionDiscountPromoModal";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <AppBridgeProvider>
            <QueryProvider>
              <NavigationMenu
                navigationLinks={[
                  {
                    label: t("settings.title"),
                    destination: "/settings",
                  },
                  
                  {
                    label: t("plans.title"),
                    destination: "/plans",
                  },
                  {
                    label: "Support",
                    destination: "/support",
                  },
                  {
                    label: t("user-guide.title"),
                    destination: "/user-guide",
                  },
                ]}
              />
              <Routes pages={pages} />
            </QueryProvider>
          </AppBridgeProvider>
        </ReduxProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
