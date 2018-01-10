import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './home/main/main.component';
import {PageNotFoundComponent} from './home/page-not-found.component';
import {ProductsComponent} from './products/products.component';
import {BlogComponent} from './blog/blog.component';
import {ArticleComponent} from './blog/article/article.component';
import {ItemComponent} from './products/item/item.component';
import {ServicesComponent} from './services/services.component';
import { SuccesComponent } from './home/succes/succes.component';
import { AdminPageComponent } from './admin-page/admin-page.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: MainComponent},
  {path: 'products/:id', component: ProductsComponent},
  {path: 'item', component: ItemComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'article', component: ArticleComponent},
  {path: 'service/:type', component: ServicesComponent},
  {path: 'succes', component: SuccesComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
