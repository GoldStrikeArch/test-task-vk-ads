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
import { auth, logout } from "../firebase";
import TodoList from "./TodoList";

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  if (!user) {
    window.location.assign("/login");
    return null;
  }

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout header={<PanelHeader separator={false} />}>
            <SplitCol autoSpaced>
              <View activePanel="main">
                <Panel id="main">
                  <PanelHeader>VK Ads Test Task</PanelHeader>
                  <Group
                    header={
                      <Header mode="secondary">
                        {user.email} with id {user.uid}
                      </Header>
                    }
                  >
                    <TodoList user={user} />
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
};

export default App;
