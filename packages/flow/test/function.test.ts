/* eslint-disable no-undef */

import { encode } from '../src/encode';
import { decode } from '../src/decode';

describe('function', () => {
	it('should write function', () => {
		// eslint-disable-next-line func-names
		const source = function (a: number, b: number): number {
			return a + b;
		};

		const buffer = encode(source);

		const target = decode(buffer);
		expect(target(1, 2)).toBe(3);
	});

	it('should write object with functions', () => {
		type Unit = {
			x: number,
			y: number,
			speedX: number,
			speedY: number,
			update(time: number): void;
			reset(): void;
		};

		function reset() {
			this.x = 0;
			this.y = 0;
		}

		const source: Unit[] = [
			{
				x: 0,
				y: 0,
				speedX: 2,
				speedY: 3,
				// eslint-disable-next-line object-shorthand, func-names
				update(time: number) {
					this.x += time * this.speedX;
					this.y += time * this.speedY;
				},
				reset,
			},
			{
				x: 100,
				y: 100,
				speedX: -1,
				speedY: 4,
				// eslint-disable-next-line object-shorthand, func-names
				update(time: number) {
					this.x += time * this.speedX;
					this.y += time * this.speedY;
				},
				reset,
			},
		];

		const buffer = encode(source);

		const target: Unit[] = decode(buffer);

		for (const unit of target) {
			unit.update(10);
		}

		const unit0: Unit = target[0];
		expect(unit0.x).toBe(20);
		expect(unit0.y).toBe(30);
		unit0.reset();
		expect(unit0.x).toBe(0);
		expect(unit0.y).toBe(0);

		const unit1: Unit = target[1];
		expect(unit1.x).toBe(90);
		expect(unit1.y).toBe(140);
		unit1.reset();
		expect(unit1.x).toBe(0);
		expect(unit1.y).toBe(0);
	});
});
