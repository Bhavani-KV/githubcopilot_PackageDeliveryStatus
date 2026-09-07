/**
 * Package Delivery Tracker UI Controller
 * Handles user interactions, form submissions, and secure DOM rendering.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var form = document.getElementById('tracking-form');
  var trackingInput = document.getElementById('tracking-input');
  var errorContainer = document.getElementById('error-container');
  var errorMessage = document.getElementById('error-message');
  var resultContainer = document.getElementById('result-container');
  var resultTrackingNum = document.getElementById('result-tracking-num');
  var resultStatusBadge = document.getElementById('result-status-badge');

  /**
   * Clears all feedback panels and resets state.
   */
  function clearFeedback() {
    errorContainer.classList.add('hidden');
    resultContainer.classList.add('hidden');
    errorMessage.textContent = '';
    resultTrackingNum.textContent = '';
    resultStatusBadge.textContent = '';
    resultStatusBadge.className = 'status-badge';
  }

  /**
   * Displays an error message safely using textContent (DR-02).
   * @param {string} msg
   */
  function showError(msg) {
    clearFeedback();
    errorMessage.textContent = msg;
    errorContainer.classList.remove('hidden');
  }

  /**
   * Map status string to CSS modifier class.
   * @param {string} status
   * @returns {string}
   */
  function getStatusBadgeClass(status) {
    switch (status) {
      case 'Order Received':
        return 'order-received';
      case 'In Transit':
        return 'in-transit';
      case 'Out for Delivery':
        return 'out-for-delivery';
      case 'Delivered':
        return 'delivered';
      default:
        return '';
    }
  }

  /**
   * Displays tracking lookup results safely using textContent (DR-02).
   * @param {{ trackingNumber: string, status: string }} data
   */
  function showResult(data) {
    clearFeedback();
    resultTrackingNum.textContent = data.trackingNumber;
    resultStatusBadge.textContent = data.status;

    var badgeClass = getStatusBadgeClass(data.status);
    resultStatusBadge.className = 'status-badge ' + badgeClass;

    resultContainer.classList.remove('hidden');
  }

  /**
   * Form submission handler.
   * @param {Event} event
   */
  function handleFormSubmit(event) {
    event.preventDefault();

    var rawValue = trackingInput.value;
    var trimmed = rawValue ? rawValue.trim() : '';

    if (!trimmed) {
      showError('Please enter a tracking number.');
      trackingInput.focus();
      return;
    }

    if (typeof window.TrackerService === 'undefined' || typeof window.TrackerService.getPackageStatus !== 'function') {
      showError('Tracking service unavailable. Please reload the page.');
      return;
    }

    var result = window.TrackerService.getPackageStatus(trimmed);

    if (result.success && result.data) {
      showResult(result.data);
    } else {
      showError(result.error || 'Package not found. Please check the tracking number.');
    }
  }

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
