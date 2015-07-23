import $ from 'jquery';
import _ from 'lodash';
import trend from 'jquery-trend';
import revealer from 'jquery-revealer';

export default class Modal {
  constructor(options) {
    this.$modal;
    this.$dialog;
    this.$body = $('body');
    this.$el = $(options.el);
    this.$backdrop = $('<div class="modal-overlay">');

    this.options = $.extend({
      modalId: 'modal',
      modalClass: '',
      bodyOverflowClass: 'scroll-locked',
      centerVertically: true,
      closeSelector: '.modal-close',
      afterShow: () => {}
    }, options);

    this.wrapperHtml = `<div id="${this.options.modalId}" class="modal-wrapper" tabindex="-1" role="dialog"><div class="${this.options.modalClass} modal" role="document"><div class="modal-content">`;
  }

  /**
   * set up our fresh modal element
   */
  _init() {
    // clone element
    let $modalContent = this.$el.children().clone(true);
    // create a new wrapping element
    this.$modal = $(this.wrapperHtml);
    // pop our content in there
    this.$modal.find('.modal-content').append($modalContent);
    // add backdrop
    this.$backdrop.appendTo(this.$body);
  }

  /**
   * Show both the modal and backdrop
   */
  _open() {
    this._init();
    this._bindOverlayClick();
    this._bindCloseClick();

    this.$body.addClass(this.options.bodyOverflowClass).append(this.$modal);

    if (this.options.centerVertically) {
      this.$dialog = this.$modal.find('.modal');
      this._bindResize();

      // position modal for the first time just after it's been unhidden
      this.$modal.one('revealer-animating', () => {
        this._reposition();
      });
    }

    this.$modal.one('revealer-show', (event) => {
      this.options.afterShow($(event.currentTarget));
    });

    this.$modal.add(this.$backdrop).revealer('show');

    // bind destroy events
    this.$modal.on('revealer-hide', () => {
      this.$modal.remove();
    });
    this.$backdrop.on('revealer-hide', () => {
      this.$backdrop.remove();
    });
  }

  /**
   * Hide  both the modal and backdrop
   */
  _close() {
    this.$modal.add(this.$backdrop).revealer('hide');

    this.$body.removeClass(this.options.bodyOverflowClass);

    this._unbindResize();
  }

  /**
   * close modal if we click only on backdrop
   */
  _bindOverlayClick() {
    this.$modal.on('click', (event) => {
      if (event.target === event.currentTarget) {
        this._close();
      }
    })
  }

  /**
   * close modal if we click on a close button
   */
  _bindCloseClick() {
    this.$modal.find(this.options.closeSelector).on('click', (event) => {
      event.preventDefault();
      this._close();
    });
  }


  // -------------------------- Positioning -------------------------- //

  /**
   * calculate margin-top for element
   */
  _reposition() {
    if (!this.$dialog || !this.options.centerVertically) { return; }

    const elHeight = this.$dialog.outerHeight();
    const windowHeight = $(window).height();
    let diff = (windowHeight - elHeight) / 2;

    diff = diff < 0 ? 0 : diff;

    this.$dialog.css('margin-top', diff);
  }

  _bindResize() {
    $(window).on('resize.modal', _.debounce(this._reposition.bind(this), 100));
  }

  _unbindResize() {
    $(window).off('resize.modal');
  }


  // -------------------------- Expose Public Methods -------------------------- //

  open() {
    this._open();
  }

  close() {
    this._close();
  }

  position() {
    this._reposition();
  }
}
