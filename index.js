// 랜덤 숫자
let setNum = [];

// input 가져오기
let nums = document.getElementsByClassName('num');

// 시도 횟수
let id = 0;

// player 숫자
let userNum = ['', '', ''];

const startbtn = document.getElementById('startbtn');
const enterbtn = document.getElementById('enterbtn');

// 게임 시작
const onStart = () => {
	if (startbtn.innerText === 'Start') {
		console.log(nums);
		// 초기화
		let html = ``;
		document.querySelector('table tbody').innerHTML = html;
		Array.from(nums).forEach((num) => {
			num.value = null;
		});

		// 랜덤 숫자 생성 (0 ~ 9)
		for (let i = 0; setNum.length < 3; i++) {
			let getNum = Math.floor(Math.random() * 10);
			// 첫번째 숫자
			if (setNum.length === 0 && getNum !== 0) {
				setNum.push(getNum);
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
		nums[0].focus();
	}
}

// 숫자 입력
const onPress = () => {
	Array.from(nums).forEach((num, idx) => {
		// 입력값 있을 때
		if (num.value) {
			userNum.splice(idx, 1, Number(num.value));
		}
		// 빈칸일 때
		else {
			userNum.splice(idx, 1, '');
		}
	})
	console.log('userNum : ', userNum);
}

// 숫자 입력 자리수 제한
const handleMaxLength = (e) => {
	if (e.value.length > e.maxLength) {
		e.value = e.value.slice(0, e.maxLength);
	}
}

// enter키 작동
const onKeyUp = (e) => {
	if (e.code === 'Enter' || e.code === 'NumpadEnter') {
		onEnter();
	}
}
Array.from(nums).forEach((num) => {
	num.addEventListener('keyup', onKeyUp);
});

// 답 확인
const onEnter = () => {

	let ball = 0;
	let strike = 0;
	let num = userNum.join('');
	let html = ``;
	let tableBody = document.querySelector('table tbody');

	id += 1;
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

	// console.log('ball', ball);
	// console.log('strike : ', strike);

	// 정답
	if (strike === 3) {
		alert('정답입니다.\n시도횟수 : ' + id + '번');

		startbtn.innerText = 'Start';
		setNum = [];
		id = 0;
		userNum = ['', '', ''];
	}
	// 오답
	else {
		html += `
			<tr>
				<td>${id}</td>
				<td>${num}</td>
				<td>${strike === 0 && ball === 0
				? `OUT`
				: `${ball}B ${strike}S`}
				</td>
			</tr>
		`
		tableBody.innerHTML += html;
	}

	// 답 확인 조건
	let flag = true;
	let set = new Set(userNum);

	document.getElementById('rule1').style.color = 'black';
	document.getElementById('rule2').style.color = 'black';

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
	if (nums.length !== set.size) {
		document.getElementById('rule2').style.color = 'red';
		flag = false;
	}

	return flag;

	// 빈칸 있는 경우
	// Array.from(nums).forEach((num) => {
	// 	if (!num.value) {
	// 		alert('숫자를 입력하세요.');
	// 		return flag = false;
	// 	}
	// })
	// // 규칙 1번 위반
	// if (Number(nums[0].value) === 0) {
	// 	document.getElementById('rule1').style.color = 'red';
	// 	flag = false;
	// }
	// // 규칙 2번 위반
	// if (nums[0].value === nums[1].value || nums[1].value === nums[2].value || nums[2].value === nums[0].value) {
	// 	document.getElementById('rule2').style.color = 'red';
	// 	flag = false;
	// }
}