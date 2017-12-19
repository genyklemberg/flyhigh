import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { MainComponent } from './home/main/main.component';
import { NavComponent } from './home/nav/nav.component';
import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './blog/article/article.component';
import { ProductsComponent } from './products/products.component';
import { ItemComponent } from './products/item/item.component';
import {PageNotFoundComponent} from './home/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    BlogComponent,
    ArticleComponent,
    ProductsComponent,
    ItemComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ScrollToModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
