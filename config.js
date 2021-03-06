module.exports = Object({
	mode: 2, //Режим работы
	mode_: {
		start_id: "331300292",     //ID страницы, которую надо ограбить в первую очередь (mode 2)
		min_buy: 40,      //минимальная сумма, которую вы готовы отдать за человека (mode 2)
		max_buy: 590000,        //максимальная сумма (mode 2)
		min_id: 1000,      //Покупка страниц (минимальный ID)(mode 1)
		max_id: 631111111    //Максимальный ID (рекомендуется не менять) (mode 1)
	},
	jobNames: ['1', 'НЕ ВОРОВАТЬ', '❤', '💎', '😊', '🥰', '...', 'Раб', '😁', 'хахавзха', 'Не трогать!'],
	ocows: {
		ocow: 1   //Оковы (1 - включить, 0 - выключить)
	},
	min_delay: 1800,     //Минимальная задержка между действиями (рекомендуется не менять)
	max_delay: 6680,   //Максимальная задержка
	auth: "Bearer",
	prod: "https://prod-app7794757-a599a9546f70.pages-ac.vk-apps.com/",
	ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
	exception: 1     //Использовать или не использовать Debug (чтобы ловить больше ошибок, если они есть)
})