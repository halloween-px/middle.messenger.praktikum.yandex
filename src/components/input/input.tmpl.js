export const InputTemplate = `
        <input
            id="{{id}}"
            type="{{type}}" 
            name="{{name}}"
            class="form-control {{className}}"
            value="{{value}}"
            {{#if isRequired }} required {{/if}}
            {{#if isReadonly }} readonly {{/if}}
        />
`
export const InputFloatingLabelTempalte = `
    <div class="form-floating">
        ${InputTemplate}
        {{#if label}}
            <label class="form-label" for="{{id}}">{{{label}}}</label>
        {{/if}}
    </div>
`

export const InputGroupTemplate = `
    <div class="form-group">
        {{#if label}}
            <label class="form-label" for="{{id}}">{{{label}}}</label>
        {{/if}}
        ${InputTemplate}
    </div>
`
