export const ChatTemplate = `
  <section class="chat">
    {{{sidebarChat}}}
    <div class="chat-content">
      {{#if activeChat}}
        {{{conversationHeader}}}
        {{{messageList}}}
        {{{messageInput}}}
      {{else}}
        <div class="chat-empty">Выберите чат чтобы отправить сообщение</div>
      {{/if}}
    </div>
  </section>
`
