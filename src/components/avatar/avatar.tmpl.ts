export const avatarTemplate = `
    <div class="avatar">
        <div class="avatar-image {{size}}">
            <img src="{{#if src}}{{src}}{{else}}/images/no_image.png{{/if}}" class="image" alt="avatar" />
            {{#if changeAvatar}}
                <div class="change-avatar"><i class="fa-regular fa-image"></i></div>
            {{/if}}
        </div>
        {{#if name}}
            <div class="avatar-name">
                {{name}}
            </div>
        {{/if}}
    </div>
`
