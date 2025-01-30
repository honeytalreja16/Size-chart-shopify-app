import {
  _GET_SETTINGS_DETAILS,
  _GET_SETTINGS_DETAILS_LOADING,
  _UPDATE_SETTINGS_DETAILS,
  _UPDATE_SETTINGS_DETAILS_LOADING,
  _DASHBOARD_PAGE_BANNER,
  _SETTINGS_PAGE_BANNER,
} from "../reducers/webiatorSlice";

export const _dispatch_GET_SETTINGS_DETAILS =
  ({ fetchFn, navigateFn }) =>
  async (dispatch) => {
    try {
      dispatch(_GET_SETTINGS_DETAILS_LOADING(true));

      const data = await fetchFn("/api/store-details");
      const dataJSON = await data.json();

      if (dataJSON.error) {
        throw new Error(dataJSON.error);
      }
      dispatch(_GET_SETTINGS_DETAILS(dataJSON));
      dispatch(_GET_SETTINGS_DETAILS_LOADING(false));
    } catch (error) {
      dispatch(_GET_SETTINGS_DETAILS_LOADING(false));
    }
  };

export const _dispatch_UPDATE_SETTINGS_DETAILS =
  ({ fetchFn, inputs }) =>
  async (dispatch) => {
    try {
      if (!inputs) {
        throw new Error("Invalid operation performed");
      }

      dispatch(
        _UPDATE_SETTINGS_DETAILS_LOADING({
          key: inputs?.loadingKey,
          loading: true,
        })
      );
      const data = await fetchFn("/api/store-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const dataJSON = await data.json();
      if (dataJSON.error) {
        throw new Error(dataJSON.error);
      }

      let keys = Object.keys(inputs || {});
      for (var i = 0; i < keys.length; i++) {
        let value = dataJSON[keys[i]];

        if (value !== undefined) {
          dispatch(
            _UPDATE_SETTINGS_DETAILS({
              key: keys[i],
              value,
            })
          );
        }
      }
      if (inputs.type === "settings-data") {
        dispatch(
          _DASHBOARD_PAGE_BANNER({
            message: dataJSON.message || "Updated.",
            status: "success",
          })
        );
      }

      dispatch(
        _UPDATE_SETTINGS_DETAILS_LOADING({
          key: inputs?.loadingKey,
          loading: false,
        })
      );
    } catch (error) {
      dispatch(
        _UPDATE_SETTINGS_DETAILS_LOADING({
          key: inputs?.loadingKey,
          loading: false,
        })
      );

      dispatch(
        _DASHBOARD_PAGE_BANNER({
          message: "Somethings wrong. Try again",
          status: "critical",
        })
      );
    }
  };
