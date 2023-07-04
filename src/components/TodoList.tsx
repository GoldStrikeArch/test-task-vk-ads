import { useCollection } from "react-firebase-hooks/firestore";
import { Todo, firebaseApp, todosCollection } from "../firebase";
import { Fragment } from "react";
import { collection, getFirestore } from "firebase/firestore";
import { reactify } from "svelte-preprocess-react";
import TodoListSvelte from "./TodoList.svelte";

const List = reactify(TodoListSvelte);

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
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            Collection:{" "}
            <List
              todos={(value.docs.map((d) => d.data()) as unknown) as Todo[]}
            />
          </span>
        )}
      </p>
    </div>
  );
};

export default TodoList;
