import { useCollection } from "react-firebase-hooks/firestore";
import { Todo, firebaseApp, todosCollection } from "../firebase";
import { Fragment } from "react";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  getFirestore,
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
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebaseApp), "todos/" + user.uid + "/list"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
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
