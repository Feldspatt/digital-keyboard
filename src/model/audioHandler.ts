export const audioContext = new window.AudioContext();
export const masterGain = audioContext.createGain();

const baseGain = 0.5;
masterGain.gain.value = baseGain;
masterGain.connect(audioContext.destination);
const activeOscillators: OscillatorNode[] = [];
const activeLocalGainMap = new WeakMap<OscillatorNode, GainNode>();

export function createOscillator(
	frequency: number,
	type: OscillatorType = 'sine'
) {
	const oscillator = audioContext.createOscillator();
	activeOscillators.push(oscillator);

	oscillator.type = type;
	oscillator.frequency.value = frequency;
	const localGain = audioContext.createGain();

	localGain.gain.setValueAtTime(0, audioContext.currentTime); // Set current gain
	localGain.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.1);

	activeLocalGainMap.set(oscillator, localGain);
	rampMasterGain();

	oscillator.connect(localGain).connect(masterGain); // Connect to shared gain node
	oscillator.start();

	return oscillator;
}

export function stopOscillator(osc: OscillatorNode) {
	activeOscillators.splice(activeOscillators.indexOf(osc), 1);
	const localGain = activeLocalGainMap.get(osc);
	if (!localGain) {
		throw new Error(
			`Unable to stop Oscillator: ${osc}, related local gain not found!`
		);
	}
	localGain.gain.setValueAtTime(localGain.gain.value, audioContext.currentTime); // Set current gain
	localGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);

	rampMasterGain();

	osc.stop(audioContext.currentTime + 0.1);
}

function rampMasterGain() {
	const nextGain =
		activeOscillators.length > 0 ? baseGain / activeOscillators.length : 0;

	console.log(`ramp gain,
current gain: ${masterGain.gain.value}
next gain: ${nextGain}
actives after update: ${activeOscillators.length}
`);
	masterGain.gain.cancelScheduledValues(audioContext.currentTime); // Clear any scheduled changes
	masterGain.gain.setValueAtTime(
		masterGain.gain.value,
		audioContext.currentTime
	); // Set current gain
	masterGain.gain.linearRampToValueAtTime(
		nextGain,
		audioContext.currentTime + 0.1
	);
}
