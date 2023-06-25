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

const App = () => {
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
