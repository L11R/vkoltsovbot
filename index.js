'use strict';
delete process.env["DEBUG_FD"];
var TelegramBot = require('node-telegram-bot-api'),
	token = 'YOUR_TOKEN_HERE',
	bot = new TelegramBot(token3, { polling: true });

var vkoltsov = {
	'Нет.': 30,
	'Такую механику не планируем.': 15,
	'Приглашайте друзей в свой замок :)': 5,
	'Скоро, никак руки не доходят до них.': 3,
	'Все скриптоюзеры известны, от ответственности не уйдут.': 3,
	'Накрутчиков победили.': 3,
	'Поднятие выносливости рекламой игры — только плюс для проекта.': 3,
	'Резать ее не планируем.': 3,
	'Пока процесс не отлажен.': 15,
	'Поиски нормального саппорта продолжаются.': 3,
	'Если проблема серьезная, мы о ней узнаем.': 3,
	'Стараемся.': 3,
	'Вроде, починили.': 5,
	'Эта игра вообще большой эксперимент и ноу-хау.': 15,
	'У игроков уникальная возможность быть первопроходцами.': 3,
	'Идея в том, чтобы одеваться коллективом.': 3,
	'По срокам пока не скажу точно, уже обьяснял почему.': 7,
	'К сожалению, по срокам трудно что-то обещать.': 3,
	'Неофициальным ботам админку не даем.': 3,
	'Основная проблема в доверии.': 20,
	'Принято.': 10,
	'Это тоже часть игрового процесса.': 10,
	'Идея хорошая, я подумаю, в каком формате это организовать.': 3,
	'Концепция игры такова, что изначально все замки равны.': 3,
	'Расположение не влияет никак, проверяли.': 3,
	'Что-то подобное точно будет.': 10,
	'Пока нет, но не исключаю такой возможности, в принципе.': 10,
	'Специально не пишем этого.': 3,
	'Воспринимаю это как деанон игрока.': 3,
	'Это фишка игры.': 20,
	'Пока на этом остановимся.': 10
};

var getRandomPhrase = function () {
	var sum = 0,
		counter = 0,
		phrase = '',
		phrase_temp = '';

	for (phrase in vkoltsov) {
		if (vkoltsov.hasOwnProperty(phrase)) {
			sum += vkoltsov[phrase];
		}
	}

	var random = Math.floor(Math.random() * sum);

	for (phrase in vkoltsov) {
		if (vkoltsov.hasOwnProperty(phrase)) {
			if (counter < random) {
				counter += vkoltsov[phrase] - 1;
				phrase_temp = phrase;
			} else
				return phrase_temp;
		}
	}

	return phrase_temp;
};

bot.on('text', function (msg) {
	var min = 0, max = vkoltsov.length - 1,
		text = '';

	if (typeof msg.text !== 'undefined')
		text = msg.text.toLowerCase();

	if (parseInt(msg.chat.id) < 0)
		console.log('Балуются в чатике: ' + msg.chat.title + ' (' + msg.chat.username + ' / ' + msg.chat.type + ' / ' + msg.chat.id + ')');
	else
		console.log('Балуется в личке: ' + msg.from.username + ' (' + msg.chat.type + ' / ' + msg.chat.id + ')');

	var login = '';
	if (typeof msg.reply_to_message !== 'undefined')
		login = msg.reply_to_message.from.username;

	if (/@vkoltsov/.exec(text) || /кольцов/.exec(text) || login == 'vkoltsovbot' || parseInt(msg.chat.id) > 0) {
		bot.sendChatAction(msg.chat.id,'typing');
		bot.sendMessage(msg.chat.id, getRandomPhrase(), { reply_to_message_id: msg.message_id });
	}
});
