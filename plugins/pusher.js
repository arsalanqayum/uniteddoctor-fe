// plugins/pusher.js
import Pusher from 'pusher-js';

export default ({ app }, inject) => {
  const pusher = new Pusher( '6f9b2ba6927e69a2a387', {
    cluster: 'ap2',
    // Additional Pusher options if needed
  });

  inject('pusher', pusher);
};
