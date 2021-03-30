# Бот для игры Рабы ВКонтакте (Node.js >= 15)
1. Бот был написан всего за 4 часа, поэтому пинать за код меня не надо.
2. Бот рассчитан на людей, которые в принципе не хотят разбираться в Node.js, но хотят получить выгоду как можно быстрее.
3. Переписывать код я не намерен, потому что игра всего лишь хайп и скоро о ней все забудут, а пока что, у нас есть возможность пиариться в ТОПе :) (с моим ботом это возможно)

## Обновление 2.1 + DLC build 038 (фиксы)
1. Добавлены авто-оковы (параметр ocow в config.js) / ocow: 1 - включить, ocow: 0 - выключить
2. Добавлен рандомайзер времени между действиями, необходимые параметры (min_delay и max_delay) настраиваются в миллисекундах. 1000 мс = 1 сек. Рекомендуется не менять значения, если не уверены, что их нужно менять.
3. Добавлен обход античита и необходимые заголовки.
4. Добавлен заголовок sec-fetch-site.
5. Вынесены названия работ в конфиг, которые можно установить пользователю. Менять можно как вам угодно (добавлять или удалять фразы можно).
6. Пофикшено зависание бота, а так же межгалактическая скорость покупки пользователей (мог прилетать бан на 2 часа).

### DLC build 038
Новый мод (mode 3) будет релизнут сегодня вечером, он быстрее, лучше, стабильнее. Посмотрим что получится, а пока что обновляемся!


*В ближайшее время попробую повысить производительность и скорость работы, а цель этого бота - безопасность.*

## Что умеет бот?
1. Имеет несколько режимов работы (моды), ниже будут описаны эти режимы.
2. Автоматически ищет пользователей по самой выгодной и доступной цене (диапазон вы настраиваете сами) (mode 2).
3. Скупает все страницы в заданном диапазоне (mode 1). Самый бесполезный мод по сути, но в будущем может доработаю.
4. Очень быстро скупает страницы методом быстрой проверки случайных пользователей (mode 3)(max_delay: 4440)
5. Максимально не палится, работает в "тихом режиме". Вы не словите бан, если будете придерживаться рекомендуемой задержки (min_delay & max_delay)

## Установка
Для начала вам нужно установить Node.js актуальной версии. Скачать можно с официального сайта [NodeJS](https://nodejs.org/en/download/current/).

После того, как вы установили Node.js на свой компьютер, вы можете приступать к работе. 

1. Создайте на диске C или D папку с именем **slave**
2. Откройте командную строку (cmd.exe)
3. Введите команду: `cd /slave` (это сработает, если вы разместили папку на диске C, в противном случае вам нужно ввести `cd D:/slave`)

**Теперь нам нужно установить все необходимые пакеты NPM**, для этого введите следующую команду:

	npm init -y
    
Это создаст зависимости для наших node_modules, а теперь устанавливаем модуль:

	npm i got nedb
    
Готово! Теперь скачиваем **slave.js** и **config.js** в папку **slave**, для удобства можете воспользоваться Git.

## Первый запуск
Чтобы запустить бота, необходимо получить ключ авторизации (Bearer). К сожалению, в этой версии бота вы не сможете автоматически получить ключ, поэтому вам придется его самостоятельно взять. 

1. Зайдите в приложение с вашего ПК (https://m.vk.com/app7794757)
2. Нажмите правой кнопкой мыши по странице.
3. Нажмите "Посмотреть код"
4. Сверху увидите табы: Elements, Console, Network
5. Нажмите на таб Network
6. Теперь нажмите на любого раба, который у вас имеется.
7. Вы увидите, как в нижней форме добавился элемент **user?id=**
8. Кликаем по нему, справа будет открыта вкладка Headers
9. Опускаемся ниже и ищем Request Headers
10. Ищем строку **authorization:**
11. Копируем полностью строку, кроме authorization:.
12. Вставляем полученное в config.js, а точнее в строку auth (там будет написано Bearer)

Если не получилось, то пишите мне в Telegram: **@exiesman**

### Последний шаг
Откройте командную строку, где вы до этого устанавливали npm пакет (вы должны находиться в папке slave) и введите: 
	
	node slave

Все! Наслаждаемся :D

*Бот будет обновляться, если будет пользоваться популярностью*
