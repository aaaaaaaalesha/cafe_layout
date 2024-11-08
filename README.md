# Simple Cafe Layout

## Верстка простого сайта Кафе "Уютное место"

Необходимо сверстать сайт для кафе, используя старый стиль верстки, без применения современных возможностей CSS (
например, flexbox или grid). Используйте CSS-методы, такие как float, clear и блочные элементы.

Для выполнения этого задания вам потребуется [загрузить файл с макетом figma](design.fig).

### Верстка HTML

- [x] Создайте блок с `id="wrapper"`
- [x] Размести внутри блоки с `id="header"`, `id="main"`, `id="footer"`
- [x] Внутри блока с `id="header"` разместите элементы `h1` и `p` с названием и описанием кафе.
- [x] Внутри блока с `id="main"` разместите блоки `id="about"`, `id="content"`, `id="sidebar"`
- [x] Внутри блока с `id="about"` разместите информацию блока "О нас" из макета.
- [x] Внутри блока с `id="content"` разместите заголовок меню в элементе `h2`, а так же карточки позиций меню согласно
  макету.
- [x] Задайте им класс `card`
- [x] Для названия позиции используйте элемент `h3`
- [x] Внутри блока с `id="sidebar"` разместите дополнительную информацию о кафе. Для названия раздела используйте `h2`.
  Для текста `Адрес` и `Телефон` используйте тег `strong`
- [x] Для разделов `График работы` и `Социальные сети` используйте неупорядоченный список `ul`
- [x] Внутри блока с `id="footer"` разместите информацию о копирайте.

### Стили. Общее

Внимательно изучите макет. Обратите внимание на:

- [x] Цвет фона вокруг `#wrapper`
- [x] Внутренние отступы блоков
- [x] Отсутствие отступа снизу после последнего элемента
- [x] Отступы между разделами в блоке `#sidebar`

#### Необходимо задать общие стили:

- [x] для всех элементов - `box-sizing: border-box;`
- [x] для `body` - внешние и внутренние отступы `0`
- [x] для `заголовка второго уровня` - внешние отступы со всех сторон `0`, внешний отступ снизу `18px`
- [x] для параграфа `p` - внешние отступы `0`
- Для выравнивания элементов используйте свойство `float`.

#### Стилизация элементов

- [x] Задайте фиксированный размер для `#wrapper` равный `1200px`
- [x] С помощью автоматического отступа поместите `#wrapper` по центру, не забудьте установить цвет и внутренний отступ.
- [x] Напишите стили для `#header` согласно макету. Не забудьте задать размер шрифта для названия и описания кафе
- [x] Задайте отступ для `#main`
- [x] Задайте стили для блока `О нас`. Не забудьте убрать отступ снизу для описания.
- [x] Приступайте к стилизации блока `#main`. Еще раз обратите внимание на отступы, размеры и цвет шрифта.
- [x] Стилизуйте раздел `#sidebar`. Цвет для ссылок указывать не нужно.
- [x] Стилизуйте `#footer`, обратите внимание на пустой элемент `Space` в макете, вы должны добавить внешний отступ
  для `#footer`, а не создавать дополнительный элемент.
