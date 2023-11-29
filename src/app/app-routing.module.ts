import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { AboutComponent } from './cmps/about/about.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { TransferFundComponent } from './cmps/transfer-fund/transfer-fund.component';
import { ChartsComponent } from './cmps/charts/charts.component';

const routes: Routes = [
  {
    path: 'contact', component: ContactPageComponent, children: [
      { path: 'transfer/:id', component: TransferFundComponent },
      { path: 'edit/:id', component: ContactEditPageComponent },
      { path: 'edit', component: ContactEditPageComponent },

    ]
  },
  { path: 'charts', component: ChartsComponent },
  { path: 'contact/:id', component: ContactDetailsPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home/:id', component: HomePageComponent },
  { path: 'signup', component: SignupPageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
