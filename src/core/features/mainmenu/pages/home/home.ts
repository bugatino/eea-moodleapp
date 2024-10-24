// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, OnInit, ViewChild } from '@angular/core';

import { CoreSites } from '@services/sites';
import { CoreEvents } from '@singletons/events';
import { CoreTabsOutletComponent, CoreTabsOutletTab } from '@components/tabs-outlet/tabs-outlet';

/**
 * Page that displays the Home.
 */
@Component({
    selector: 'page-core-mainmenu-home',
    templateUrl: 'home.html',
})
export class CoreMainMenuHomePage implements OnInit {

    @ViewChild(CoreTabsOutletComponent) tabsComponent?: CoreTabsOutletComponent;

    siteName = '';
    tabs: CoreTabsOutletTab[] = [];
    loaded = false;

    /**
     * @inheritdoc
     */
    async ngOnInit(): Promise<void> {
        await this.loadSiteName();

        // Refresh the enabled flags if site is updated.
        CoreEvents.on(CoreEvents.SITE_UPDATED, async () => {
            await this.loadSiteName();
        }, CoreSites.getCurrentSiteId());
    }

    /**
     * Load the site name.
     */
    protected async loadSiteName(): Promise<void> {
        const site = CoreSites.getRequiredCurrentSite();
        this.siteName = await site.getSiteName() || '';
    }

}
