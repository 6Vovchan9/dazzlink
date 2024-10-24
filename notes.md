## Github pages

How to host angular app on github:
ng new dazzlink -> удаляем ранее созданный бандл, если есть (/dist или /docs) -> ng build --output-path docs --base-href /dazzlink/ -> create a new repository on github -> git init -> git remote add origin https://github.com/6Vovchan9/dazzlink.git -> git add . -> git commit -m "Project is added to github" -> git push -u origin develop -> далее на сайте github переходим в github pages настраиваем там Source.

И далее если хотим увидеть свежие изм в github pages то перед тем как пушить изм надо пересобрать проект при помощи команды "ng build ..."


## http-server

Чтоб протестировать собранное приложение (запустить файл index.html из папки docs) глобально должен быть установлен пакет npm install -g http-server далее удаляем ранее созданный бандл, если есть (/dist или /docs) -> собираем проект npm run build -> переходим в папку где лежит файл index.html (cd Desktop/myProject/dist/myProject/) и запускаем локальный сервер http-server -p 4200


## "overflow: hidden" у body

Из-за того что body не растягивается под ширину контента, а занимает максимум высоту окна, при свайпе на мобиле в крайних точках присутствует неприятный эффект, если не менять layout, то данную проблему можно решить добавление "overflow: hidden" у body, но тогда мы лишимся возможности обновлять страницу свайпом вниз


## firebase hosting

Глобально должен быть установлен пакет npm install -g firebase-tools, далее firebase login -> firebase init -> удаляем ранее созданный бандл, если есть (/dist или /docs) -> собираем проект ng build --output-path docs -> firebase deploy (эта инструкция есть на https://firebase.google.com и у Владилен Минин на ютубе видео от 5.12.23)


## svg-spinners 

множество спиннеров (загрузчиков) тут https://github.com/n3r4zzurr0/svg-spinners


## telegram bot

For a description of the Bot API, see this page: https://core.telegram.org/bots/api и небольшая инструкция у Владилен Минин на ютубе видео от 5.12.23.
Базовый тг бот: t.me/TgDazzlinkMyBot


## Angular v15 -> v16

Выяснил, что при переходе на 16 версию на старый устройствах ios (например версия ПО 14.7.1) сайт не открывается (отображается белый экран), в результате анализа пришел к выводу, что такая проблема возникает
1) при переходе es2020 -> ES2022 в файле tsconfig.json
2) при использовании кастомных NgModel-ей, а именно при регистрации сервиса таким образом providers: [{provide: NG_VALUE_ACCESSOR, ...}] (например AccoTriggerComponent, DropdownFieldModule, RadiobuttonFieldModule)

UPD: Такая фигня наблюдается только в dev mode (при открытии страницы через http://192.168.1.137:4200), при деплое на хостинг страница норм открывается даже на старых устройствах


## IntersectionObserver

При помощи этого API можно:
1) подсветить активный пункт меню при скролле страницы
2) запустить/остановить видео на странице при скролле
3) подгружать картинки при по мере их видимости на странице (через data-href атрибут)
4) реализовать бесконечный скролл (запрос/обращение на бэк за доп данными когда пролистали все имеющиеся)

Как это работает у нас...Каждый раз когда верх или низ любой #section касается верха окна .rootMargin (это аналог optionsForObserver который передается 2-м аргументом в конструктор IntersectionObserver) срабатывает колбэк переданный первым первым аргументом


## progressive jpg

Можно реализовать собственный прогрессивный загрузчик изображений как я это сделал в home-page.component по инструкции https://www.internet-technologies.ru/articles/kak-sozdat-sobstvennyy-progressivnyy-zagruzchik-izobrazheniy.html или сделать изображение прогрессивным:
1) устанавливаем менеджер недостающих пакетов для macOS - "Homebrew", командой /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
2) устанавливаем утилиту brew install imagemagick
3) преобразуем конкретный файл в прогрессив convert example.jpg -interlace plane result.jpg
Проверить является ли jpg прогрессивным можно тут https://www.thewebmaster.com/progressive-jpeg-tester/


## Сниппет

Сниппеты — небольшие отрывки веб-страниц, которые поисковики выдают в результатах поиска.
Sitemap — это файл со ссылками на страницы сайта, который сообщает поисковым системам об актуальной структуре сайта.
robots.txt - нужен для того чтобы задать правила, которые запрещают поисковым роботам сканировать определенные разделы и страницы сайта.
Schema.org предоставляет общедоступный словарь, с помощью которого вебмастера могут размечать страницы, так чтобы они были понятны самым распространенным поисковым системам: Яндексу, Google, Microsoft и Yahoo!.
Документацию по Google Поиску https://developers.google.com/search/docs?hl=ru.
Яндекс Вебмастер – сервис поисковой оптимизации https://webmaster.yandex.ru/.


## Open Graph

Pазметка Open Graph отвечает за привлекательный вид репостов страниц сайта в соцсетях. Подробнее про og тут https://habr.com/ru/companies/click/articles/492258/. Как обновить отображение ссылки в Telegram, Facebook, Twitter, Вконтакте? Смотри тут https://tilda.cc/ru/answers/a/links-preview-update/


## Google аналитика

На самом деле script с гугл аналитикой можно было не подключать в index.html, можно было связать аналитику с проектом через gtm, тоже самое касается скрипта amplitude


## Глобальные объекты в Angular

Фреймворк Angular кроссплатформенный, что означает, что он может работать в различных окружениях, таких как мобильные устройства и серверы. Приложение Angular может быть запущено на сервере с использованием техники Server Side Rendering (SSR). Когда мы используем SSR в Angular, объект window отсутствует. Он доступен только в среде браузера. Чтобы преодолеть эту проблему и сделать наше приложение платформенно независимым, нам необходимо предоставить объект window через механизм внедрения зависимостей Angular.

Поэтому к глобальным объектам, таким как window, navigator, document и тд, правильней обращаться через инъекцию токенов, а не напрямую (document.activeElement, document, window или navigator).

https://habr.com/ru/companies/tbank/articles/548510/


## IndexedDB

Для работы с IndexedDB я использую библиотеку idb. Вместо обычного пакета npm install idb использую @tempfix/idb потому что на данный момент он ругается на версию typescript (ему вроде требуется 5.2.2), а не 5.4.2 как сейчас. Будем надеяться что в след версии idb эту проблему пофиксят и можно будет установить оригинальный пакет.
https://github.com/jakearchibald/idb/issues/311