import { Cell } from "@vkontakte/vkui";

const TodoItem = ({ text }: { text: string }) => {
  return <Cell>{text}</Cell>;
};

export default TodoItem;
