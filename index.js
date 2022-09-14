// 랜덤 숫자
let correctNum = [];

// input 가져오기
let num1 = document.getElementById("num1");
let num2 = document.getElementById("num2");
let num3 = document.getElementById("num3");
let userNum = ['', '', ''];

const startbtn = document.getElementById("startbtn");
const enterbtn = document.getElementById("enterbtn");

// 결과
let id = 0;
let strike = 0;
let ball = 0;

const onStart = () => {

	// 게임 시작
	if (startbtn.innerText === 'Start') {
		// 랜덤 숫자 생성 (0 ~ 9)
		for (let i = 0; correctNum.length < 3; i++) {
			let ranNum = Math.floor(Math.random() * 10);
			// 첫번째 숫자
			if (correctNum.length === 0 && ranNum !== 0) {
				correctNum.push((ranNum));
			}
			// 두번째 숫자
			else if (correctNum.length === 1 && ranNum !== correctNum[0]) {
				correctNum.push(ranNum);
			}
			// 세번째 숫자
			else if (correctNum.length === 2 && ranNum !== correctNum[0] && ranNum !== correctNum[1]) {
				correctNum.push(ranNum);
			}
		}
		console.log('correctNum : ', correctNum);
		// 게임 상태 변경
		startbtn.innerText = 'Go!';
		startbtn.disable = true;
	}

	// 게임 중
	else {

	}
}

// 숫자 입력
const onPress = () => {
	if (num1.value) {
		userNum.splice(0, 1, Number(num1.value));
	}
	if (num2.value) {
		userNum.splice(1, 1, Number(num2.value));
	}
	if (num3.value) {
		userNum.splice(2, 1, Number(num3.value));
	}

	console.log('userNum : ', userNum);
}

// 답 확인
const onEnter = () => {

	// for (let i = 0; i < correctNum.length; i++) {
	// 	for (let j = 0; j < userNum.length; j++) {
	// 		if (i = j && correctNum[i] === userNum[j]) {
	// 			strike ++;
	// 		}
	// 		else if (i != j && correctNum[i] === userNum[j]) {
	// 			ball ++;
	// 		}
	// 	}
	// }



	console.log('strike : ', strike);
	console.log('ball', ball);

	// 결과 출력
	id++;
	let html = ``;
	let num = userNum.join('');

	html += `
			<tr>
				<td>${id}</td>
				<td>${num}</td>
				<td>${strike}S ${ball}B</td>
			</tr>
		`

	let tableBody = document.querySelector('table tbody');
	tableBody.innerHTML += html;

	// 답 확인 거부
	let flag = true;
	
	// 빈칸 있는 경우
	if (!num1.value || !num2.value || !num3.value) {
		alert ('숫자를 입력하세요.');
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