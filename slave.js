const path = require('path');
const got = require('got');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '_> $ '
});
const cfg = require('./config.js')

let APP_URL = 'https://pixel.w84.vkforms.ru/HappySanta/slaves/1.0.0/';

let rand = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

let sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let slaveBuy = async (id) => {
	try {
		const {body} = await got.post(APP_URL + 'buySlave', {
			responseType: "json",
			headers: {
				"authorization": cfg.auth,
				"user-agent": cfg.ua,
				"referer": cfg.prod,
				"origin": cfg.prod,
				"sec-fetch-site": "cross-site"
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
			handleError(res.error)
		}
	}
}

let slaveFetter = async (id) => {
	try {
		const {body} = await got.post(APP_URL + "buyFetter", {
			responseType: "json",
			headers: {
				"authorization": cfg.auth,
				"user-agent": cfg.ua,
				"referer": cfg.prod,
				"origin": cfg.prod,
				"sec-fetch-site": "cross-site"
			},
			json: {slave_id: id}
		})


		if(body.error)
		{
			console.log(body.error)
		}
		else
		{
			console.log('\x1b[33m%s\x1b[36m%s\x1b[0m%s', '[+]', `[${id}] `, `Посадил пользователя в оковы`)
		}
	} catch (ex) {
		let res = ex.response.body;
		if(res.error) {
			handleError(res.error)
		}
	}
}

let slaveJob = async (name, id) =>  {
	try {
		const {body} = await got.post(APP_URL + "jobSlave", {
			responseType: "json",
			headers: {
				"authorization": cfg.auth,
				"user-agent": cfg.ua,
				"referer": cfg.prod,
				"origin": cfg.prod,
				"sec-fetch-site": "cross-site"
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
			handleError(res.error)
		}
	}
}
let slaveUser = async (id) => {
	try {
		const {body} = await got.get(APP_URL + "user?id="+id, {
			responseType: "json",
			headers: {
				"authorization": cfg.auth,
				"user-agent": cfg.ua,
				"referer": cfg.prod,
				"origin": cfg.prod,
				"sec-fetch-site": "cross-site"
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
				console.log('\x1b[34m%s\x1b[0m%s\x1b[32m%s\x1b[0m%s', '[/]', '[', `${body.id}`, ']', `Ищу рабов у пользователя...`)
			}
		}
	} catch (ex) {
		let res = ex.response.body;
		if(res.error) {
			handleError(res.error)
		}
	}
}
let slaveMaster = async (id) => {
	try {
		const {body} = await got.get(APP_URL + "user?id="+id, {
			responseType: "json",
			headers: {
				"authorization": cfg.auth,
				"user-agent": cfg.ua,
				"referer": cfg.prod,
				"origin": cfg.prod,
				"sec-fetch-site": "cross-site"
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
				if(body.master_id < 1) return 123;
				slaveList(body.master_id)
				console.log('\x1b[45m%s\x1b[0m%s\x1b[32m%s\x1b[0m%s', '[X]', '[', `${body.id}`, ']', `Найден Dungeon Master`)
			}
		}
	} catch (ex) {
		let res = ex.response.body;
		if(res.error) {
			handleError(res.error)
		}
	}
}
let slaveList = async (id) => {
	try {
		const {body} = await got.get(APP_URL + "slaveList?id="+id, {
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
				if((body.slaves[i].price >= cfg.mode_.min_buy) && (body.slaves[i].price <= cfg.mode_.max_buy && body.slaves[i].item_type == "user") && body.slaves[i].fetter_to == 0)
				{
						slaveBuy(body.slaves[i].id);
							await sleep(rand(cfg.min_delay, cfg.max_delay));
						slaveJob(arr[rand(0, 10)], body.slaves[i].id);
							await sleep(rand(cfg.min_delay, cfg.max_delay));
						if(cfg.ocows.ocow) { 
							slaveFetter(body.slaves[i].id);
							await sleep(rand(cfg.min_delay, cfg.max_delay));
						}
				}
				else
				{
					await sleep(rand(2100, 4600))
					return slaveUser(rand(1000000,631111111))
				}
		}
		if(!body.slaves[0])
		{
			let master = await slaveMaster(id);
			if(master == 123)
			{
				await sleep(rand(2100, 3800))
				return slaveUser(rand(1000000,631111111))
			}
		}
	} catch (ex) {
		let res = ex.response.body;
		if(res.error) {
			handleError(res.error)
		}
	}
}

let handleError = (err) => {
	switch (err.message) {
				case 'ErrFloodJob app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, теперь вы не можете нанимать на работу (ErrFloodJob)");
					break
				case 'NotYouSlave app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Похоже, что ты раб (хз что это за ошибка :D) (NotYouSlave)");
					break
				case 'ErrFloodBuy app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, теперь вы не можете покупать рабов (ErrFloodBuy)");
					break
				case 'SalveAreLocked app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Раб на цепи (SalveAreLocked)");
					break
				case 'ErrLowMoney app_error': 
					console.log("\x1b[31m%s", "<Ошибка> У вас недостаточно денег либо пользователь был забаган накруткой (ErrLowMoney)");
					break
				case 'ErrFloodFetter app_error': 
					console.log("\x1b[31m%s", "<Ошибка> Вам прилетел бан, нельзя так часто сажать на цепь пользователей (ErrFloodFetter)");
					break
				case 'Invalid sign 3':
					console.log("\x1b[31m%s", "<Ошибка> Неверный Bearer, проверьте строку Auth в файле config.js (Invalid Sign)");
					break
				default: if(cfg.exception) console.log("\x1b[33m%s", err);
	}
}

let arr = cfg.jobNames;

try {
	async function main() {
		switch(cfg.mode) {
			case 1:
				for(let a = cfg.mode_.min_id; a < cfg.mode_.max_id; a++) 
				{
					slaveBuy(a)
						await sleep(rand(2100, 4400))
					slaveJob("1", a)
						await sleep(rand(2100, 4400));
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