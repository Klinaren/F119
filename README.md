# The Walking Dead: The Telltale Definitive Series - Manager

## Opis projektu
Aplikacja webowa do zarządzania bazą danych sezonów i odcinków gry Telltale's The Walking Dead. Projekt wykonany w architekturze MVC.

## Funkcjonalności
* **CRUD Sezonów:** Dodawanie, edycja, usuwanie i przeglądanie sezonów.
* **CRUD Odcinków:** Zarządzanie odcinkami wewnątrz konkretnego sezonu.
* **Filtracja:** Wyszukiwanie sezonów po nazwie, statusie i minimalnej ocenie.
* **Sortowanie:** Sortowanie wyników po dacie wydania oraz ocenie (DESC/ASC).
* **Walidacja:** Pełna walidacja danych wejściowych po stronie serwera.
* **Responsive Design:** Interfejs dostosowany do urządzeń mobilnych.

## Technologie
* **Backend:** Node.js, Express.js
* **Frontend:** EJS (Embedded JavaScript templates), CSS3
* **Middleware:** Method-override (obsługa PUT/DELETE), Express.static

## Lista Endpointów
* `GET /` - Strona główna z filtracją
* `GET /season/:id` - Szczegóły sezonu i lista odcinków
* `GET /admin/seasons` - Panel zarządzania sezonami
* `POST /admin/seasons` - Tworzenie nowego sezonu
* `PUT /admin/seasons/:id` - Aktualizacja sezonu
* `DELETE /admin/seasons/:id` - Usunięcie sezonu

## Instrukcja instalacji
1. Sklonuj repozytorium.
2. Wykonaj `npm install`.
3. Uruchom aplikację komendą `npm start`.
4. Aplikacja dostępna pod adresem `http://localhost:3000`.

## Autorzy
* Vitalii Lehenkyi (Grupa: [1], Numer: [19])

## Licencja
Projekt udostępniony na licencji MIT.
