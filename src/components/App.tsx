import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, login, logout } from "../firebase";

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  console.log(user, loading, error);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  window.location.assign("/about");

  if (user) {
    return (
      <ConfigProvider>
        <AdaptivityProvider>
          <AppRoot>
            <SplitLayout header={<PanelHeader separator={false} />}>
              <SplitCol autoSpaced>
                <View activePanel="main">
                  <Panel id="main">
                    <PanelHeader>VK Ads Test Task</PanelHeader>
                    <Group header={<Header mode="secondary">Items</Header>}>
                      <SimpleCell>Hello</SimpleCell>
                      <SimpleCell>World</SimpleCell>
                      <SimpleCell>
                        <button onClick={logout}>Log out</button>
                      </SimpleCell>
                    </Group>
                  </Panel>
                </View>
              </SplitCol>
            </SplitLayout>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    );
  }

  return <button onClick={login}>Login in</button>;
};

export default App;

// // compare(string V1, string V2): int
// //
// // V1 > V2 :  1  //  1.1   > 1.0
// // V1 < V2 : -1  //  1.0.0 < 2.0
// // V1 = V2 :  0  //  1.0.0 = 1.0.0.0
// //
// // Input semi-versions:
// //  "1.0.0.0.0.0.0"
// //  "1.0.2"

// console.log('hello')

// //V1 = 1.2
// //V2 = 1.2.0.0

// // 1.2.3 1.2.3.3

const compare = (v1: string, v2: string) => {
  let str1Arr = v1.split(".");
  let str2Arr = v2.split(".");

  str1Arr.length >= str2Arr.length
    ? (str2Arr = [...str2Arr, ...Array(str1Arr.length).fill("0")])
    : (str1Arr = [...str1Arr, ...Array(str2Arr.length).fill("")]);
  // for (let i = 0; i < str1Arr.length; i++) {
  //   let num1 =
  // }
};
