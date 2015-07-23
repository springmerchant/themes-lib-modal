import $ from 'jquery';
import Modal from '../../dist/js/modal';

$(function(){
  const $el = $('#modal-content');

  $('.fee-fi').click((event) => {
    event.preventDefault();
    alert('success!');
  })

  const modal = new Modal({
    el: $el,
    afterShow: ($el) => {
      $el.find('.fo-fum').click((event) => {
        event.preventDefault();
        alert('success again!');
      })
    }
  });

  $('.launch-modal').on('click', (event) => {
    event.preventDefault();
    modal.open();
  });

});
