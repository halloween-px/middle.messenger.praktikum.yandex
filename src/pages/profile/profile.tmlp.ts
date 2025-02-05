export const ProfileTemplate = `
<section class="profile">
    <aside class="profile-aside">
        {{{buttonBack}}}
    </aside>
    <div class="profile-content">
        {{{avatar}}}
        {{{form}}}
        {{#if links}}
            <ul class="profile-navigation">
                <li>{{{linkChangeData}}}</li>
                <li>{{{linkChangePassword}}}</li>
                <li>{{{linkExit}}}</li>
            </ul>
        {{/if}}
    </div>
</section>
`
