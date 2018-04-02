'use strict';

function remember(source) {
  return function (start, sink) {
    console.log('remember got type', start, 'data', sink);
    if (start !== 0) return;
    var inited = false;
    var last;
    var sinkTalkback;
    source(0, function (type, data) {
      console.log('source type', type, 'data', data);

      if (type === 0) {
        sink(0, function (start, data) {
          console.log('got from dropUntil type', type, 'data', data);
          if (start !== 0) return;
          sinkTalkback = data;

          if (inited) {
            sinkTalkback(last);
          }
        });
      }

      if (type !== 1) {
        sink(type, data);
        return;
      } // const request = rest.length === 0
      // if (inited && request) {
      //   // console.log('got request & was inited, send -', last)
      //   sink(1, last)
      //   return
      // }
      // if (!inited && request) {
      //   // console.log('not inited, request')
      //   sourceTalkback(1)
      //   return
      // }


      inited = true;
      last = data;
      console.log('send to dropuntil sink', data);
      sink(1, data);
    });
  };
}

module.exports = remember;
