export const convarsationTemplate = /*html*/ `
  <div class="conversation {{#if active}}active{{/if}}" id="{{id}}">
    {{#if avatar}}
        {{{avatar}}}
    {{/if}}
    <div class="conversation-content">
      <div class="conversation-content-info">
        <h6 class="conversation-content-name">{{title}}</h6>
        <time class="conversation-content-last-time">{{last_message.time}}</time>
      </div>
      <div class="conversation-content-body">
        <h6 class="conversation-content-message">
          {{last_message.content}}
        </h6>
        <time class="conversation-content-unread" data-count="{{unread_count}}"></time>
      </div>
    </div>
  </div>
`

export const conversationHeaderTemplate = /*html*/ `
  <div class="conversation conversation-header">
    {{#if avatar}}
        {{{avatar}}}
    {{/if}}
    <div class="conversation-content">
      <h6 class="conversation-content-name">{{title}}</h6>
    </div>
    <div class="conversation-header-users">
      {{{users}}}
    </div>
    <div class="conversation-header-actions">
      {{{actions}}}
    </div>
  </div>
`

export const conversationListTemplate = /*html*/ `
  <div class="conversation-list">
    {{{conversations}}}
  </div>
`

export const conversationSearchTemplate = /*html*/ `
  <div class="conversation-search">
    {{{input}}}
  </div>
`
