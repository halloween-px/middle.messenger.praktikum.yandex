export const InputTemplate = `
    <div class="form-group">
        <input
            id="{{id}}"
            type="{{type}}" 
            name="{{name}}"
            class="form-control {{className}}"
            {{#if isRequired }} required {{/if}}
        />
        {{#if label}}
            <label class="form-label" for="{{id}}">{{{label}}}</label>
        {{/if}}
    </div>
`
