export const ButtonTemplate = `
    <button class="btn {{className}}" type="{{#if type}}{{type}}{{else}}button{{/if}}">
        {{#if isLoading}}
            <i class="fa-solid fa-spinner"></i>
        {{else}}
            {{label}}
        {{/if}}
        {{#if icon}} <i class="{{icon}}"></i> {{/if}}
    </button>
`
