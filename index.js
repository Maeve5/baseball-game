
const checkNum1 = document.getElementsById("1");
const checkNum2 = document.getElementsById("2");
const checkNum3 = document.getElementsById("3");

const startbtn = document.getElementById("startbtn");
const checkbtn = document.getElementById("checkbtn");

// 랜덤 숫자 생성
let correctNum = [];

const getRandomNum = () => {
	if (startbtn.innerText === 'Start') {
		for (let i = 0; i < 3; i++) {
			const random = Math.floor(Math.random() * 9 + 1);
			correctNum.push(random);
			console.log(correctNum);
		}
		startbtn.innerText = 'Go!';
		startbtn.disable = true;
	}
	else if (startbtn.innerText === 'Go!') {

	}
}

if (startbtn) {
	startbtn.addEventListener("click", getRandomNum);
}

// 숫자 입력

const getCheckNum = () => {
	console.log(checkNum);
}

if (checkNum) {
	checkNum.addEventListener("keypress", getCheckNum);
}

// 숫자 비교