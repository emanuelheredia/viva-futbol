export const getRemainTime = (deadLine) => {
	let now = new Date();
	let remainTime = (new Date(deadLine) - now + 1000) / 1000;
	let remainSeconds = ("0" + Math.floor(remainTime % 60)).slice(-2);
	let remainMinutes = ("0" + Math.floor((remainTime / 60) % 60)).slice(-2);
	let remainHours = ("0" + Math.floor((remainTime / 3600) % 24)).slice(-2);
	let remainDays = Math.floor(remainTime / (3600 * 24));

	return {
		remainTime,
		remainDays,
		remainHours,
		remainMinutes,
		remainSeconds,
	};
};
