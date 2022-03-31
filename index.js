#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 4000) => new Promise((r) => setTimeout(r, ms));

async function startProgram() {
	const programTitle = chalkAnimation.rainbow(
		'Welcome to adam-cli-quiz! \n'
	);

	await sleep();
	programTitle.stop();

	console.log(`
		adam-cli-quiz initalized.

		${chalk.bgBlue('HOW TO PLAY')}

		You will be asked a series of questions all centered around ${gradient.pastel('Adam Taylor')}.
		If you answer incorrectly, the game will be ${chalk.bgRed('terminated')}.
		So answer carefully...

	`);
}

async function askName() {
	const answers = await inquirer.prompt({
		name: 'playerName',
		type: 'input',
		message: 'Who will you be answering questions as?\n',
		validate: (input) => {
			if (input.length < 0) return 'Please enter a name';
			if (input.length > 10) return 'No real names are longer than 10 characters. Try again';
			return true;
		},
	});
	
	playerName = answers.playerName;
}

async function handleAnswer(isCorrect) {
	const spinner = createSpinner('Checking answer...').start();
	await sleep(200);

	if (isCorrect) {
		spinner.success({ text: `${chalk.cyan('Correct, ')}` + `${chalk.cyan(playerName)}!\n` });
	} else {
		spinner.error({ text: `${chalk.red('Incorrect, ')}` + `${chalk.red(playerName)}` + `${chalk.red('!')}`
	 + `\n` + `The game will now be ${chalk.red('Terminated!')}\n` });
	 process.exit(1);
	}
}

function winner() {
	console.clear();
	const msg = `Congrats, ${playerName}!\n You are Adam's #1 Fan!`;

	figlet(msg, (err, data) => {
		console.log(gradient.pastel.multiline(data));
	});
}

async function question1() {
	const answers = await inquirer.prompt({
		name: 'question1',
		type: 'list',
		message: 'What is my favorite programming language?\n',
		choices	: [
			'JavaScript',
			'Python',
			'Dart',
			'C',
		],
	});

	return handleAnswer(answers.question1 === 'JavaScript');
}

async function question2() {
	const answers = await inquirer.prompt({
		name: 'question2',
		type: 'list',
		message: 'Where did I study software engineering?\n',
		choices	: [
			'Tandy School of Computer Science',
			'The Univeristy of Tulsa',
			'Holberton School Tulsa',
			'The Univeristy of North Texas',
		],
	});

	return handleAnswer(answers.question2 === 'Holberton School Tulsa');
}

async function question3() {
	const answers = await inquirer.prompt({
		name: 'question3',
		type: 'list',
		message: 'What specialization did I study?\n',
		choices	: [
			'Machine Learning',
			'Low level and Algorithms',
			'Alternate Reality/Virtual Reality',
			'Full Stack Web Development',
		],
	});

	return handleAnswer(answers.question3 === 'Full Stack Web Development');
}

async function question4() {
	const answers = await inquirer.prompt({
		name: 'question4',
		type: 'list',
		message: 'Which end of Web Development do I enjoy most?\n',
		choices	: [
			'Front-End',
			'Back-End',
		],
	});

	return handleAnswer(answers.question4 === 'Front-End');
}

async function question5() {
	const answers = await inquirer.prompt({
		name: 'question5',
		type: 'list',
		message: 'Do I honestly enjoy CSS?\n',
		choices	: [
			'I despize it',
			'Moderatly so',
			'I love it',
			'I absolutely adore it',
		],
	});

	return handleAnswer(answers.question5 === 'I absolutely adore it');
}

console.clear();
await startProgram();
// await askName();
// await question1();
// await question2();
// await question3();
// await question4();
// await question5();
// winner();