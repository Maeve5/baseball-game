// 랜덤 숫자
let setNum = [];

// 입력한 숫자 가져오기
let nums = document.getElementsByClassName('num');

// 시도 횟수
let count = 0;

let html = ``;
let tableBody = document.querySelector('table tbody');

const startbtn = document.getElementById('startbtn');
const enterbtn = document.getElementById('enterbtn');

// 게임 시작
const onStart = () => {
	if (startbtn.innerText === 'Start') {
		// 초기화
		count = 0;
		html = ``;
		tableBody.innerHTML = html;
		Array.from(nums).forEach((num) => {
			num.value = null;
		});

		// 랜덤 숫자 생성 (0 ~ 9)
		do {
			let getNum = Math.floor(Math.random() * 10);
			setNum.push(getNum);
			let set = new Set(setNum);
			setNum = Array.from(set);
			// 첫 번째 숫자가 0이면 제거
			if (setNum[0] === 0) {
				setNum.shift();
			}
		}
		while (setNum.length < 3);

		// for (let i = 0; setNum.length < 3; i++) {
		// 	let getNum = Math.floor(Math.random() * 10);
		// 	// 첫번째 숫자
		// 	if (setNum.length === 0 && getNum !== 0) {
		// 		setNum.push(getNum);
		// 	}
		// 	// 두번째 숫자
		// 	else if (setNum.length === 1 && getNum !== setNum[0]) {
		// 		setNum.push(getNum);
		// 	}
		// 	// 세번째 숫자
		// 	else if (setNum.length === 2 && getNum !== setNum[0] && getNum !== setNum[1]) {
		// 		setNum.push(getNum);
		// 	}
		// }
		// => for문은 반복 횟수가 정해져있을 때, 배열과 함께 주로 사용한다. while문은 무한 루프나 특정 조건에 만족할 때까지 반복해야 하는 경우 주로 사용한다.

		console.log('setNum >> ', setNum);

		// 버튼 비활성화
		startbtn.innerText = 'Go!';
		startbtn.disabled = true;
	}
}

// 숫자 입력
// const onChangeNum = () => {
// 	Array.from(nums).forEach((num, idx) => {
// 		// 입력값 있을 때
// 		if (num.value) {
// 			userNum.splice(idx, 1, Number(num.value));
// 		}
// 		// 빈칸일 때
// 		else {
// 			userNum.splice(idx, 1, '');
// 		}
// 	})
// 	console.log('userNum : ', userNum);
// }
// => Enter 버튼 눌렀을 때 한번에 배열로 받는 코드가 훨씬 간단하고 효율적

// 숫자 입력 자리수 제한
// const handleMaxLength = (e) => {
// 	if (e.value.length > e.maxLength) {
// 		e.value = e.value.slice(0, e.maxLength);
// 	}
// }
// => input type="tel"로 하면 maxlength 속성 사용 가능해지므로 이 함수는 불필요

// enter키 작동
const onKeyUp = (e) => {
	if (e.code === 'Enter' || e.code === 'NumpadEnter') {
		onEnter();
	}
}
// Array.from(nums).forEach((num) => {
// 	num.addEventListener('keyup', onKeyUp);
// });
// => input onkeyup="onKeyUp(event)"로 함수 받아오기

// 답 확인
const onEnter = () => {
	// player 숫자
	let userNum = [];

	// 값 받아오기
	Array.from(nums).forEach((num) => {
		userNum.push(Number(num.value));
	})

	console.log('userNum >> ', userNum);

	// 초기화
	let ball = 0;
	let strike = 0;
	let num = userNum.join('');
	let flag = true;

	html = ``;
	count += 1;
	document.getElementById('rule1').style.color = 'black';
	document.getElementById('rule2').style.color = 'black';

	// 값 비교
	setNum.forEach((setnum, setIdx) => {
		userNum.forEach((usernum, userIdx) => {
			if (setnum === usernum && setIdx === userIdx) {
				strike += 1;
			}
			else if (setnum === usernum && setIdx !== userIdx) {
				ball += 1;
			}
		})
	})
	// 빈칸 있는 경우
	if (!nums[0].value || !nums[1].value || !nums[2].value) {
		alert('숫자를 입력하세요.');
		flag = false;
	}
	// 규칙 1번 위반
	if (nums[0].value === '0') {
		document.getElementById('rule1').style.color = 'red';
		flag = false;
	}
	// 규칙 2번 위반
	if (nums[0].value === nums[1].value || nums[1].value === nums[2].value || nums[2].value === nums[0].value) {
		document.getElementById('rule2').style.color = 'red';
		flag = false;
	}
	
	// 오류
	if (!flag) {
		// 결과 출력
		html += `
			<tr style="color: red;">
				<td>${count}</td>
				<td>${num}</td>
				<td>FOUL</td>
			</tr>
		`
		tableBody.innerHTML += html;
	}
	else {
		// 정답
		if (strike === 3) {
			alert('정답입니다.\n시도횟수 : ' + count + '번');
			// 재시작 준비
			startbtn.innerText = 'Start';
			startbtn.disabled = false;
			startbtn.focus();
			setNum = [];
		}

		// 결과 출력
		html += `
			<tr ${strike === 3 ? `style="color: blue;"` : `style="color: black;"`}>
				<td>${count}</td>
				<td>${num}</td>
				<td>${strike === 3 ? `홈런`
					: strike === 0 && ball === 0 ? `OUT`
					: `${ball}B ${strike}S`}
				</td>
			</tr>
		`
		tableBody.innerHTML += html;
	}
}