import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: '', component: ContentComponent }, // Default route
  { path: 'header', component: HeaderComponent }, // Example route for Header
  { path: 'footer', component: FooterComponent }, // Example route for Footer
  { path: '**', redirectTo: '' } // Wildcard route to handle invalid URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
