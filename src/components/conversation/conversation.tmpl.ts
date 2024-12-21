export const convarsationTemplate = /*html*/ `
  <div class="conversation">
    {{#if avatar}}
        {{{avatar}}}
    {{/if}}
    <div class="conversation-content">
      <div class="conversation-content-info">
        <h6 class="conversation-content-name">{{name}}</h6>
        <time class="conversation-content-last-time">{{lastTime}}</time>
      </div>
      <div class="conversation-content-body">
        <h6 class="conversation-content-message">
          {{message}}
        </h6>
        <time class="conversation-content-unread">{{unreadCnt}}</time>
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
      <h6 class="conversation-content-name">{{name}}</h6>
    </div>
    <div class="conversation-header-actions">
      {{{actions}}}
    </div>
  </div>
`

export const conversationListTemplate = /*html*/ `
  <div class="conversation-list">
    {{{conversation}}}
  </div>
`

export const conversationSearchTemplate = /*html*/ `
  <div class="conversation-search">
    {{{input}}}
  </div>
`
