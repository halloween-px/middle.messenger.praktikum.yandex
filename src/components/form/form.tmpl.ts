export const TemplateForm = `
    <form class="form {{classNames}}">
        {{#if formError}}
            <div class="form-error-message">{{formError}}</div>
        {{/if}}
        <div class="form-wrapper">
            <h4 class="form-title">{{{title}}}</h4>
            {{{inputs}}}
            <div class="btn-area">
                {{{buttons}}}
            </div>
        </div>
    </form>
`

export const FormMessageTemaplte = `
    <form class="{{classNames}}">
        {{{buttonMedia}}}
        {{{inputs}}}
        {{{buttonSend}}}
    </form>
`
