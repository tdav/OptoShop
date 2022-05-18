import Vue from 'vue';

Vue.filter('statusText', function(value) {
  switch (value) {
    case 'cart':
      return 'Корзинка';

    case 'pending':
      return 'В ожидании';

    case 'canceled_supplier':
      return 'Отменено поставщиком';

    case 'accept_adjustment':
      return 'Принять с редактированием'; //отменитть приять

    case 'accept':
      return 'Принять';

    case 'canceled_store':
      return 'Отменено торговой точкой';

    case 'accept_store':
      return 'Подтвержденно торговой точкой!';

    case 'shipping_accept':
      return 'Подтверждение доставки';

    case 'in_the_supplier':
      return 'В поставщике';

    case 'cancel_driver':
      return 'Отменено водителе';

    case 'delivered':
      return 'Были доставлены';

    default:
      return value;
  }
});

Vue.filter('statusIcon', function(value) {
  switch (value) {
    case 'pending':
      return 'hourglass_empty';

    case 'canceled_store':
      return 'highlight_off';

    case 'accept':
      return 'done_all';

    default:
      return 'help_outline';
  }
});

Vue.filter('statusColor', function(value) {
  switch (value) {
    case 'pending':
      return 'warning';

    case 'canceled_store':
      return 'red';

    case 'accept':
      return 'success';

    default:
      return 'warning';
  }
});

Vue.filter('statusColor2', function(status) {
  switch (status) {
    case 'cart':
      return '3ca93f';

    case 'pending':
      return '3ca93f';

    case 'canceled_supplier':
      return '3ca93f';

    case 'accept_adjustment':
      return '3ca93f';

    case 'accept':
      return '3ca93f';

    case 'canceled_store':
      return '3ca93f';

    case 'accept_store':
      return '3ca93f';

    case 'shipping_accept':
      return '3ca93f';

    case 'in_the_supplier':
      return '3ca93f';

    case 'cancel_driver':
      return '3ca93f';

    case 'delivered':
      return '3ca93f';
  }
});
