import { useCollection } from "react-firebase-hooks/firestore";
import { Todo, getTodosCollection } from "../firebase";
import { Fragment, useState } from "react";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { reactify } from "svelte-preprocess-react";
import TodoListSvelte from "./TodoList.svelte";

const List = reactify(TodoListSvelte);

const getTodos = (docs: QueryDocumentSnapshot<DocumentData>[]) =>
  docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Todo[];

type Props = {
  user: {
    uid: string;
  };
};
const TodoList = ({ user }: Props) => {
  const [text, setText] = useState("");
  const todosCollection = getTodosCollection(user.uid);
  const [value, loading, error] = useCollection(
    query(todosCollection, orderBy("createdAt")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const handleCreate = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!text.trim()) return;

    await addDoc(todosCollection, {
      text: text.trim(),
      createdAt: Date.now(),
    });

    setText("");
  };

  return (
    <div>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleCreate}
        />
        {/* {error && <strong>Error: {JSON.stringify(error)}</strong>} */}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            Todos: <List todos={getTodos(value.docs)} />
          </span>
        )}
      </div>
    </div>
  );
};

export default TodoList;
