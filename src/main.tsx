import { persistStore } from "redux-persist";
import { Navigation } from "react-native-navigation";
import { Platform, AsyncStorage } from "react-native";
import store from "./store";
import { Provider} from "react-redux";
import thunk from "redux-thunk";
import * as SI from "seamless-immutable";
import * as actions from "./actions/global_actions";
import reducers from "./reducers";
import { registerScreens } from "./config/register_screens";
import { LOGIN_CONFIG, TAB_CONFIG } from "./config/screen_config";

if (__DEV__) {
  // __DEV__ is set as an env variable when running in on simulator.
  console.log("Development mode in simulator");
};

// Set up store
const persistor = persistStore(store, {storage: AsyncStorage});

// Register screens
registerScreens(store, Provider);

export default class App {

 private currentRoot: string;
 private root: string;

  constructor() {
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(actions.appInitialized());
  }

  private onStoreUpdate(): void {
    const {root} = store.getState().app;

    if (this.currentRoot !== root ) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  private startApp(root: string): any {
    /*
      React Native Navigation library requires sarting an app based on a specific type of naviation 
    */
    switch (root) {
      case "login":
        Navigation.startSingleScreenApp(LOGIN_CONFIG);
        return;
      case "after-login":
        Navigation.startSingleScreenApp(LOGIN_CONFIG);
        return;
      default:
        console.error("Unknown app root");
    }
  }
}


