/**
 * Package Delivery Tracker Service
 * Provides in-memory package status lookup with normalization and dual-environment export.
 */

(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    // Node.js CommonJS environment
    module.exports = factory();
  } else {
    // Browser environment
    root.TrackerService = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // In-memory mock package repository
  var packageDatabase = {
    'PKG-1001': { trackingNumber: 'PKG-1001', status: 'Order Received' },
    'PKG-1002': { trackingNumber: 'PKG-1002', status: 'In Transit' },
    'PKG-1003': { trackingNumber: 'PKG-1003', status: 'Out for Delivery' },
    'PKG-1004': { trackingNumber: 'PKG-1004', status: 'Delivered' }
  };

  /**
   * Retrieves delivery status for a given tracking number.
   * Normalizes input by trimming whitespace and converting to uppercase.
   *
   * @param {string} trackingNumber - The tracking number to lookup.
   * @returns {{ success: boolean, data?: { trackingNumber: string, status: string }, error?: string }}
   */
  function getPackageStatus(trackingNumber) {
    if (typeof trackingNumber !== 'string') {
      return {
        success: false,
        error: 'Invalid input. Please enter a valid tracking number.'
      };
    }

    var normalizedKey = trackingNumber.trim().toUpperCase();

    if (!normalizedKey) {
      return {
        success: false,
        error: 'Please enter a tracking number.'
      };
    }

    var pkg = packageDatabase[normalizedKey];

    if (pkg) {
      return {
        success: true,
        data: {
          trackingNumber: pkg.trackingNumber,
          status: pkg.status
        }
      };
    }

    return {
      success: false,
      error: 'Package not found. Please check the tracking number.'
    };
  }

  /**
   * Returns a copy of the available sample tracking keys (useful for quick reference / testing).
   * @returns {string[]}
   */
  function getSampleTrackingNumbers() {
    return Object.keys(packageDatabase);
  }

  return {
    getPackageStatus: getPackageStatus,
    getSampleTrackingNumbers: getSampleTrackingNumbers
  };
});
