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
ng new dazzlink -> ng build --output-path docs --base-href /dazzlink/ -> create a new repository on github -> git init -> git remote add origin https://github.com/6Vovchan9/dazzlink.git -> git add . -> git commit -m "Project is added to github" -> git push -u origin develop -> далее на сайте github переходим в github pages настраиваем там Source.

И далее если хотим увидеть свежие изм в github pages то перед тем как пушить изм надо пересобрать проект при помощи команды "ng build ..."