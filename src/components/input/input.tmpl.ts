export const InputTemplate = `
        <input
            id="{{id}}"
            type="{{type}}" 
            name="{{name}}"
            class="form-control {{className}}"
            {{#if value}} value="{{value}}" {{/if}}
            {{#if isRequired }} required {{/if}}
            {{#if isReadonly }} readonly {{/if}}
            {{#if placeholder}} placeholder="{{placeholder}}" {{/if}}
        />
`
export const InputFloatingLabelTempalte = `
    <div class="form-floating">
        <div class="error-message"></div>
        ${InputTemplate}
        {{#if label}}
            <label class="form-label" for="{{id}}">{{{label}}}</label>
        {{/if}}
    </div>
`

export const InputGroupTemplate = `
    <div class="form-group">
        <div class="error-message"></div>
        {{#if label}}
            <label class="form-label" for="{{id}}">{{{label}}}</label>
        {{/if}}
        ${InputTemplate}
    </div>
`

export const InputSearchTemplate = `
    <div class="form-search">
        <div class="error-message"></div>
        ${InputTemplate}
        <label class="form-label" for="{{id}}">
            <i class="fa-regular fa-search icon"></i>
            <span class="label-text">Поиск</span>
        </label>
    </div>
`
