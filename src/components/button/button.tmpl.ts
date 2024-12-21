export const ButtonTemplate = `
    <button class="btn {{className}}" type="{{#if type}}{{type}}{{else}}button{{/if}}">
        {{label}}
        {{#if icon}} <i class="{{icon}}"></i> {{/if}}
    </button>
`
