import { Button, Cell } from "@vkontakte/vkui";
import type { Todo } from "../firebase";

type Props = Todo;
const TodoItem = ({ text, id }: Props) => {
  return (
    <>
      <Cell>{text}</Cell>
      <Button onClick={() => console.log(id)}>Remove</Button>
    </>
  );
};

export default TodoItem;
