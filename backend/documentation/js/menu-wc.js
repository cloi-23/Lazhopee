'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-a98c954ee3476c92c3c86ee55c0702a68c7bd5a287f6dd95be9af033422b2d7df213ccae564c7d8bf3b2c2c045cf480ce442beeb80673d259c02eb678bab28b1"' : 'data-target="#xs-controllers-links-module-AppModule-a98c954ee3476c92c3c86ee55c0702a68c7bd5a287f6dd95be9af033422b2d7df213ccae564c7d8bf3b2c2c045cf480ce442beeb80673d259c02eb678bab28b1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-a98c954ee3476c92c3c86ee55c0702a68c7bd5a287f6dd95be9af033422b2d7df213ccae564c7d8bf3b2c2c045cf480ce442beeb80673d259c02eb678bab28b1"' :
                                            'id="xs-controllers-links-module-AppModule-a98c954ee3476c92c3c86ee55c0702a68c7bd5a287f6dd95be9af033422b2d7df213ccae564c7d8bf3b2c2c045cf480ce442beeb80673d259c02eb678bab28b1"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-a98c954ee3476c92c3c86ee55c0702a68c7bd5a287f6dd95be9af033422b2d7df213ccae564c7d8bf3b2c2c045cf480ce442beeb80673d259c02eb678bab28b1"' : 'data-target="#xs-injectables-links-module-AppModule-a98c954ee3476c92c3c86ee55c0702a68c7bd5a287f6dd95be9af033422b2d7df213ccae564c7d8bf3b2c2c045cf480ce442beeb80673d259c02eb678bab28b1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a98c954ee3476c92c3c86ee55c0702a68c7bd5a287f6dd95be9af033422b2d7df213ccae564c7d8bf3b2c2c045cf480ce442beeb80673d259c02eb678bab28b1"' :
                                        'id="xs-injectables-links-module-AppModule-a98c954ee3476c92c3c86ee55c0702a68c7bd5a287f6dd95be9af033422b2d7df213ccae564c7d8bf3b2c2c045cf480ce442beeb80673d259c02eb678bab28b1"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CustomerModule.html" data-type="entity-link" >CustomerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CustomerModule-9fd31768d1caaa9871b4611455af4b2258035acad3cad1b9610bb9debd8aff714f119bec2bf3d87649107fd4d70373097000085679dfadc2bbcb5e9f71a9f03c"' : 'data-target="#xs-controllers-links-module-CustomerModule-9fd31768d1caaa9871b4611455af4b2258035acad3cad1b9610bb9debd8aff714f119bec2bf3d87649107fd4d70373097000085679dfadc2bbcb5e9f71a9f03c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CustomerModule-9fd31768d1caaa9871b4611455af4b2258035acad3cad1b9610bb9debd8aff714f119bec2bf3d87649107fd4d70373097000085679dfadc2bbcb5e9f71a9f03c"' :
                                            'id="xs-controllers-links-module-CustomerModule-9fd31768d1caaa9871b4611455af4b2258035acad3cad1b9610bb9debd8aff714f119bec2bf3d87649107fd4d70373097000085679dfadc2bbcb5e9f71a9f03c"' }>
                                            <li class="link">
                                                <a href="controllers/CustomerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CustomerModule-9fd31768d1caaa9871b4611455af4b2258035acad3cad1b9610bb9debd8aff714f119bec2bf3d87649107fd4d70373097000085679dfadc2bbcb5e9f71a9f03c"' : 'data-target="#xs-injectables-links-module-CustomerModule-9fd31768d1caaa9871b4611455af4b2258035acad3cad1b9610bb9debd8aff714f119bec2bf3d87649107fd4d70373097000085679dfadc2bbcb5e9f71a9f03c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CustomerModule-9fd31768d1caaa9871b4611455af4b2258035acad3cad1b9610bb9debd8aff714f119bec2bf3d87649107fd4d70373097000085679dfadc2bbcb5e9f71a9f03c"' :
                                        'id="xs-injectables-links-module-CustomerModule-9fd31768d1caaa9871b4611455af4b2258035acad3cad1b9610bb9debd8aff714f119bec2bf3d87649107fd4d70373097000085679dfadc2bbcb5e9f71a9f03c"' }>
                                        <li class="link">
                                            <a href="injectables/CustomerLocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerLocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CustomerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeliveryModule.html" data-type="entity-link" >DeliveryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-DeliveryModule-fa6bd26d9ccfcbeb45da74e230a469c4ed586e196772def8dd600d963294698526d873d35a31ec8b7fed652899497fa94106f44b99296d946f81631117e0eda9"' : 'data-target="#xs-controllers-links-module-DeliveryModule-fa6bd26d9ccfcbeb45da74e230a469c4ed586e196772def8dd600d963294698526d873d35a31ec8b7fed652899497fa94106f44b99296d946f81631117e0eda9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DeliveryModule-fa6bd26d9ccfcbeb45da74e230a469c4ed586e196772def8dd600d963294698526d873d35a31ec8b7fed652899497fa94106f44b99296d946f81631117e0eda9"' :
                                            'id="xs-controllers-links-module-DeliveryModule-fa6bd26d9ccfcbeb45da74e230a469c4ed586e196772def8dd600d963294698526d873d35a31ec8b7fed652899497fa94106f44b99296d946f81631117e0eda9"' }>
                                            <li class="link">
                                                <a href="controllers/DeliveryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DeliveryModule-fa6bd26d9ccfcbeb45da74e230a469c4ed586e196772def8dd600d963294698526d873d35a31ec8b7fed652899497fa94106f44b99296d946f81631117e0eda9"' : 'data-target="#xs-injectables-links-module-DeliveryModule-fa6bd26d9ccfcbeb45da74e230a469c4ed586e196772def8dd600d963294698526d873d35a31ec8b7fed652899497fa94106f44b99296d946f81631117e0eda9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DeliveryModule-fa6bd26d9ccfcbeb45da74e230a469c4ed586e196772def8dd600d963294698526d873d35a31ec8b7fed652899497fa94106f44b99296d946f81631117e0eda9"' :
                                        'id="xs-injectables-links-module-DeliveryModule-fa6bd26d9ccfcbeb45da74e230a469c4ed586e196772def8dd600d963294698526d873d35a31ec8b7fed652899497fa94106f44b99296d946f81631117e0eda9"' }>
                                        <li class="link">
                                            <a href="injectables/DeliveryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DriverModule.html" data-type="entity-link" >DriverModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-DriverModule-b204f19e8408e426d6e2081a09dcaa86bc25c216e4bc113448772151a12e3588f1b9e833fbb2f3bebc71e1994c5e950da04fe6f3c37270e9aaf7a1b0cf79b64a"' : 'data-target="#xs-controllers-links-module-DriverModule-b204f19e8408e426d6e2081a09dcaa86bc25c216e4bc113448772151a12e3588f1b9e833fbb2f3bebc71e1994c5e950da04fe6f3c37270e9aaf7a1b0cf79b64a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DriverModule-b204f19e8408e426d6e2081a09dcaa86bc25c216e4bc113448772151a12e3588f1b9e833fbb2f3bebc71e1994c5e950da04fe6f3c37270e9aaf7a1b0cf79b64a"' :
                                            'id="xs-controllers-links-module-DriverModule-b204f19e8408e426d6e2081a09dcaa86bc25c216e4bc113448772151a12e3588f1b9e833fbb2f3bebc71e1994c5e950da04fe6f3c37270e9aaf7a1b0cf79b64a"' }>
                                            <li class="link">
                                                <a href="controllers/DriverController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DriverController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DriverModule-b204f19e8408e426d6e2081a09dcaa86bc25c216e4bc113448772151a12e3588f1b9e833fbb2f3bebc71e1994c5e950da04fe6f3c37270e9aaf7a1b0cf79b64a"' : 'data-target="#xs-injectables-links-module-DriverModule-b204f19e8408e426d6e2081a09dcaa86bc25c216e4bc113448772151a12e3588f1b9e833fbb2f3bebc71e1994c5e950da04fe6f3c37270e9aaf7a1b0cf79b64a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DriverModule-b204f19e8408e426d6e2081a09dcaa86bc25c216e4bc113448772151a12e3588f1b9e833fbb2f3bebc71e1994c5e950da04fe6f3c37270e9aaf7a1b0cf79b64a"' :
                                        'id="xs-injectables-links-module-DriverModule-b204f19e8408e426d6e2081a09dcaa86bc25c216e4bc113448772151a12e3588f1b9e833fbb2f3bebc71e1994c5e950da04fe6f3c37270e9aaf7a1b0cf79b64a"' }>
                                        <li class="link">
                                            <a href="injectables/DriverService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DriverService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExpenseModule.html" data-type="entity-link" >ExpenseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ExpenseModule-791a099caaf1d134166558118f88e4d2efbe3f965870536e0149da4b4aca5c9eebb46228532a2e97ecebe5472609ba484d8ef5efaae50c200babfe9d0834fcc5"' : 'data-target="#xs-controllers-links-module-ExpenseModule-791a099caaf1d134166558118f88e4d2efbe3f965870536e0149da4b4aca5c9eebb46228532a2e97ecebe5472609ba484d8ef5efaae50c200babfe9d0834fcc5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExpenseModule-791a099caaf1d134166558118f88e4d2efbe3f965870536e0149da4b4aca5c9eebb46228532a2e97ecebe5472609ba484d8ef5efaae50c200babfe9d0834fcc5"' :
                                            'id="xs-controllers-links-module-ExpenseModule-791a099caaf1d134166558118f88e4d2efbe3f965870536e0149da4b4aca5c9eebb46228532a2e97ecebe5472609ba484d8ef5efaae50c200babfe9d0834fcc5"' }>
                                            <li class="link">
                                                <a href="controllers/ExpenseController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExpenseController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ExpenseModule-791a099caaf1d134166558118f88e4d2efbe3f965870536e0149da4b4aca5c9eebb46228532a2e97ecebe5472609ba484d8ef5efaae50c200babfe9d0834fcc5"' : 'data-target="#xs-injectables-links-module-ExpenseModule-791a099caaf1d134166558118f88e4d2efbe3f965870536e0149da4b4aca5c9eebb46228532a2e97ecebe5472609ba484d8ef5efaae50c200babfe9d0834fcc5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExpenseModule-791a099caaf1d134166558118f88e4d2efbe3f965870536e0149da4b4aca5c9eebb46228532a2e97ecebe5472609ba484d8ef5efaae50c200babfe9d0834fcc5"' :
                                        'id="xs-injectables-links-module-ExpenseModule-791a099caaf1d134166558118f88e4d2efbe3f965870536e0149da4b4aca5c9eebb46228532a2e97ecebe5472609ba484d8ef5efaae50c200babfe9d0834fcc5"' }>
                                        <li class="link">
                                            <a href="injectables/ExpenseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExpenseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/IncomeStatementModule.html" data-type="entity-link" >IncomeStatementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-IncomeStatementModule-ae37a228fdc5ed770fae49dbe39653cf9394de8be9cfcffd8bda42d9b22228b3baffc204caaa991a09967b0bcbb1010a88b902eeb54bb4cb5df49a16241476fd"' : 'data-target="#xs-controllers-links-module-IncomeStatementModule-ae37a228fdc5ed770fae49dbe39653cf9394de8be9cfcffd8bda42d9b22228b3baffc204caaa991a09967b0bcbb1010a88b902eeb54bb4cb5df49a16241476fd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-IncomeStatementModule-ae37a228fdc5ed770fae49dbe39653cf9394de8be9cfcffd8bda42d9b22228b3baffc204caaa991a09967b0bcbb1010a88b902eeb54bb4cb5df49a16241476fd"' :
                                            'id="xs-controllers-links-module-IncomeStatementModule-ae37a228fdc5ed770fae49dbe39653cf9394de8be9cfcffd8bda42d9b22228b3baffc204caaa991a09967b0bcbb1010a88b902eeb54bb4cb5df49a16241476fd"' }>
                                            <li class="link">
                                                <a href="controllers/IncomeStatementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IncomeStatementController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-IncomeStatementModule-ae37a228fdc5ed770fae49dbe39653cf9394de8be9cfcffd8bda42d9b22228b3baffc204caaa991a09967b0bcbb1010a88b902eeb54bb4cb5df49a16241476fd"' : 'data-target="#xs-injectables-links-module-IncomeStatementModule-ae37a228fdc5ed770fae49dbe39653cf9394de8be9cfcffd8bda42d9b22228b3baffc204caaa991a09967b0bcbb1010a88b902eeb54bb4cb5df49a16241476fd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-IncomeStatementModule-ae37a228fdc5ed770fae49dbe39653cf9394de8be9cfcffd8bda42d9b22228b3baffc204caaa991a09967b0bcbb1010a88b902eeb54bb4cb5df49a16241476fd"' :
                                        'id="xs-injectables-links-module-IncomeStatementModule-ae37a228fdc5ed770fae49dbe39653cf9394de8be9cfcffd8bda42d9b22228b3baffc204caaa991a09967b0bcbb1010a88b902eeb54bb4cb5df49a16241476fd"' }>
                                        <li class="link">
                                            <a href="injectables/IncomeStatementService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IncomeStatementService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ManagerModule.html" data-type="entity-link" >ManagerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ManagerModule-9ea3b1354500681bb54c3637f0da2151dccc4745aee5d639751b212e1176abcaa19f929d73c6122912a61927671a6ecf43e7d06cd4a40b4d89348b045e9a115b"' : 'data-target="#xs-controllers-links-module-ManagerModule-9ea3b1354500681bb54c3637f0da2151dccc4745aee5d639751b212e1176abcaa19f929d73c6122912a61927671a6ecf43e7d06cd4a40b4d89348b045e9a115b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ManagerModule-9ea3b1354500681bb54c3637f0da2151dccc4745aee5d639751b212e1176abcaa19f929d73c6122912a61927671a6ecf43e7d06cd4a40b4d89348b045e9a115b"' :
                                            'id="xs-controllers-links-module-ManagerModule-9ea3b1354500681bb54c3637f0da2151dccc4745aee5d639751b212e1176abcaa19f929d73c6122912a61927671a6ecf43e7d06cd4a40b4d89348b045e9a115b"' }>
                                            <li class="link">
                                                <a href="controllers/ManagerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ManagerModule-9ea3b1354500681bb54c3637f0da2151dccc4745aee5d639751b212e1176abcaa19f929d73c6122912a61927671a6ecf43e7d06cd4a40b4d89348b045e9a115b"' : 'data-target="#xs-injectables-links-module-ManagerModule-9ea3b1354500681bb54c3637f0da2151dccc4745aee5d639751b212e1176abcaa19f929d73c6122912a61927671a6ecf43e7d06cd4a40b4d89348b045e9a115b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ManagerModule-9ea3b1354500681bb54c3637f0da2151dccc4745aee5d639751b212e1176abcaa19f929d73c6122912a61927671a6ecf43e7d06cd4a40b4d89348b045e9a115b"' :
                                        'id="xs-injectables-links-module-ManagerModule-9ea3b1354500681bb54c3637f0da2151dccc4745aee5d639751b212e1176abcaa19f929d73c6122912a61927671a6ecf43e7d06cd4a40b4d89348b045e9a115b"' }>
                                        <li class="link">
                                            <a href="injectables/ManagerLocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagerLocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ManagerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrderModule.html" data-type="entity-link" >OrderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OrderModule-316a671e6eb28abaf2add6e627cebb18ffd2118dd1e2e12113bfc8521092e3207f8f3c34b2cbe8ca95f41f406f95294fb369dfc25f3d8be25f56b7945f95d5f9"' : 'data-target="#xs-controllers-links-module-OrderModule-316a671e6eb28abaf2add6e627cebb18ffd2118dd1e2e12113bfc8521092e3207f8f3c34b2cbe8ca95f41f406f95294fb369dfc25f3d8be25f56b7945f95d5f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrderModule-316a671e6eb28abaf2add6e627cebb18ffd2118dd1e2e12113bfc8521092e3207f8f3c34b2cbe8ca95f41f406f95294fb369dfc25f3d8be25f56b7945f95d5f9"' :
                                            'id="xs-controllers-links-module-OrderModule-316a671e6eb28abaf2add6e627cebb18ffd2118dd1e2e12113bfc8521092e3207f8f3c34b2cbe8ca95f41f406f95294fb369dfc25f3d8be25f56b7945f95d5f9"' }>
                                            <li class="link">
                                                <a href="controllers/OrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrderModule-316a671e6eb28abaf2add6e627cebb18ffd2118dd1e2e12113bfc8521092e3207f8f3c34b2cbe8ca95f41f406f95294fb369dfc25f3d8be25f56b7945f95d5f9"' : 'data-target="#xs-injectables-links-module-OrderModule-316a671e6eb28abaf2add6e627cebb18ffd2118dd1e2e12113bfc8521092e3207f8f3c34b2cbe8ca95f41f406f95294fb369dfc25f3d8be25f56b7945f95d5f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrderModule-316a671e6eb28abaf2add6e627cebb18ffd2118dd1e2e12113bfc8521092e3207f8f3c34b2cbe8ca95f41f406f95294fb369dfc25f3d8be25f56b7945f95d5f9"' :
                                        'id="xs-injectables-links-module-OrderModule-316a671e6eb28abaf2add6e627cebb18ffd2118dd1e2e12113bfc8521092e3207f8f3c34b2cbe8ca95f41f406f95294fb369dfc25f3d8be25f56b7945f95d5f9"' }>
                                        <li class="link">
                                            <a href="injectables/OrderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductModule-3f7e06ee3d9e83f00b89de19b2b6a35d3e634c1c1f14d0065684b927cd1c82400327a529d70a78f1b2c3f1568b0ed937e124f557895503c0d4171fba59164f34"' : 'data-target="#xs-controllers-links-module-ProductModule-3f7e06ee3d9e83f00b89de19b2b6a35d3e634c1c1f14d0065684b927cd1c82400327a529d70a78f1b2c3f1568b0ed937e124f557895503c0d4171fba59164f34"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-3f7e06ee3d9e83f00b89de19b2b6a35d3e634c1c1f14d0065684b927cd1c82400327a529d70a78f1b2c3f1568b0ed937e124f557895503c0d4171fba59164f34"' :
                                            'id="xs-controllers-links-module-ProductModule-3f7e06ee3d9e83f00b89de19b2b6a35d3e634c1c1f14d0065684b927cd1c82400327a529d70a78f1b2c3f1568b0ed937e124f557895503c0d4171fba59164f34"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductModule-3f7e06ee3d9e83f00b89de19b2b6a35d3e634c1c1f14d0065684b927cd1c82400327a529d70a78f1b2c3f1568b0ed937e124f557895503c0d4171fba59164f34"' : 'data-target="#xs-injectables-links-module-ProductModule-3f7e06ee3d9e83f00b89de19b2b6a35d3e634c1c1f14d0065684b927cd1c82400327a529d70a78f1b2c3f1568b0ed937e124f557895503c0d4171fba59164f34"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-3f7e06ee3d9e83f00b89de19b2b6a35d3e634c1c1f14d0065684b927cd1c82400327a529d70a78f1b2c3f1568b0ed937e124f557895503c0d4171fba59164f34"' :
                                        'id="xs-injectables-links-module-ProductModule-3f7e06ee3d9e83f00b89de19b2b6a35d3e634c1c1f14d0065684b927cd1c82400327a529d70a78f1b2c3f1568b0ed937e124f557895503c0d4171fba59164f34"' }>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PurchaseModule.html" data-type="entity-link" >PurchaseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PurchaseModule-1c7ee69f78422ce3fdf8943443860bba7d0eb73072181744c55a119a1e861b385426b21e43fe8a1f6fbd7900cce92b133cfc532ad4efa1d7ae3645ca65d4dab1"' : 'data-target="#xs-controllers-links-module-PurchaseModule-1c7ee69f78422ce3fdf8943443860bba7d0eb73072181744c55a119a1e861b385426b21e43fe8a1f6fbd7900cce92b133cfc532ad4efa1d7ae3645ca65d4dab1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PurchaseModule-1c7ee69f78422ce3fdf8943443860bba7d0eb73072181744c55a119a1e861b385426b21e43fe8a1f6fbd7900cce92b133cfc532ad4efa1d7ae3645ca65d4dab1"' :
                                            'id="xs-controllers-links-module-PurchaseModule-1c7ee69f78422ce3fdf8943443860bba7d0eb73072181744c55a119a1e861b385426b21e43fe8a1f6fbd7900cce92b133cfc532ad4efa1d7ae3645ca65d4dab1"' }>
                                            <li class="link">
                                                <a href="controllers/PurchaseController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PurchaseController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PurchaseModule-1c7ee69f78422ce3fdf8943443860bba7d0eb73072181744c55a119a1e861b385426b21e43fe8a1f6fbd7900cce92b133cfc532ad4efa1d7ae3645ca65d4dab1"' : 'data-target="#xs-injectables-links-module-PurchaseModule-1c7ee69f78422ce3fdf8943443860bba7d0eb73072181744c55a119a1e861b385426b21e43fe8a1f6fbd7900cce92b133cfc532ad4efa1d7ae3645ca65d4dab1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PurchaseModule-1c7ee69f78422ce3fdf8943443860bba7d0eb73072181744c55a119a1e861b385426b21e43fe8a1f6fbd7900cce92b133cfc532ad4efa1d7ae3645ca65d4dab1"' :
                                        'id="xs-injectables-links-module-PurchaseModule-1c7ee69f78422ce3fdf8943443860bba7d0eb73072181744c55a119a1e861b385426b21e43fe8a1f6fbd7900cce92b133cfc532ad4efa1d7ae3645ca65d4dab1"' }>
                                        <li class="link">
                                            <a href="injectables/PurchaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PurchaseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SaleModule.html" data-type="entity-link" >SaleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SaleModule-a7d627cbb6bc57f0644812da49d86369b0e1ace9a268df9be7b16fa142cbb223a60561cb9dd4ba6685806c8bf2967b0ec38c04df0e605a31741cef648ae8d1a9"' : 'data-target="#xs-controllers-links-module-SaleModule-a7d627cbb6bc57f0644812da49d86369b0e1ace9a268df9be7b16fa142cbb223a60561cb9dd4ba6685806c8bf2967b0ec38c04df0e605a31741cef648ae8d1a9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SaleModule-a7d627cbb6bc57f0644812da49d86369b0e1ace9a268df9be7b16fa142cbb223a60561cb9dd4ba6685806c8bf2967b0ec38c04df0e605a31741cef648ae8d1a9"' :
                                            'id="xs-controllers-links-module-SaleModule-a7d627cbb6bc57f0644812da49d86369b0e1ace9a268df9be7b16fa142cbb223a60561cb9dd4ba6685806c8bf2967b0ec38c04df0e605a31741cef648ae8d1a9"' }>
                                            <li class="link">
                                                <a href="controllers/SaleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SaleModule-a7d627cbb6bc57f0644812da49d86369b0e1ace9a268df9be7b16fa142cbb223a60561cb9dd4ba6685806c8bf2967b0ec38c04df0e605a31741cef648ae8d1a9"' : 'data-target="#xs-injectables-links-module-SaleModule-a7d627cbb6bc57f0644812da49d86369b0e1ace9a268df9be7b16fa142cbb223a60561cb9dd4ba6685806c8bf2967b0ec38c04df0e605a31741cef648ae8d1a9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SaleModule-a7d627cbb6bc57f0644812da49d86369b0e1ace9a268df9be7b16fa142cbb223a60561cb9dd4ba6685806c8bf2967b0ec38c04df0e605a31741cef648ae8d1a9"' :
                                        'id="xs-injectables-links-module-SaleModule-a7d627cbb6bc57f0644812da49d86369b0e1ace9a268df9be7b16fa142cbb223a60561cb9dd4ba6685806c8bf2967b0ec38c04df0e605a31741cef648ae8d1a9"' }>
                                        <li class="link">
                                            <a href="injectables/SaleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreModule.html" data-type="entity-link" >StoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-StoreModule-cb843c3f79216b59bd18d2d7f121ee5a6c8bac9ee8c4a6bf3377faa017834f90aae74f2e8e1c1da4ed7eded54f1cf2e50a04f7e64dc64f18e9a298dbc0596e0b"' : 'data-target="#xs-controllers-links-module-StoreModule-cb843c3f79216b59bd18d2d7f121ee5a6c8bac9ee8c4a6bf3377faa017834f90aae74f2e8e1c1da4ed7eded54f1cf2e50a04f7e64dc64f18e9a298dbc0596e0b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StoreModule-cb843c3f79216b59bd18d2d7f121ee5a6c8bac9ee8c4a6bf3377faa017834f90aae74f2e8e1c1da4ed7eded54f1cf2e50a04f7e64dc64f18e9a298dbc0596e0b"' :
                                            'id="xs-controllers-links-module-StoreModule-cb843c3f79216b59bd18d2d7f121ee5a6c8bac9ee8c4a6bf3377faa017834f90aae74f2e8e1c1da4ed7eded54f1cf2e50a04f7e64dc64f18e9a298dbc0596e0b"' }>
                                            <li class="link">
                                                <a href="controllers/StoreController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoreController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StoreModule-cb843c3f79216b59bd18d2d7f121ee5a6c8bac9ee8c4a6bf3377faa017834f90aae74f2e8e1c1da4ed7eded54f1cf2e50a04f7e64dc64f18e9a298dbc0596e0b"' : 'data-target="#xs-injectables-links-module-StoreModule-cb843c3f79216b59bd18d2d7f121ee5a6c8bac9ee8c4a6bf3377faa017834f90aae74f2e8e1c1da4ed7eded54f1cf2e50a04f7e64dc64f18e9a298dbc0596e0b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StoreModule-cb843c3f79216b59bd18d2d7f121ee5a6c8bac9ee8c4a6bf3377faa017834f90aae74f2e8e1c1da4ed7eded54f1cf2e50a04f7e64dc64f18e9a298dbc0596e0b"' :
                                        'id="xs-injectables-links-module-StoreModule-cb843c3f79216b59bd18d2d7f121ee5a6c8bac9ee8c4a6bf3377faa017834f90aae74f2e8e1c1da4ed7eded54f1cf2e50a04f7e64dc64f18e9a298dbc0596e0b"' }>
                                        <li class="link">
                                            <a href="injectables/StoreService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoreService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadModule.html" data-type="entity-link" >UploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UploadModule-7399e46ce222e1ec278ef5fc51770f88750eab649f3bf503f665e845cf6d5dc367c37c4d7a999256bae8b5201419131fcf50734b8fe26cc18c70938bde417908"' : 'data-target="#xs-controllers-links-module-UploadModule-7399e46ce222e1ec278ef5fc51770f88750eab649f3bf503f665e845cf6d5dc367c37c4d7a999256bae8b5201419131fcf50734b8fe26cc18c70938bde417908"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UploadModule-7399e46ce222e1ec278ef5fc51770f88750eab649f3bf503f665e845cf6d5dc367c37c4d7a999256bae8b5201419131fcf50734b8fe26cc18c70938bde417908"' :
                                            'id="xs-controllers-links-module-UploadModule-7399e46ce222e1ec278ef5fc51770f88750eab649f3bf503f665e845cf6d5dc367c37c4d7a999256bae8b5201419131fcf50734b8fe26cc18c70938bde417908"' }>
                                            <li class="link">
                                                <a href="controllers/UploadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UploadModule-7399e46ce222e1ec278ef5fc51770f88750eab649f3bf503f665e845cf6d5dc367c37c4d7a999256bae8b5201419131fcf50734b8fe26cc18c70938bde417908"' : 'data-target="#xs-injectables-links-module-UploadModule-7399e46ce222e1ec278ef5fc51770f88750eab649f3bf503f665e845cf6d5dc367c37c4d7a999256bae8b5201419131fcf50734b8fe26cc18c70938bde417908"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadModule-7399e46ce222e1ec278ef5fc51770f88750eab649f3bf503f665e845cf6d5dc367c37c4d7a999256bae8b5201419131fcf50734b8fe26cc18c70938bde417908"' :
                                        'id="xs-injectables-links-module-UploadModule-7399e46ce222e1ec278ef5fc51770f88750eab649f3bf503f665e845cf6d5dc367c37c4d7a999256bae8b5201419131fcf50734b8fe26cc18c70938bde417908"' }>
                                        <li class="link">
                                            <a href="injectables/UploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Articles.html" data-type="entity-link" >Articles</a>
                            </li>
                            <li class="link">
                                <a href="classes/Articles-1.html" data-type="entity-link" >Articles</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCustomerDto.html" data-type="entity-link" >CreateCustomerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDriverDto.html" data-type="entity-link" >CreateDriverDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateExpenseDto.html" data-type="entity-link" >CreateExpenseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateManagerDto.html" data-type="entity-link" >CreateManagerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrderDto.html" data-type="entity-link" >CreateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePurchaseDto.html" data-type="entity-link" >CreatePurchaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStoreDto.html" data-type="entity-link" >CreateStoreDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Customer.html" data-type="entity-link" >Customer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Delivery.html" data-type="entity-link" >Delivery</a>
                            </li>
                            <li class="link">
                                <a href="classes/Driver.html" data-type="entity-link" >Driver</a>
                            </li>
                            <li class="link">
                                <a href="classes/Expense.html" data-type="entity-link" >Expense</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtStrategy-1.html" data-type="entity-link" >JwtStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtStrategy-2.html" data-type="entity-link" >JwtStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtStrategy-3.html" data-type="entity-link" >JwtStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginCustomerDto.html" data-type="entity-link" >LoginCustomerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDriveDto.html" data-type="entity-link" >LoginDriveDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginManagerDto.html" data-type="entity-link" >LoginManagerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Manager.html" data-type="entity-link" >Manager</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDto.html" data-type="entity-link" >PaginationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/Purchase.html" data-type="entity-link" >Purchase</a>
                            </li>
                            <li class="link">
                                <a href="classes/Store.html" data-type="entity-link" >Store</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCustomerDto.html" data-type="entity-link" >UpdateCustomerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDriverDto.html" data-type="entity-link" >UpdateDriverDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateExpenseDto.html" data-type="entity-link" >UpdateExpenseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateManagerDto.html" data-type="entity-link" >UpdateManagerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/updateOrderDto.html" data-type="entity-link" >updateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePurchaseDto.html" data-type="entity-link" >UpdatePurchaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStoreDto.html" data-type="entity-link" >UpdateStoreDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CustomerLocalAuthGuard.html" data-type="entity-link" >CustomerLocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard-1.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard-2.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard-3.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard-1.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard-2.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});