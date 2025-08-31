# 🌬️ Tailwind CSS — Guia Rápido

## Instalação com Vite

📖 [Docs oficiais](https://tailwindcss.com/docs/installation/using-vite)

```bash
npm install tailwindcss @tailwindcss/vite
```

### Exemplo: `index.css`

```css
/* necessário para tailwind funcionar */
@import 'tailwindcss';

/* configuração customizada */
@theme {
  --color-gray-100: #1f2523;
  --color-gray-200: #4d5c57;
  --color-gray-300: #cdd5d2;
  --color-gray-400: #e4ece9;
  --color-gray-500: #f9fbfa;

  --color-green-100: #1f8459;
  --color-green-200: #2cb178;
}
```

---

## Como funciona

- Utiliza **classes utilitárias** no HTML/JSX.
- Classes são **composições atômicas** → cada uma aplica um estilo.
- Evita escrever CSS manual repetitivo.

---

## ⚡ Exemplos básicos

### 1. Botão

```jsx
<button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
  Clique aqui
</button>
```

### 2. Container centralizado

```html
<div class="flex items-center justify-center h-screen bg-gray-100">
  <p class="text-xl font-bold text-gray-800">Hello Tailwind</p>
</div>
```

### 3. Card simples

```html
<div class="max-w-sm p-6 bg-white rounded-xl shadow-md">
  <h2 class="text-lg font-semibold text-gray-900">Título</h2>
  <p class="mt-2 text-gray-600">Conteúdo do card...</p>
</div>
```

---

## Classes mais usadas (cola rápida)

### 🎨 Cores

- `bg-gray-100` → fundo cinza claro
- `bg-green-500` → fundo verde
- `text-white`, `text-gray-800` → cor do texto
- `border-gray-300` → cor da borda

### 🏗️ Layout

- `container` → largura máxima centralizada
- `flex`, `grid` → layouts flexíveis
- `items-center`, `justify-center` → alinhamento

### 📏 Espaçamento

- `p-4` → padding
- `m-2` → margin
- `px-4 py-2` → padding X e Y

### 🔠 Texto

- `text-sm`, `text-lg`, `text-xl`, `text-2xl`
- `font-bold`, `font-medium`, `font-light`
- `text-center`, `text-left`

### ⬜ Bordas

- `rounded`, `rounded-lg`, `rounded-full`
- `border`, `border-2`, `border-gray-300`

### ✨ Outros

- `shadow`, `shadow-md`, `shadow-lg`
- `hover:bg-green-600` → hover state
- `transition`, `duration-200` → animações suaves

---

## 💡 Dica

- Combine com **clsx** para classes condicionais.
- Use `@theme` para definir paleta personalizada.
- Para **limpeza de classes repetidas no Tailwind**, use [`tailwind-merge`](https://github.com/dcastil/tailwind-merge).

---

# clsx — Guia Rápido

Pequena lib para construir **strings de classes CSS de forma condicional**.
Funciona em **React, Vue, Angular ou qualquer projeto JS**.

---

## Instalação

```bash
npm i clsx
# ou
yarn add clsx
```

---

## ⚡ Como usar

A função `clsx(...args)` aceita:

- **strings** → adiciona direto
- **objetos** → `{ classe: condicao }`
- **arrays** → combina todas as classes
- **falsy values** (`null`, `undefined`, `false`, `0`) → são ignorados

---

## Exemplos

### 1. Básico

```jsx
import clsx from 'clsx';

const Button = () => {
  const buttonClasses = clsx('btn', 'btn-primary');
  // "btn btn-primary"
  return <button className={buttonClasses}>Clique Aqui</button>;
};
```

---

### 2. Condicional com objeto

```jsx
import clsx from 'clsx';

const isLoading = true;
const hasError = false;

const myClasses = clsx({
  'text-blue': true,
  'font-bold': isLoading, // true → inclui
  'border-red': hasError, // false → ignora
});

// "text-blue font-bold"
```

---

### 3. Misturando tudo

```jsx
import clsx from 'clsx';

const isActive = true;
const customClass = 'mt-4';

const containerClasses = clsx(
  'container',
  ['p-4', 'shadow-md'],
  { 'bg-gray-100': isActive },
  customClass,
  isActive && 'border-green-500',
);

// "container p-4 shadow-md bg-gray-100 mt-4 border-green-500"
```

---

## 💡 Dica Extra

- Com **Tailwind**, use junto com [tailwind-merge](https://github.com/dcastil/tailwind-merge) para evitar conflitos de classes.

---

Boa! 🚀 Seguindo o estilo do guia que você já montou, vou adicionar a sessão sobre **Axios** com instalação, exemplos básicos e dicas de uso.

---

Perfeito 😃 vou adicionar a sessão **Axios + React Hooks** ao guia, no mesmo estilo prático que você já montou:

---

# ⚛️ Axios + React Hooks

Exemplo de como consumir **APIs** diretamente dentro de componentes React usando **`useEffect`** e **`useState`**.

## Instalação

```bash
npm install axios
# ou
yarn add axios
```

---

## 1. GET com `useEffect`

```jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Erro ao carregar usuários:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <ul className="p-4">
      {users.map((user) => (
        <li key={user.id} className="border-b py-2">
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}
```

---

## 2. POST com formulário

```jsx
import { useState } from 'react';
import axios from 'axios';

export default function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/users', {
        name,
        email,
      });
      console.log('Usuário criado:', res.data);
      alert('Usuário criado com sucesso!');
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Criar Usuário
      </button>
    </form>
  );
}
```

---
