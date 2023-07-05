import { Button, Cell } from "@vkontakte/vkui";
import type { Todo } from "../firebase";
import { deleteDoc, doc, documentId, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebaseApp, getTodoDoc, getTodosCollection } from "../firebase";

type Props = Todo;
const TodoItem = ({ text, id }: Props) => {
  const [user] = useAuthState(auth);

  const docRef = getTodoDoc(user!.uid, id);

  const handleClick = async () => {
    await deleteDoc(docRef);
  };
  return (
    <>
      <Cell>{text}</Cell>
      <Button onClick={handleClick}>Remove</Button>
    </>
  );
};

export default TodoItem;
