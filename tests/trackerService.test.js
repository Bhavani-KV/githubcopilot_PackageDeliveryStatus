const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const TrackerService = require('../src/trackerService.js');

describe('TrackerService Unit Tests', () => {
  describe('Successful Lookups (AC-01 & AC-02)', () => {
    test('should return Order Received for PKG-1001', () => {
      const result = TrackerService.getPackageStatus('PKG-1001');
      assert.equal(result.success, true);
      assert.deepEqual(result.data, {
        trackingNumber: 'PKG-1001',
        status: 'Order Received'
      });
    });

    test('should return In Transit for PKG-1002', () => {
      const result = TrackerService.getPackageStatus('PKG-1002');
      assert.equal(result.success, true);
      assert.deepEqual(result.data, {
        trackingNumber: 'PKG-1002',
        status: 'In Transit'
      });
    });

    test('should return Out for Delivery for PKG-1003', () => {
      const result = TrackerService.getPackageStatus('PKG-1003');
      assert.equal(result.success, true);
      assert.deepEqual(result.data, {
        trackingNumber: 'PKG-1003',
        status: 'Out for Delivery'
      });
    });

    test('should return Delivered for PKG-1004', () => {
      const result = TrackerService.getPackageStatus('PKG-1004');
      assert.equal(result.success, true);
      assert.deepEqual(result.data, {
        trackingNumber: 'PKG-1004',
        status: 'Delivered'
      });
    });

    test('should handle lowercase input and whitespace trimming (DR-04)', () => {
      const result = TrackerService.getPackageStatus('  pkg-1001  ');
      assert.equal(result.success, true);
      assert.deepEqual(result.data, {
        trackingNumber: 'PKG-1001',
        status: 'Order Received'
      });
    });
  });

  describe('Error Handling (AC-03 & AC-04)', () => {
    test('should return error for unknown tracking number (AC-03)', () => {
      const result = TrackerService.getPackageStatus('UNKNOWN-999');
      assert.equal(result.success, false);
      assert.equal(result.error, 'Package not found. Please check the tracking number.');
      assert.equal(result.data, undefined);
    });

    test('should return validation error for empty string (AC-04)', () => {
      const result = TrackerService.getPackageStatus('');
      assert.equal(result.success, false);
      assert.equal(result.error, 'Please enter a tracking number.');
    });

    test('should return validation error for whitespace-only string', () => {
      const result = TrackerService.getPackageStatus('    ');
      assert.equal(result.success, false);
      assert.equal(result.error, 'Please enter a tracking number.');
    });

    test('should return validation error for non-string input', () => {
      const result = TrackerService.getPackageStatus(null);
      assert.equal(result.success, false);
      assert.equal(result.error, 'Invalid input. Please enter a valid tracking number.');
    });
  });

  describe('Sample Keys Helper', () => {
    test('should return list of all 4 sample tracking keys', () => {
      const samples = TrackerService.getSampleTrackingNumbers();
      assert.equal(samples.length, 4);
      assert.deepEqual(samples, ['PKG-1001', 'PKG-1002', 'PKG-1003', 'PKG-1004']);
    });
  });
});

//test
