import { expect } from 'chai';
import sinon from 'sinon';
import Softphone from './index';
import moduleStatuses from '../../enums/moduleStatuses';

describe('Softphone Unit Test', () => {

	let softphone;

	beforeEach(() => {
		softphone = sinon.createStubInstance(Softphone);
	});

	describe('protocol', () => {
		it('should return attvr20 if brand is ATT', () => {
			softphone._brand = {
				id: '3420'
			};
			expect(softphone.protocol).to.equal('attvr20');
		});
		it('should return rcbtmobile if brand is BT', () => {
			softphone._brand = {
				id: '7710'
			};
			expect(softphone.protocol).to.equal('rcbtmobile');
		});
		it('should return rctelus if brand is TELUS', () => {
			softphone._brand = {
				id: '7310'
			};
			expect(softphone.protocol).to.equal('rctelus');
		});
		it('should return rcmobile if brand is not ATT, BT or TELUS', () => {
			softphone._brand = {
				id: '1000'
			};
			expect(softphone.protocol).to.equal('rcmobile');
		});
	});
	
	describe('ready', () => {
		it('should return true', () => {
			expect(softphone.ready).to.equal(true);
		});
	});

	describe('status', () => {
		it('should return moduleStatuses.ready', () => {
			expect(softphone.status).to.equal(moduleStatuses.ready);
		});
	})

});