export const TemplateForm = `
    <form class="form {{classNames}}">
        <div class="form-wrapper">
            <h4 class="form-title">{{{title}}}</h4>
            {{#each inputs}}
                {{{this}}}
            {{/each}}
            <div class="btn-area">
                {{#each buttons}}
                   {{{this}}}
                {{/each}}
            </div>
        </div>
    </form>
`
