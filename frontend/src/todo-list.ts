import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("todo-list")
export class TodoList extends LitElement {
  static styles = css``;

  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  @property({ type: Array })
  todos: any[] = [];

  protected render() {
    return html`
      <p @created=${this._createHandler}><slot></slot></p>
      ${this.todos.map(
        (todo) => html`
          <input
            type="checkbox"
            ?checked=${todo.completed}
            @change=${this._updateHandler}
            key=${todo.id}
          />
          <span>${todo.description}</span>
          <button @click=${this._deleteHandler} key=${todo.id}>X</button>
        `
      )}
    `;
  }

  private _createHandler() {
    this._fetchData();
  }

  private _updateHandler(e: Event) {
    const key = (e.target as HTMLButtonElement).getAttribute("key")!;
    fetch(`/api/todo/${key}`, {
      method: "PUT",
    });
  }

  private _deleteHandler(e: Event) {
    const key = (e.target as HTMLButtonElement).getAttribute("key")!;
    fetch(`/api/todo/${key}`, {
      method: "DELETE",
    }).then(() => {
      this._fetchData();
    });
  }

  private _fetchData() {
    fetch("/api/todo")
      .then((response) => response.json())
      .then((todos) => {
        this.todos = todos;
      });
  }
}
