import React from 'react';
import OriginalSideMenu from 'wix-style-react/SideMenu';
import Edit from 'wix-style-react/new-icons/Edit';
import ChatIcon from 'wix-style-react/new-icons/Chat';
import ExternalLink from 'wix-style-react/new-icons/ExternalLink';


import OriginalPage from 'wix-style-react/Page';
import {content, header} from '../Page/PageChildren';
import Breadcrumbs from '../Page/Breadcrumbs';


export const SideMenu = () => (
  <OriginalSideMenu>
    <OriginalSideMenu.Header>
      <div style={{padding: '26px 30px', fontSize: '20px', color: 'white'}}>
        <div style={{display: 'flex'}}>
          <span style={{fontSize: '20px'}}>wix-style-react</span>
          <ExternalLink/>
        </div>
        <div style={{marginTop: '5px', fontSize: '13px'}}>Role: Owner</div>
      </div>

    </OriginalSideMenu.Header>

    <OriginalSideMenu.Navigation>
      <OriginalSideMenu.NavigationLink onClick={() => console.log('Dashboard clicked')}>
        Dashboard
      </OriginalSideMenu.NavigationLink>

      <OriginalSideMenu.NavigationSeparator/>

      <OriginalSideMenu.NavigationLink onClick={() => console.log('Manage Website clicked')}>
        Manage Website
      </OriginalSideMenu.NavigationLink>
      <OriginalSideMenu.NavigationLink badge={<OriginalSideMenu.NavigationBadge/>}
                                       onClick={() => console.log('Settings clicked')}>
        Settings
      </OriginalSideMenu.NavigationLink>
    </OriginalSideMenu.Navigation>

    <OriginalSideMenu.NavigationSeparator/>

    <OriginalSideMenu.Footer>
      <OriginalSideMenu.FooterLink
        href="https://support.wix.com/"
        target="_blank"
        icon={<Edit/>}
      >
        Edit
      </OriginalSideMenu.FooterLink>

      <OriginalSideMenu.FooterTinyLink
        href="https://support.wix.com/en/article/wix-seo-wiz-suggestions-and-feedback"
        target="_blank"
        icon={<div style={{marginTop: 2}}><ChatIcon/></div>}
        tooltip="Hey, come talk to me!"
        onClick={() => console.log('clicked on tiny link yay!')}
      />
    </OriginalSideMenu.Footer>
  </OriginalSideMenu>
);

export const Page = () => (
  <OriginalPage children={[header(Breadcrumbs), content(false)]}/>
);
