---
title: Botkit
---
### Single Message Replies to Incoming Messages

    controller.hears(['keyword','^pattern$'],['direct_message','direct_mention','mention'],function(bot,message) {

      // do something to respond to message
      // ...

      bot.reply(message,"Tell me more!");

    });

    controller.on('ambient',function(bot,message) {

        // do something...

        // then respond with a message object
        bot.reply(message,{
          text: "A more complex response",
          username: "ReplyBot",
          icon_emoji: ":dash:",
        });

    })

    //Using attachments
    controller.hears('another_keyword','direct_message,direct_mention',function(bot,message) {
      var reply_with_attachments = {
        'username': 'My bot' ,
        'text': 'This is a pre-text',
        'attachments': [
          {
            'fallback': 'To be useful, I need your to invite me in a channel.',
            'title': 'How can I help you?',
            'text': 'To be useful, I need your to invite me in a channel ',
            'color': '#7CD197'
          }
        ],
        'icon_url': 'http://lorempixel.com/48/48'
        }

      bot.reply(message, reply_with_attachments);
    });

### Control Conversation Flow

    controller.hears(['hello world'],['direct_message','direct_mention','mention','ambient'],function(bot,message) {

      // start a conversation to handle this response.
      bot.startConversation(message,function(err,convo) {

        convo.say('Hello!');
        convo.say('Have a nice day!');

        //Using attachments
        var message_with_attachments = {
          'username': 'My bot' ,
          'text': 'this is a pre-text',
          'attachments': [
            {
              'fallback': 'To be useful, I need your to invite me in a channel.',
              'title': 'How can I help you?',
              'text': ' To be useful, I need your to invite me in a channel ',
              'color': '#7CD197'
            }
          ],
          'icon_url': 'http://lorempixel.com/48/48'
          }

          convo.say(message_with_attachments);
        });

      })
    });

    controller.hears(['question me'],['direct_message','direct_mention','mention','ambient'],function(bot,message) {

      // start a conversation to handle this response.
      bot.startConversation(message,function(err,convo) {

        convo.ask('How are you?',function(response,convo) {

          convo.say('Cool, you said: ' + response.text);
          convo.next();

        });

      })

    });


