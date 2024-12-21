export const avatarTemplate = `
    <div class="avatar">
        <div class="avatar-image {{size}}">
            <img src="/images/no_image.png" class="image" alt="avatar" />
        </div>
        {{#if name}}
            <div class="avatar-name">
                {{name}}
            </div>
        {{/if}}
    </div>
`
