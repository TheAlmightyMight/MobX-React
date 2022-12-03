import { injectStores } from "@mobx-devtools/tools";
import TodoStore from "./Store/TodoStore";

injectStores({
  TodoStore,
});

export { TodoStore };
