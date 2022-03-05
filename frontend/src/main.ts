import "./todo-form";
import "./todo-list";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <todo-list>
    <todo-form></todo-form>
  </todo-list>
`;
