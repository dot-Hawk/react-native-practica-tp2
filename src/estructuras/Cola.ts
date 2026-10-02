export class Cola<T> {
  #items: (T | undefined)[] = [];
  #frenteIndex = 0;

  encolar(elemento: T): void {
    this.#items.push(elemento);
  }

  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const elemento = this.#items[this.#frenteIndex];
    this.#items[this.#frenteIndex] = undefined;
    this.#frenteIndex++;

    if (this.#frenteIndex === this.#items.length) {
      this.#items = [];
      this.#frenteIndex = 0;
    }
    return elemento;
  }

  frente(): T | undefined {
    return this.vacia ? undefined : this.#items[this.#frenteIndex];
  }

  get vacia(): boolean {
    return this.#frenteIndex >= this.#items.length;
  }

  get tamanio(): number {
    return this.#items.length - this.#frenteIndex;
  }

  aArray(): T[] {
    return this.#items.slice(this.#frenteIndex) as T[];
  }
}
