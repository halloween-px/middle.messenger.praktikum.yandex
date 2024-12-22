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

// <form action="#" class="profile-form">
// <div class="form-wrapper">
//     {{#if changeUserInfo}}
//         {{#each inputsUserInfo}}
//             {{{this}}}
//         {{/each}}
//         {{{buttonSave}}}
//     {{else if changePassword}}
//         {{#each inputsUserPassword}}
//             {{{this}}}
//         {{/each}}
//         {{{buttonSave}}}
//     {{else}}
//         {{#each inputsUserInfo}}
//             {{{this}}}
//         {{/each}}
//     {{/if}}
// </div>
// </form>
