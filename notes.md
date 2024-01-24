## Github pages

How to host angular app on github:
ng new dazzlink -> удаляем ранее созданный бандл, если есть (/dist или /docs) -> ng build --output-path docs --base-href /dazzlink/ -> create a new repository on github -> git init -> git remote add origin https://github.com/6Vovchan9/dazzlink.git -> git add . -> git commit -m "Project is added to github" -> git push -u origin develop -> далее на сайте github переходим в github pages настраиваем там Source.

И далее если хотим увидеть свежие изм в github pages то перед тем как пушить изм надо пересобрать проект при помощи команды "ng build ..."

## http-server

Чтоб протестировать собранное приложение (запустить файл index.html из папки docs) глобально должен быть установлен пакет npm install -g http-server далее удаляем ранее созданный бандл, если есть (/dist или /docs) -> собираем проект npm run build -> переходим в папку где лежит файл index.html (cd Desktop/myProject/dist/myProject/) и запускаем локальный сервер http-server -p 4200

## firebase hosting

Глобально должен быть установлен пакет npm install -g firebase-tools, далее firebase login -> firebase init -> удаляем ранее созданный бандл, если есть (/dist или /docs) -> собираем проект ng build --output-path docs -> firebase deploy (эта инструкция есть на https://firebase.google.com и у Владилен Минин на ютубе видео от 5.12.23)

## svg-spinners 

множество спиннеров (загрузчиков) тут https://github.com/n3r4zzurr0/svg-spinners

## telegram bot

For a description of the Bot API, see this page: https://core.telegram.org/bots/api и небольшая инструкция у Владилен Минин на ютубе видео от 5.12.23.
Базовый тг бот: t.me/TgDazzlinkMyBot

## Angular v15 -> v16

Выяснил, что при переходе на 16 версию на старый устройствах ios (например версия ПО 14.7.1) сайт не открывается (отображается белый экран), в результате анализа пришел к выводу, что такая проблема возникает при использовании кастомных NgModel-ей, а именно при регистрации сервиса таким образом providers: [{provide: NG_VALUE_ACCESSOR, ...}] (например AccoTriggerComponent, DropdownFieldModule, RadiobuttonFieldModule)