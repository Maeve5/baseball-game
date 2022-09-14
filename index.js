// 랜덤 숫자
let setNum = [];

// input 가져오기
let num1 = document.getElementById("num1");
let num2 = document.getElementById("num2");
let num3 = document.getElementById("num3");
let userNum = ['', '', ''];

const startbtn = document.getElementById("startbtn");
const enterbtn = document.getElementById("enterbtn");

// 시도 횟수
let id = 0;

// 게임 시작
const onStart = () => {

	if (startbtn.innerText === 'Start') {
		// 랜덤 숫자 생성 (0 ~ 9)
		for (let i = 0; setNum.length < 3; i++) {
			let getNum = Math.floor(Math.random() * 10);
			// 첫번째 숫자
			if (setNum.length === 0 && getNum !== 0) {
				setNum.push((getNum));
			}
			// 두번째 숫자
			else if (setNum.length === 1 && getNum !== setNum[0]) {
				setNum.push(getNum);
			}
			// 세번째 숫자
			else if (setNum.length === 2 && getNum !== setNum[0] && getNum !== setNum[1]) {
				setNum.push(getNum);
			}
		}
		console.log('setNum : ', setNum);
		// 게임 상태 변경
		startbtn.innerText = 'Go!';
		startbtn.disable = true;
		num1.focus();
	}

	// 게임 중
	else {

	}
}

// 숫자 입력
const onPress = () => {
	if (num1.value) {
		userNum.splice(0, 1, Number(num1.value));
		num2.focus();
	}
	if (num2.value) {
		userNum.splice(1, 1, Number(num2.value));
		num3.focus();
	}
	if (num3.value) {
		userNum.splice(2, 1, Number(num3.value));
	}

	console.log('userNum : ', userNum);
}

// 답 확인
const onEnter = () => {

	let ball = 0;
	let strike = 0;
	let html = ``;
	let num = userNum.join('');
	let tableBody = document.querySelector('table tbody');

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (i === j && setNum[i] === userNum[j]) {
				strike += 1;
				break;
			}
			else if (i !== j && setNum[i] === userNum[j]) {
				ball += 1;
				break;
			}
		}
	}

	console.log('strike : ', strike);
	console.log('ball', ball);

	// 결과 출력
	if (strike === 3) {
		alert('정답입니다.');

		startbtn.innerText = 'Start';
		setNum = [];
		id = 0;
		num1.value = null;
		num2.value = null;
		num3.value = null;
		html = ``;
		tableBody.innerHTML = html;
	}
	else {
		id++;
		html += `
				<tr>
					<td>${id}</td>
					<td>${num}</td>
					<td>${ball}B ${strike}S</td>
				</tr>
			`
		tableBody.innerHTML += html;

		// 답 확인 거부
		let flag = true;
		document.getElementById("rule1").style.color = 'black';
		document.getElementById("rule2").style.color = 'black';


		// 빈칸 있는 경우
		if (!num1.value || !num2.value || !num3.value) {
			alert('숫자를 입력하세요.');
			return flag = false;
		}
		// 규칙 1번 위반
		if (Number(num1.value) === 0) {
			document.getElementById("rule1").style.color = 'red';
			return flag = false;
		}
		// 규칙 2번 위반
		if (num1.value === num2.value || num2.value === num3.value || num3.value === num1.value) {
			document.getElementById("rule2").style.color = 'red';
			return flag = false;
		}

		return flag;
	}
}