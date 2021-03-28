const path = require('path');
const http = require('https');
const fs = require('fs');
const request = require('request');
const got = require('got');
const { exec } = require('child_process');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '_> $ '
});
const cfg = require('./config.js')

let Datastore = require('nedb'),
db = new Datastore({filename: __dirname + '/accs.db', autoload: true}) 

let rand = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

let sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let insert = (obj) => {
	db.insert(obj, (err, doc) => {console.log(`[BD] ++++++++++++++++`)})
}
let removeAll = () => {
	db.remove({}, { multi: true }, (err, docs) => {console.log(docs)});
}

let slaveBuy = async (id) => {
	try {
		const {body} = await got.post("https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/buySlave", {
			responseType: "json",
			headers: {
				"authorization": cfg.auth,
				"user-agent": cfg.ua,
				"referer": cfg.prod,
				"origin": cfg.prod
			},
			json: {slave_id: id}
		})

		if(body.error)
		{
			console.log(body.error)
		}
		else
		{
			console.log('\x1b[32m%s\x1b[36m%s\x1b[0m%s', '[+]', `[${id}] `, `Пользователь добавлен`)
		}
	} catch (ex) {
		let res = ex.response.body;
		if(res.error) {
			switch (res.error.message) {
				case 'ErrFloodJob app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, теперь вы не можете нанимать на работу (ErrFloodJob)");
					break
				case 'NotYouSlave app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Похоже, что раб уже вам не пренадлежит (NotYouSlave)");
					break
				case 'ErrFloodBuy app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, теперь вы не можете покупать рабов (ErrFloodBuy)");
					break
				case 'SalveAreLocked app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Раб на цепи (SalveAreLocked)");
					break
				case 'ErrLowMoney app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Недостаточно денег либо пользователь был забаган накруткой (ErrLowMoney)");
					break
				case 'ErrFloodFetter app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, нельзя так часто сажать на цепь пользователей (ErrFloodFetter)");
					break
				case 'Invalid sign 3':
					console.log("\x1b[31m%s", "<Ошибка> Неверный Bearer, проверьте строку Auth в файле config.js (Invalid Sign)");
					break
				default: if(cfg.exception) console.log("\x1b[33m%s", res.error);
			}
		}
	}
}
let slaveJob = async (name, id) =>  {
	try {
		const {body} = await got.post("https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/jobSlave", {
			responseType: "json",
			headers: {
				"authorization": cfg.auth,
				"user-agent": cfg.ua,
				"referer": cfg.prod,
				"origin": cfg.prod
			},
			json: {name: name, slave_id: id}
		})


		if(body.error)
		{
			console.log(body.error)
		}
		else
		{
			console.log('\x1b[33m%s\x1b[36m%s\x1b[0m%s', '[+]', `[${id}] `, `Пользователь получил работу: ${name}`)
		}
	} catch (ex) {
		let res = ex.response.body;
		if(res.error) {
			switch (res.error.message) {
				case 'ErrFloodJob app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, теперь вы не можете нанимать на работу (ErrFloodJob)");
					break
				case 'NotYouSlave app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Похоже, что раб уже вам не пренадлежит (NotYouSlave)");
					break
				case 'ErrFloodBuy app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, теперь вы не можете покупать рабов (ErrFloodBuy)");
					break
				case 'SalveAreLocked app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Раб на цепи (SalveAreLocked)");
					break
				case 'ErrLowMoney app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Недостаточно денег либо пользователь был забаган накруткой (ErrLowMoney)");
					break
				case 'ErrFloodFetter app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, нельзя так часто сажать на цепь пользователей (ErrFloodFetter)");
					break
				default: if(cfg.exception) console.log("\x1b[33m%s", res.error);
			}
		}
	}
}
let slaveUser = async (id) => {
	try {
		const {body} = await got.get("https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/user?id="+id, {
			responseType: "json",
			headers: {
				"authorization": cfg.auth,
				"user-agent": cfg.ua,
				"referer": cfg.prod,
				"origin": cfg.prod
			}
		})

		if(body.error)
		{
			console.log(body.error)
		}
		else
		{
			if(body.id)
			{
				slaveList(body.id)
				console.log('\x1b[34m%s\x1b[0m%s\x1b[32m%s\x1b[0m%s', '[/]', '[', `${body.id}`, ']', `Найден новый пользователь!`)
			}
		}
	} catch (ex) {
		let res = ex.response.body;
		if(res.error) {
			switch (res.error.message) {
				case 'ErrFloodJob app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, теперь вы не можете нанимать на работу (ErrFloodJob)");
					break
				case 'NotYouSlave app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Похоже, что раб уже вам не пренадлежит (NotYouSlave)");
					break
				case 'ErrFloodBuy app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, теперь вы не можете покупать рабов (ErrFloodBuy)");
					break
				case 'SalveAreLocked app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Раб на цепи (SalveAreLocked)");
					break
				case 'ErrLowMoney app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Недостаточно денег либо пользователь был забаган накруткой (ErrLowMoney)");
					break
				case 'ErrFloodFetter app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, нельзя так часто сажать на цепь пользователей (ErrFloodFetter)");
					break
				case 'Invalid sign 3':
					console.log("\x1b[31m%s", "<Ошибка> Неверный Bearer, проверьте строку Auth в файле config.js (Invalid Sign)");
					break
				default: if(cfg.exception) console.log("\x1b[33m%s", res.error);
			}
		}
	}
}
let slaveMaster = async (id) => {
	try {
		const {body} = await got.get("https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/user?id="+id, {
			responseType: "json",
			headers: {
				"authorization": cfg.auth,
				"user-agent": cfg.ua,
				"referer": cfg.prod,
				"origin": cfg.prod
			}
		})

		if(body.error)
		{
			console.log(body)
		}
		else
		{	
			if(body.id)
			{
				if(body.master_id == 0) return false;
				slaveList(body.master_id)
				console.log('\x1b[45m%s\x1b[0m%s\x1b[32m%s\x1b[0m%s', '[X]', '[', `${body.id}`, ']', `Найден Dungeon Master`)
			}
		}
	} catch (ex) {
		let res = ex.response.body;
		if(res.error) {
			switch (res.error.message) {
				case 'ErrFloodJob app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, теперь вы не можете нанимать на работу (ErrFloodJob)");
					break
				case 'NotYouSlave app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Похоже, что раб уже вам не пренадлежит (NotYouSlave)");
					break
				case 'ErrFloodBuy app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, теперь вы не можете покупать рабов (ErrFloodBuy)");
					break
				case 'SalveAreLocked app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Раб на цепи (SalveAreLocked)");
					break
				case 'ErrLowMoney app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Недостаточно денег либо пользователь был забаган накруткой (ErrLowMoney)");
					break
				case 'ErrFloodFetter app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, нельзя так часто сажать на цепь пользователей (ErrFloodFetter)");
					break
				default: if(cfg.exception) console.log("\x1b[33m%s", res.error);
			}
		}
	}
}
async function slaveList(id){
	try {
		const {body} = await got.get("https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/slaveList?id="+id, {
			responseType: "json",
			headers: {
				"authorization": cfg.auth,
				"user-agent": cfg.ua,
				"origin": cfg.prod,
				"referer": cfg.prod
			}
		})
		for(let i in body.slaves)
		{
				if((body.slaves[i].price > cfg.mode_.min_buy) && body.slaves[i].price < cfg.mode_.max_buy && body.slaves[i].item_type == "user")
				{
						slaveBuy(body.slaves[i].id);
							await sleep(cfg.timeout);
						slaveJob(arr[rand(0, 10)], body.slaves[i].id);
							await sleep(cfg.timeout);
				}
				else
				{
					await sleep(2000)
					slaveUser(rand(1000000,631111111))
				}
		}
		if(!body.slaves[0])
		{
			slaveMaster(id)
		}
	} catch (ex) {
		let res = ex.response.body;
		if(res.error) {
			switch (res.error.message) {
				case 'ErrFloodJob app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, теперь вы не можете нанимать на работу (ErrFloodJob)");
					break
				case 'NotYouSlave app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Похоже, что раб уже вам не пренадлежит (NotYouSlave)");
					break
				case 'ErrFloodBuy app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, теперь вы не можете покупать рабов (ErrFloodBuy)");
					break
				case 'SalveAreLocked app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Раб на цепи (SalveAreLocked)");
					break
				case 'ErrLowMoney app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Недостаточно денег либо пользователь был забаган накруткой (ErrLowMoney)");
					break
				case 'ErrFloodFetter app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, нельзя так часто сажать на цепь пользователей (ErrFloodFetter)");
					break
				default: if(cfg.exception) console.log("\x1b[33m%s", res.error);
			}
		}
	}
}

let arr = ['1', 'НЕ ВОРОВАТЬ', '❤', '💎', '😊', '🥰', '...', 'Раб', '😁', 'хахавзха', 'Не трогать!'];

try {
	async function main() {
		switch(cfg.mode) {
			case 1:
				for(let a = cfg.mode_.min_id; a < cfg.mode_.max_id; a++) 
				{
					slaveBuy(a)
					await sleep(cfg.timeout)
					slaveJob("NodeJS top", a)
					await sleep(cfg.timeout);
				}
			break;
			case 2:
				slaveUser(cfg.mode_.start_id)
			break;
		}
	}
	
	rl.on('line', (input) => {
  		console.log(`[$]  ${input}\n`);
  		rl.prompt();
	});
	main();
} 
catch (e)
{
	console.log(e)
}