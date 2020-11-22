export enum RabbitMQTopics {
  ChatbotManagerGroups = 'chatbot.manager.groups',
  ChatbotManagerConnect = 'chatbot.manager.connect',
  ChatbotConnect = 'chatbot.connect',
  ChatbotSettings = 'chatbot.settings',
  ChatbotDialogs = 'chatbot.dialogs',
  ChatbotDialogsAdd = 'chatbot.dialogs.add',
  ChatbotGroupUpdate = 'chatbot.group.update',
  ChatbotGroupAdd = 'chatbot.group.add',
  ChatbotGroupRemove = 'chatbot.group.remove',

  AutolikeManagerConnect = 'autolike.manager.connect',
  AutolikeManagerUsers = 'autolike.manager.users',
  AutolikeManagerClose = 'autolike.manager.close',
  AutolikeSettingsUpdate = 'autolike.settings.update',
  AutolikeLog = 'autolike.log',
  AutolikeLogCounter = 'autolike.log.counter',

  CommentLikeLog = 'commentlike.log',
  CommentLikeStart = 'commentlike.start',
  CommentLikeEnd = 'commentlike.end',
  CommentLikeUpdate = 'commentlike.update',

  BoostLikeLog = 'boostlike.log',
  BoostLikeStart = 'boostlike.start',
  BoostLikeUpdate = 'boostlike.update',
  ServiceAccount = 'service.account',

  Monitoring = 'monitoring',
  FastData = 'fastdata',
}
