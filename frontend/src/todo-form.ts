import { css, html, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";

@customElement("todo-form")
export class TodoForm extends LitElement {
  static styles = css``;

  protected render() {
    return html`
      <div>
        <input
          type="text"
          @input=${this._inputChanged}
          placeholder="해야할 일을 적어주세요"
        />
        <button @click=${this._createTodo} .disabled=${!this._submitEnabled}>
          추가
        </button>
      </div>
    `;
  }

  @state()
  _submitEnabled = false;
  @query("input")
  _input!: HTMLInputElement;

  private _inputChanged(e: Event) {
    this._submitEnabled = !!(e.target as HTMLInputElement).value;
  }

  private _createTodo() {
    fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: this._input.value,
      }),
    }).then(() => {
      this._input.value = "";
      this._submitEnabled = false;
      this.dispatchEvent(
        new CustomEvent("created", {
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}
