# Dazzlink

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

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