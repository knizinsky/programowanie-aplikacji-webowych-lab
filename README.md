# 🛠️ ManagMe – Aplikacja do zarządzania projektami

ManagMe to rozbudowana aplikacja CRUD stworzona w Angularze z wykorzystaniem Supabase, Angular Material oraz Puppeteera do testów end-to-end. Projekt ma na celu praktyczne zastosowanie TypeScriptu, komponentowego podejścia w Angularze oraz architektury opartej na mockowanych danych, a następnie przejście do prawdziwej bazy danych.

## 📦 Technologie

* [Angular](https://angular.io/)
* [Supabase](https://supabase.com/)
* [Angular Material](https://material.angular.io/)
* [Puppeteer](https://pptr.dev/) – testy E2E
* Vite (dev serwer)
* TypeScript

## 🚀 Funkcjonalności

### ✅ Projekty (CRUD)

* Tworzenie, edycja, usuwanie i wyświetlanie projektów.
* Dane zapisywane przez API Supabase.
* Wybór aktywnego projektu, który filtruje resztę danych.

### 👤 Użytkownicy

* Mock zalogowanego użytkownika.
* Lista użytkowników z rolami: `admin`, `devops`, `developer`.
* Obsługa ról i przypisywania zadań tylko devops/developerowi.

### 🧩 Historyjki (funkcjonalności)

* CRUD dla historyjek związanych z projektami.
* Priorytetyzacja i filtrowanie wg statusu: `todo`, `doing`, `done`.

### 🧱 Zadania

* Najmniejsza jednostka w aplikacji – przypisana do historyjki.
* CRUD + szczegółowy widok zadania.
* Obsługa przypisywania użytkowników, zmiana statusów i automatyczne daty.
* Widok tablicy Kanban (`todo`, `doing`, `done`).

### 🔐 Logowanie

* Formularz logowania (login + hasło).
* API zwraca JWT i refreshToken.
* Ochrona endpointów na podstawie tokenu.

## 🗃️ Baza danych

* **Supabase** (PostgreSQL / NoSQL-like struktura).
* Klasy komunikujące się z bazą danych w warstwie serwisów.

## 🧪 Testy E2E

Z wykorzystaniem Puppeteera:

* Dodawanie/edycja/usuwanie projektu, historyjek, zadań.
* Zmiany statusów zadań.
* Walidacja poprawnego działania UI.

## 🎨 UI/UX

* UI oparte na Angular Material.
* Tryb jasny/ciemny (przełącznik + obsługa preferencji systemowych).
* Responsive design.

## 🛠️ Instalacja

```bash
npm install
npm run dev
```

## ⚙️ Uruchomienie testów

```bash
npm run test:e2e
```

## 🧠 Inspiracje / Zasoby

* [Supabase Docs](https://supabase.com/docs)
* [Angular Material](https://material.angular.io/components/categories)
* [Puppeteer API](https://pptr.dev/api/)

---

Jeśli chcesz, mogę też dodać `CONTRIBUTING.md`, `.env.example` albo `scripts` do `package.json`.
