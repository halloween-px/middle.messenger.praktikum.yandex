export const MessageTemplate = /*html*/ `
    <div class="message {{className}}">
        {{{message}}}
        <time class="message-time">
            <i class="fa-solid fa-{{#if check}}check-double{{else}}check{{/if}}"></i>
            {{time}}
        </time>
    </div>
`
export const MessageListTemplate = /*html*/ `
    <div class="message-list">
        {{{messages}}}
    </div>
`

export const MessageInputTemplate = /*html*/ `
    <div class="message-input">
        {{{form}}}
    </div>
`

export const MessageSeporatorTemplate = /*html*/ `
    <div class="message-seporator">{{date}}</div>
`
