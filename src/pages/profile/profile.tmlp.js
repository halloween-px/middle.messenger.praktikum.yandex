export const ProfileTemplate = `
<section class="profile">
    <aside class="profile-aside">
        <button type="button" class="btn back-link">
            <i class="fa-sharp fa-solid fa-circle-arrow-left"></i>
        </button>
    </aside>
    <div class="profile-content">
        <div class="user-area">
            <button class="btn btn-change-avatar">
                <div class="user-image">
                    <img src="/images/no_image.png" alt="no image">
                </div>
            </button>
            <h5 class="user-name">Иван</h5>
        </div>
        <form action="#" class="profile-form">
            <div class="form-wrapper">
                {{#if changeUserInfo}}
                    {{#each inputsUserInfo}}
                        {{{this}}}
                    {{/each}}
                    {{{buttonSave}}}
                {{else if changePassword}}
                    {{#each inputsUserPassword}}
                        {{{this}}}
                    {{/each}}
                    {{{buttonSave}}}
                {{else}}
                    {{#each inputsUserInfo}}
                        {{{this}}}
                    {{/each}}                    
                {{/if}}  
            </div>
        </form>
        {{#if noChange}}
            <ul class="profile-navigation">
                <li><a href="#" data-profile-link="changeData">Изменить данные</a></li>
                <li><a href="#" data-profile-link="changePassword">Изменить пароль</a></li>
                <li><a href="#" data-profile-link="exist">Выйти</a></li>
            </ul>
        {{/if}}
    </div>
</section>
`
