import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const webiatorSlice = createSlice({
  name: "webiator",
  initialState,
  reducers: {
    _GET_SETTINGS_DETAILS: (states, action) => {
      states.settingsData = action.payload;
    },
    _GET_SETTINGS_DETAILS_LOADING: (states, action) => {
      states.settingsDataLoading = action.payload || false;
    },
    _UPDATE_SETTINGS_DETAILS_LOADING: (states, action) => {
      if (states.updateSettingsDataLoading) {
        states.updateSettingsDataLoading[action.payload.key] =
          action.payload.loading || false;
      } else {
        states.updateSettingsDataLoading = {
          [action.payload.key]: action.payload.loading,
        };
      }
    },
    _UPDATE_SETTINGS_DETAILS: (states, action) => {
      if (states.settingsData) {
        states.settingsData[action.payload.key] = action.payload.value;
      } else {
        states.settingsData = {
          [action.payload.key]: action.payload.value,
        };
      }
    },
    _DASHBOARD_PAGE_BANNER: (states, action) => {
      states.dashboardPageBannerSuccessErrorMessage = action.payload || null;
    },
    _SETTINGS_PAGE_BANNER: (states, action) => {
      states.settingPageBannerSuccessErrorMessage = action.payload || null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  _GET_SETTINGS_DETAILS,
  _GET_SETTINGS_DETAILS_LOADING,
  _UPDATE_SETTINGS_DETAILS,
  _UPDATE_SETTINGS_DETAILS_LOADING,
  _DASHBOARD_PAGE_BANNER,
  _SETTINGS_PAGE_BANNER,
} = webiatorSlice.actions;
// Sync Products and Customers

export default webiatorSlice.reducer;
