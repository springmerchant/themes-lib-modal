import $ from 'jquery';
import Modal from '../../dist/js/modal';

$(function(){
  const $el = $('#modal-content');

  new Modal({
    el: $el
  });

})
